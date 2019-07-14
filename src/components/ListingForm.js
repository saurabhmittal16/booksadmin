import React from 'react';
import { Form, Input, DatePicker, Card, Button, Select } from 'antd';
import genres from '../genres';

const { RangePicker } = DatePicker;
const { Option } = Select;

const children = [];
Object.keys(genres).forEach(
    key => children.push(<Option key={key} value={genres[key]}>{genres[key]}</Option>)
);

class ListingForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let data = {
                    name: values.name,
                    author: values.author,
                    description: values.description,
                    start: values.time[0].toDate(),
                    end: values.time[1].toDate(),
                    genre: values.genre
                }
                this.props.setData(data);
            }
        });
    }

    componentDidMount() {
        this.props.form.setFieldsValue({
            'name': this.props.name,
            'author': this.props.author,
            'description': this.props.description
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Card style={{marginTop: '10px'}}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item label="Name">
                    {
                        getFieldDecorator('name', {
                            rules: [{
                                required: true,
                                message: 'Please enter a name',
                            }],
                        })(
                            <Input />
                        )
                    }
                    </Form.Item>

                    <Form.Item label="Author">
                    {
                        getFieldDecorator('author', {
                            rules: [{
                                required: true,
                                message: "Please enter author's name",
                            }],
                        })(
                            <Input />
                        )
                    }
                    </Form.Item>

                    <Form.Item label="Description">
                    {
                        getFieldDecorator('description', {
                            rules: [],
                        })(
                            <Input />
                        )
                    }
                    </Form.Item>

                    <Form.Item label="Genres">
                    {
                        getFieldDecorator('genre', {})(
                            <Select
                                mode="multiple"
                                placeholder="Please select"
                                style={{ width: '100%' }}
                            >
                            {
                                children
                            }
                            </Select>
                        )
                    }
                    </Form.Item>
                    
                    <Form.Item label="Dates Picker">
                    {
                        getFieldDecorator('time', {
                            rules: [{
                                required: true,
                                message: "Please select start and end",
                            }],
                        })(
                            <RangePicker />
                        )
                    }
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button type="danger" style={{ marginLeft: '10px' }} onClick={this.props.reset}>Clear</Button>
                    </Form.Item>
                    
                </Form>
            </Card>
        );
    }
}

const WrappedListingForm = Form.create({ name: 'listing_form' })(ListingForm);
export default WrappedListingForm;