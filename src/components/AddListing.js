import React from 'react';
import GetUser from './GetUser';
import { Card } from 'antd';

class AddListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: null
        }

        this.setUID = this.setUID.bind(this);
    }

    setUID(id) {
        this.setState({
            uid: id
        });
    }

    render() {
        return (
            <div style={{paddingTop: '25px'}}>
                <GetUser setUID={this.setUID} />
                {
                    this.state.uid && (
                        <Card style={{marginTop: '10px'}}>
                            <strong>Current User ID: </strong> {this.state.uid}
                        </Card>
                    )
                }
                {
                    this.state.uid && (
                        <h1>Add Listing</h1>
                    )
                }
            </div>
        );
    }
}

export default AddListing;