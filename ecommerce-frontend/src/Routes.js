import React from "react";
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Login from './usagers/Login';
import Signup from './usagers/Signup';
import Home from './site/Home';
import Shop from './site/Shop';
import RoutePrive from "./Authentification/RoutesPrive";
import DashboardUtilisateur from "./usagers/DashboardUtilisateur";
import DashboardAdministrateur from "./usagers/DashboardAdministrateur";
import RouteAdministarteur from "./Authentification/RouteAdministrateur";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import profile from "./usagers/Profile";
import Product from "./site/Product";

const Routes = () => {
    return(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component = {Home}/>
            <Route path= "/shop" exact component = {Shop}/>
            <Route path= "/login" exact component = {Login}/>
            <Route path= "/signup" exact component = {Signup}/>
            <RoutePrive path ="/usager/dashboard" exact component={DashboardUtilisateur}></RoutePrive>
            <RouteAdministarteur path ="/admin/dashboard" exact component={DashboardAdministrateur}></RouteAdministarteur>
            <RouteAdministarteur path ="/creer/categorie" exact component={AddCategory}></RouteAdministarteur>
            <RouteAdministarteur path ="/creer/produit" exact component={AddProduct}></RouteAdministarteur>
            <RoutePrive path="/profile/:userId" exact component={profile}></RoutePrive>
            <Route path="/product/:productId" exact component={Product}></Route>
        </Switch>
    </BrowserRouter>
    );
};

export default Routes;