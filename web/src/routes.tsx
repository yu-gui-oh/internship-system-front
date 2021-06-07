import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CreateDestination from './pages/Create/Destination';
import CreateDriver from './pages/Create/Driver';
import CreatePassenger from './pages/Create/Passenger';
import CreateVehicle from './pages/Create/Vehicle';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Home} />
            <Route path="/create/destination" exact component={CreateDestination} />
            <Route path="/create/driver" exact component={CreateDriver} />
            <Route path="/create/passenger" exact component={CreatePassenger} />
            <Route path="/create/vehicle" exact component={CreateVehicle} />
        </BrowserRouter>
    );
}

export default Routes;