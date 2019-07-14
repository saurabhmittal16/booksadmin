import React from 'react';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: undefined
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                console.log(values);
                console.log(this.props.handleLogin);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className='login-page'>
                <Form 
                    onSubmit={this.handleSubmit.bind(this)} 
                    className="login-form"
                >
                    <FormItem>
                        {
                            getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )
                        }
                    </FormItem>
                    
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        <p id='error'>
                            {!!this.state.error && this.state.error}
                        </p>
                    </FormItem>
                    
                </Form>
            </div>
        );
    }
}
const WrappedLogin = Form.create()(Login);
export default WrappedLogin;