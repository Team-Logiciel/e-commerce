import React from "react";
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Login from './usagers/Login';
import Signup from './usagers/Signup';
import Home from './site/Home';
import RoutePrive from "./Authentification/RoutesPrive";
import DashboardUtilisateur from "./usagers/DashboardUtilisateur";
import DashboardAdministrateur from "./usagers/DashboardAdministrateur";
import RouteAdministarteur from "./Authentification/RouteAdministrateur";


const Routes = () => {
    return(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component = {Home}/>
            <Route path= "/login" exact component = {Login}/>
            <Route path= "/signup" exact component = {Signup}/>
            <RoutePrive path ="/usager/dashboard" exact component={DashboardUtilisateur}></RoutePrive>
            <RouteAdministarteur path ="/admin/dashboard" exact component={DashboardAdministrateur}></RouteAdministarteur>
        </Switch>
    </BrowserRouter>
    );
};

export default Routes;