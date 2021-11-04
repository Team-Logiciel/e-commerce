import React from "react";
import { Link, withRouter } from 'react-router-dom';
import { estAuthentifier } from "../Authentification";
import { signout } from "../Authentification";
import '../CSS/login_signup.css'
import logo from '../images/logo.png'; 
import { itemAuTotal } from "./panierHelper";
import cartImage from '../images/shopping-cart2.png'; //https://lordicon.com/icons

const pageActive = (history, path) => {
  // History = page actuel
  if (history.location.pathname === path) {
    return { color: '#b4d8ee' };
  }
  else {
    return { color: '#FFFFFF' };
  }
}
const NavBar = ({ history }) => (
  <div className="nav_background">
    <nav className="navbar navbar-expand-lg navbar-modifier">
    <a className="navbar-brand" href="/">
      <img src={logo}  />
    </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNavAltMarkup">
        <div className="navbar-nav">

          <Link className="nav-item nav-link" style={pageActive(history, '/')} to="/">Accueil</Link>

          <Link className="nav-item nav-link" style={pageActive(history, '/shop')} to="/shop">Produits</Link>
          {!estAuthentifier() && (
            <div className="navbar-nav"> 
            <Link className="nav-item nav-link" style={pageActive(history, '/login')} to="/login">Se connecter</Link>
            <Link className="nav-item nav-link" style={pageActive(history, '/signup')} to="/signup">Inscription</Link>
            </div>
          )}
          {estAuthentifier() && estAuthentifier().user.role == 0 &&(
            <Link className="nav-item nav-link" style={pageActive(history, '/usager/dashboard')} to="/usager/dashboard">Dashboard</Link>
          )}
          {estAuthentifier() && estAuthentifier().user.role == 1 &&(
            <Link className="nav-item nav-link" style={pageActive(history, '/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
          )}
          {estAuthentifier() && (
            <Link className="nav-item nav-link" style={{cursor: 'pointer', color: '#ffffff'}} onClick={() => signout(() => {history.push("/");})} to="/">Déconnexion</Link>
          )}
          <Link className="nav-item nav-link" style={pageActive(history, '/cart')} to="/cart"> <img src={cartImage} width="35"/> <sup><small className="cart-badge">{itemAuTotal()}</small></sup></Link>
        </div>
      </div>
    </nav>
  </div>

)
export default withRouter(NavBar);