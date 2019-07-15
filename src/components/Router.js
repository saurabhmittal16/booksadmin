import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import Loading from './Utils/Loading';

const Rents = lazy(() => import('./Rent'));
const AddListing = lazy(() => import('./AddListing'));

class Router extends React.Component {
    render() {
        return (
            <Suspense fallback={<Loading />}>
                <Switch>
                    <Route exact path='/home/rents' component={Rents} />
                    <Route exact path='/home/add' component={AddListing} />
                </Switch>
            </Suspense>
        );
    }
}

export default Router;