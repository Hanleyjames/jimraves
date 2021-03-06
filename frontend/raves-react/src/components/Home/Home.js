import React, {useState, useEffect} from 'react';

import './Home.css';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: '10%',
      borderRadius: 40,
      backgroundColor: 'white',
      border: '5px solid #FF6EC7',
      marginBottom: '45%',
    },
  }),
);

export default function Home() {
  const classes = useStyles();

  return (
    <div className="App">
      <header className="App-header">
        <img src="hat-purple.png" alt="Raves Entertainment" className="logo"></img>
        <p className="glow">Helping music and art thrive</p>
        <p className="glow">
            Opening soon...
        </p>
      </header>
    </div>
   );
}
