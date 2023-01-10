import logo from './logo.svg';
import './App.css';
import ListaJugadores from './ListaJugadores';
import ContadorDoble from './ContadorDoble';
import NuevaLista from './NuevaLista';
import NuevaLista2 from './NuevaLista2';
import NuevaLista3 from './NuevaLista3';
import NuevaLista4 from './NuevaLista4';

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
/*
  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };
  
    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);
*/


  
/*CONTENEDOR CON LAS OPCIONES*/
  return (  
    <div className="container py-4">  
      <h2 className="tituloPrincipal">GRAN HERMANO 2022</h2>
      <h3 className="titulo2">NOMINACIONES</h3>
      <div>
        <p></p>
        
        <Container>
          <Row>
            <Col><NuevaLista4 words={[]} /></Col>
          </Row>
        </Container>

      </div>
    </div>  
  );  
}  
export default App;  

