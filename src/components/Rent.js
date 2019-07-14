import React from 'react';
import { Row, Col, Button } from 'antd';
import RentItem from './RentItem';
import Loading from './Utils/Loading';
import { getRentData, getMoreData } from '../utils';

class Rent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            next: null
        }
        this.fetchMore = this.fetchMore.bind(this);
    }

    async componentWillMount() {
        const data = await getRentData();
        this.setState(
            prevState => {
                return {
                    data: prevState.data.concat(data.results),
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

    render() {
        return (
            <div>
                <Row>
                {
                    this.state.data.length > 0 ? (
                        this.state.data.map(
                            (rent, index) => (
                                <Col lg={8} md={12} sm={24} key={index}>
                                    <RentItem {...rent} />
                                </Col>
                            )
                        )
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