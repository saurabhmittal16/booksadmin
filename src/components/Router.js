import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import Loading from './Utils/Loading';

const Dashboard = () => <h1>Dashboard</h1>;
const Rents = () => <h1>Rent</h1>;
const AddListing = () => <h1>AddListing</h1>;

class Router extends React.Component {
    render() {
        return (
            <Suspense fallback={<Loading />}>
                <Switch>
                    <Route exact path='/home' component={Dashboard} />
                    <Route exact path='/home/rents' component={Rents} />
                    <Route exact path='/home/add' component={AddListing} />
                </Switch>
            </Suspense>
        );
    }
}

export default Router;