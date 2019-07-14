import React, { lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Login = lazy(() => import('./Login'));
const Container = lazy(() => import('./Container'));

const NotFound = () => <h1>Page not found</h1>;

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/login" component={Login} />
					<Route path="/" component={RequireAuth(Container)} />
					<Route exact path="*" component={NotFound} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;