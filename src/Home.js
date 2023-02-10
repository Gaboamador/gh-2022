import React, { useState, useEffect } from "react";
import './App.css';
import {Button, Row, Col, Container, ListGroup, Table, FormCheck, FormSelect} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Home() {

return (
<div className="content" style={{
backgroundImage: `url(${require('./pictures/FondoPlaca.jpg')})`,
backgroundSize: 'cover',
backgroundRepeat: 'no-repeat',
backgroundPosition: 'center center',
zIndex: -1,
paddingTop: 20,
minHeight: '100vh'
}}>

<Container style={{display: 'flex', justifyContent: 'center', marginTop:10}}>
  <Row style={{marginBottom:10}}>    
    <Col>
      <Link to='/ContadorNominaciones' style={{padding:0}} >
        <Button className="custom-class-home">Contador Nominaciones</Button>
      </Link>
    </Col>
  </Row>  
</Container>

<Container style={{display: 'flex', justifyContent: 'center', marginTop:10}}>
  <Row>
    <Col>
      <Link to='/NominAnteriores'>
        <Button className="custom-class-home">Nominaciones Anteriores</Button>
      </Link>
    </Col>  
    </Row>
</Container>
  
</div>
);
}  
export default Home;










  
