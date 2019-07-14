import React from 'react';
import { Card, Input, message } from 'antd';
import LoadingOverlay from './Utils/LoadingOverlay';
import { findByISBN } from '../utils';

const { Search } = Input;

class Isbn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(isbn) {
        this.setState({
            loading: true
        });

        try {
            const res = await findByISBN(isbn);
            if (!res) {
                message.error("No data found");
            }
            this.props.setData(res);
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({
                loading: false
            });    
        }
    }
    render() {
        return (
            <div>
                <Card style={{marginTop: '10px'}}>
                    <Search 
                        placeholder="Enter ISBN" 
                        onSearch={this.handleSubmit} 
                        enterButton="Search"
                        type={'number'}
                    />
                </Card>
                <LoadingOverlay active={this.state.loading} />
            </div>
        );
    }
}

export default Isbn;