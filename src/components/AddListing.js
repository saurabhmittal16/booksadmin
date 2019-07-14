import React from 'react';
import GetUser from './GetUser';
import Isbn from './Isbn';
import ListingForm from './ListingForm';
import LoadingOverlay from './Utils/LoadingOverlay';
import { addListing as createListing } from '../utils';

import { Card, message } from 'antd';

class AddListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: null,
            author: null,
            name: null,
            image: null,
            description: null,
            isbn: null,
            genre: [],
            url: null,
            rating: null,
            reviews: null,
            start: null,
            end: null,
            searched: false,
            loading: false
        }

        this.addListing = this.addListing.bind(this);
        this.setUID = this.setUID.bind(this);
        this.updateData = this.updateData.bind(this);
        this.setData = this.setData.bind(this);
        this.reset = this.reset.bind(this);
        this.hardReset = this.hardReset.bind(this);
    }

    hardReset() {
        this.setState({
            uid: null,
            author: null,
            name: null,
            image: null,
            description: null,
            isbn: null,
            genre: [],
            url: null,
            rating: null,
            reviews: null,
            start: null,
            end: null,
            searched: false
        });
    }

    reset() {
        this.setState({
            author: null,
            name: null,
            image: null,
            description: null,
            isbn: null,
            genre: [],
            url: null,
            rating: null,
            reviews: null,
            start: null,
            end: null,
            searched: false
        });
    }

    async addListing() {
        this.setState({
            loading: true
        });

        try {
            const res = await createListing(this.state);
            if (res === true) {
                message.success("Listing added");
                this.reset();
            } else {
                message.error("Could not add listing");
            }
        } catch (err) {
            console.log(err);
            message.error("Error"); 
        }

        this.setState({
            loading: false
        });
    }

    updateData(data) {
        this.setState(
            prevState => {
                return {
                    ...data,
                    genre: prevState && prevState.genre ? prevState.genre.concat(data.genre): data.genre,
                    searched: true
                }
            }, () => {
                this.addListing();
            }
        );
    }

    setData(data) {
        this.setState({
            ...data,
            searched: true
        })
    }

    setUID(id) {
        this.setState({
            uid: id
        });
    }

    render() {
        return (
            <div style={{paddingTop: '10px'}}>
                <GetUser setUID={this.setUID} reset={this.hardReset} />
                {
                    this.state.uid && (
                        <Card style={{marginTop: '10px'}}>
                            <strong>Current User ID: </strong> {this.state.uid}
                        </Card>
                    )
                }
                {
                    this.state.uid && (
                        <div>
                            <Isbn setData={this.setData} />
                            {
                                this.state.searched && (
                                    <ListingForm {...this.state} reset={this.reset} setData={this.updateData} />
                                )
                            }
                        </div>
                    )
                }
                <LoadingOverlay active={this.state.loading} />
            </div>
        );
    }
}

export default AddListing;