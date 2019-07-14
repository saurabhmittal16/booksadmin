import React from 'react';
import { Card, Input, message } from 'antd';
import { getUID } from '../utils';

const { Search } = Input;

class GetUser extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(mobile) {
        try {
            const res = await getUID(mobile);
            if (res) {
                this.props.setUID(res);
            } else {
                message.error("No user found");
            }
        } catch (err) {
            message.error("Error");
            console.log(err);
        }
    }

    render() {
        return (
            <Card>
                <Search 
                    placeholder="Enter mobile" 
                    onSearch={this.handleSubmit} 
                    enterButton="Search"
                    minLength={10}
                    maxLength={10}
                />
            </Card>
        );
    }
}

export default GetUser;