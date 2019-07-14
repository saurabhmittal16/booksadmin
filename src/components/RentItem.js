import React from 'react';
import { Card, Modal, Button } from 'antd';

class RentItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }

        this.handleCancel = this.handleCancel.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    handleCancel() {
        this.setState({
            visible: false
        })
    }

    onClick() {
        this.setState({
            visible: true
        });
    }

    render() {
        const deliveryDate = new Date(this.props.lendeeInfo.delivery);
        const pickupDate = new Date(this.props.lenderInfo.pickup);

        return (
            <div style={{padding: '5px'}}>
                <Card 
                    style={{display: 'block'}}
                    onClick={this.onClick}
                >
                    <span>
                        {this.props.listing.name}
                    </span>
                    <span style={{ float: 'right', color: 'red' }}>
                        {this.props.status}
                    </span>
                </Card>
                
                <Modal
                    visible={this.state.visible}
                    title={this.props.listing.name - this.props.listing.isbn }
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Close
                        </Button>,
                        <Button key="pick" type="primary" onClick={this.handleCancel} disabled={this.props.status === "picked-up"}>
                            Picked-Up
                        </Button>,
                        <Button key="deliver" type="primary" onClick={this.handleCancel}>
                            Delivered
                        </Button>,
                    
                    ]}
                >
                    <div>
                        <div>
                            <strong style={{fontSize: '16px'}}>Pickup from: </strong>
                            <div><strong>Address: </strong>{this.props.lendeeInfo.address}</div>
                            <div><strong>Mobile: </strong>{this.props.lendeeInfo.mobile}</div>
                            <div><strong>Date: </strong>{pickupDate.toDateString()}</div>
                        </div>
                        <br />
                        <div>
                            <strong style={{fontSize: '16px'}}>Deliver to: </strong>
                            <div><strong>Address: </strong>{this.props.lenderInfo.address}</div>
                            <div><strong>Mobile: </strong>{this.props.lenderInfo.mobile}</div>
                            <div><strong>Date: </strong>{deliveryDate.toDateString()}</div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default RentItem;