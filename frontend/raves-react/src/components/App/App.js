import {React, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Router, Switch, Route, Link} from "react-router-dom";

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./../Login/Login";
import Register from "./../Registration/Register";
import Home from "./../Home/Home";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import { logout } from "./../../actions/auth";
import { clearMessage } from "./../../actions/message";
import { history } from "./../../helpers/history";

const App = () => {
  const { user: token } = useSelector((state) => console.log(state) + state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  const logOut =()=>{
    dispatch(logout());
  };

  return (
  <Router history={history}>
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Raves Entertainment
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
        </div>

        {token ? (
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

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </div>
    </div>
  </Router>
);
};
export default App;
