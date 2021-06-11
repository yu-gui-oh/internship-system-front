import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import CreateDestination from './pages/Create/Destination';
import CreateDriver from './pages/Create/Driver';
import CreatePassenger from './pages/Create/Passenger';
import CreateVehicle from './pages/Create/Vehicle';
import CreateTravel from './pages/Create/Travel';

import ListActiveTravels from './pages/List/ActiveTravels';
import ListDrivers from './pages/List/Drivers';
import ListVehicles from './pages/List/Vehicles';
import ListAllTravels from './pages/List/AllTravels';
import ListPassengers from './pages/List/Passengers';

import ShowCompany from './pages/Show/Company';

const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/create/destination" component={CreateDestination} />
            <Route path="/create/driver" component={CreateDriver} />
            <Route path="/create/passenger" component={CreatePassenger} />
            <Route path="/create/vehicle" component={CreateVehicle} />
            <Route path="/create/travel" component={CreateTravel} />

            <Route path="/list/travels/active" component={ListActiveTravels} />
            <Route path="/list/drivers" component={ListDrivers} />
            <Route path="/list/vehicles" component={ListVehicles} />
            <Route path="/list/travels" component={ListAllTravels} />
            <Route path="/list/passengers" component={ListPassengers} />

            <Route path="/company/details" component={ShowCompany} />
        </Switch>
    );
}

export default Routes;