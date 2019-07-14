import React from 'react';
import { Card, Modal, Button, message } from 'antd';
import { markStatus } from '../utils';

class RentItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }

        this.handleCancel = this.handleCancel.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onPickedUp = this.onPickedUp.bind(this);
        this.onDelivered = this.onDelivered.bind(this);
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

    async onPickedUp() {
        if (this.props.status === "Confirmed") {
            const res = await markStatus(this.props._id, "Picked-Up");
            if (res) {
                message.success("Status updated");
                this.setState({
                    visible: false
                });
            } else {
                message.error("Could not update");
            }
        }
    }

    async onDelivered() {
        if (this.props.status === "Picked-Up") {
            const res = await markStatus(this.props._id, "Delivered");
            if (res) {
                message.success("Status updated");
                this.setState({
                    visible: false
                });
            } else {
                message.error("Could not update");
            }
        }
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
                        <Button key="pick" type="primary" onClick={this.onPickedUp} disabled={this.props.status === "Picked-Up"}>
                            Picked-Up
                        </Button>,
                        <Button key="deliver" type="primary" onClick={this.onDelivered} disabled={this.props.status !== "Picked-Up"}>
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