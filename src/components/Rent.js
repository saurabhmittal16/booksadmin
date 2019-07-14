import React from 'react';
import { Row, Col, Button } from 'antd';
import RentItem from './RentItem';
import Loading from './Utils/Loading';
import NoData from './Utils/NoData';
import { getRentData, getMoreData } from '../utils';

class Rent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            next: null
        }
        this.fetchMore = this.fetchMore.bind(this);
        this.parentUpdate = this.parentUpdate.bind(this);
    }

    async componentWillMount() {
        const data = await getRentData();
        this.setState(
            prevState => {
                return {
                    data: data.results,
                    next: data.next
                }
            }
        );
    }

    async fetchMore() {
        if (this.state.next) {
            const data = await getMoreData(this.state.next);
            this.setState(
                prevState => {
                    return {
                        data: prevState.data.concat(data.results),
                        next: data.next
                    }
                }
            )
        }
    }

    async parentUpdate() {
        const data = await getRentData();
        this.setState(
            prevState => {
                return {
                    data: data.results,
                    next: data.next
                }
            }
        );
    }

    render() {
        return (
            <div>
                <Row>
                {
                    this.state.data && this.state.data.length > 0 ? (
                        this.state.data.map(
                            (rent, index) => (
                                <Col lg={8} md={12} sm={24} key={index}>
                                    <RentItem {...rent} update={this.parentUpdate} />
                                </Col>
                            )
                        )
                    ) : this.state.data && this.state.data.length === 0 ? (
                        <NoData title="data" />
                    ) : (
                        <Loading />
                    )
                }
                </Row>
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '10px' }}>
                    <Button onClick={this.fetchMore} disabled={this.state.next == null} >Load More</Button>
                </div>
            </div>
        );
    }
}

export default Rent;