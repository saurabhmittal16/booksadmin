import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import MainLoading from './Utils/MainLoading';

import { checkPassword, clearAuthHeaders, setAuthHeaders } from '../utils';

const Login = lazy(() => import('./Login'));
// const Container = lazy(() => import('./Container'));

const NotFound = () => <h1>Page not found</h1>;
const Container = () => <h1>Container</h1>;

class App extends React.Component {
	constructor(props) {
		super(props);
		clearAuthHeaders();

		this.state = {
			isAuth: false,
		};

		this.handleLogin = this.handleLogin.bind(this);
	}

	async handleLogin(password) {
		const success = await checkPassword(password);
		if (success) {
			this.setState({
				isAuth: true,
			});
			setAuthHeaders();
		}
		return success;
	}

	render() {
		return (
			<Suspense fallback={<MainLoading />}>
				<BrowserRouter>
					<Switch>
						<Route
							exact
							path="/"
							component={(props) => (
								<Login handleLogin={this.handleLogin} {...props} />
							)}
						/>

						<Route 
							path="/home" 
							component={props => {
								if (this.state.isAuth) {
									return <Container {...props} />
								} else {
									return <Redirect to={{
										pathname: '/'
									}} />
								}
							}} 
						/>

						<Route path="*" component={NotFound} />
					</Switch>
				</BrowserRouter>
			</Suspense>
		);
	}
}

export default App;
