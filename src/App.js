import logo from './logo.svg';
import './App.css';
import ListaJugadores from './ListaJugadores';
import ContadorDoble from './ContadorDoble';

import {Button, Row, Col, Container} from 'react-bootstrap';
import {useEffect, useState} from 'react';


/*
function App() {
  return (
    <div className="App">
   <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
  </header>       
      <MyComponent/>
    </div>
  );
}
export default App; */


function App() {  

  /*AVISA ANTES DE ACTUALIZAR LA PÁGINA*/
  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };
  
    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

/*CONTENEDOR CON LAS OPCIONES*/
  return (  
    <div className="container py-4">  
      <h1 className="text-center text-uppercase">  
        Welcome to react app development
      </h1>  
      <div>  
        <h3>Bootstrap 4 Buttons</h3>
        <Container>
          <Row>
            <Col xs lg="2">{/*ListaJugadores words={[]} */}Acá va a ir la lista de votantes</Col>
            <Col xs lg="2"><ContadorDoble words={[]} /></Col>
          </Row>
        </Container> 
        

      </div>
    </div>  
  );  
}  
export default App;  