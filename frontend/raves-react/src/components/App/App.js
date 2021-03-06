import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
//proprietary garbage
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';


import AuthService from "../../services/auth.service";

import Login from "../Login/Login";
import Register from "../../components/Register/Register";
import Home from "../Home/Home";
import EventsList from "../EventsList/EventsList";
import AddEvent from "../AddEvent/AddEvent";
import ArtistList from "../ArtistList/ArtistList"
import Event from "../EventsList/Event/Event";
import Artists from "../ArtistList/Artist/Artist";
import PaymentPortal from "../StoreFront/PaymentPortal/PaymentPortal";


const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };
  const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

  return (
    <Elements stripe={stripePromise}>
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
        <img src="raves_logo_blue.png" alt="Raves Entertainment" className="nav-logo"></img>
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/events"} className="nav-link">
              Events
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/artists"} className="nav-link">
              Artists
            </Link>
          </li>


          {currentUser && (
            <div>
              <li className="nav-item">
                <Link to={"/addevent"} className="nav-link">
                  Add Event
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/addevent"} className="nav-link">
                  Add Artist
                </Link>
              </li>
            </div>

          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/events" component={EventsList} />
          <Route exact path="/addevent" component={AddEvent} />
          <Route exact path="/artists" component={ArtistList} />
          <Route exact path="/events/:id" component={Event} />
          <Route exact path="/artists/:id" component={Artists} />
          <Route exact path="/paymentsportal" component={PaymentPortal} />
        </Switch>
      </div>
    </div>
    </Elements>
  );
};

export default App;
