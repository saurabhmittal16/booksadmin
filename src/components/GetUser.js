import React from 'react';
import { Card, Input, message } from 'antd';
import LoadingOverlay from './Utils/LoadingOverlay';
import { getUID } from '../utils';

const { Search } = Input;

class GetUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(mobile) {
        this.setState({
            loading: true
        });
        try {
            const res = await getUID(mobile);
            if (res) {
                this.props.setUID(res);
            } else {
                message.error("No user found");
                this.props.reset();
            }
        } catch (err) {
            message.error("Error");
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
                <Card>
                    <Search 
                        placeholder="Enter mobile" 
                        onSearch={this.handleSubmit} 
                        enterButton="Search"
                        minLength={10}
                        maxLength={10}
                    />
                </Card>
                <LoadingOverlay active={this.state.loading} />
            </div>
        );
    }
}

export default GetUser;