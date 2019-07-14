import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainLoading from './Utils/MainLoading';
import { checkPassword, clearAuthHeaderes, setAuthHeaders } from '../utils';

const Login = lazy(() => import('./Login'));
// const Container = lazy(() => import('./Container'));

const NotFound = () => <h1>Page not found</h1>;
const Container = () => <h1>Container</h1>;

class App extends React.Component {
	constructor(props) {
		super(props);
		clearAuthHeaderes();

		this.state = {
			isAuth: false
		}

		this.handleLogin = this.handleLogin.bind(this);
	}

	async handleLogin(password) {
		try {
			const res = await checkPassword(password);
			if (res.code === 200 && res.data.success === true)
			{
				this.setState({
					isAuth: false
				});
				setAuthHeaders();
			}
		} catch (err) {
			console.log(err);
		}
	}

	render() {
		return (
			<Suspense fallback={<MainLoading/>}>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={Login} handleLogin={this.handleLogin} />
						{
							this.state.isAuth && <Route path="/home" component={Container} />
						}
						<Route exact path="*" component={NotFound} />
					</Switch>
				</BrowserRouter>
			</Suspense>
		);
	}
}

export default App;