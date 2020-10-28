import React from 'react';
import './App.css';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="hat-purple.png" alt="Raves Entertainment" className="logo"></img>
        <p className="glow">Helping music and art thrive</p>
        <p className="glow">
            Opening soon...
        </p>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <p>Nullswift</p>
            </Grid>
            <Grid item xs={6}>
              <p>Gangen</p>
            </Grid>
          </Grid>
        </Container>
      </header>
    </div>
   );
}
export default App;
