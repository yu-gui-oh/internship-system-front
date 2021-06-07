import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import CreateDestination from './pages/Create/Destination';
import CreateDriver from './pages/Create/Driver';
import CreatePassenger from './pages/Create/Passenger';
import CreateVehicle from './pages/Create/Vehicle';

const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/create/destination" component={CreateDestination} />
            <Route path="/create/driver" component={CreateDriver} />
            <Route path="/create/passenger" component={CreatePassenger} />
            <Route path="/create/vehicle" component={CreateVehicle} />
        </Switch>
    );
}

export default Routes;