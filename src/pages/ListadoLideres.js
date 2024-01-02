import React, { useState, useEffect } from 'react';
import '../App.css';
import {Button, Row, Col, Container, ListGroup, Table, FormCheck, FormSelect} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { dataPlaca } from '../data/placasData';
import { ImSortNumbericDesc, ImTable2 } from 'react-icons/im';

const ListadoLideres = () => {

const leaders = [];

dataPlaca.forEach(week => {
    let savedParticipant = null;
    let leader = null;
    let leaderNominee = null;
    week.data.forEach(participant => {
      if (participant.result === "Salvado por el líder") {
        savedParticipant = participant;
      }
      if (participant.role === "Nominado por el líder") {
        leaderNominee = participant;
      }
      if (participant.role === "Líder") {
        leader = participant;
      }
    });
      leaders.push({
        week: week.week + 1,
        name: leader.name,
        savedName: savedParticipant ? savedParticipant.name : "No hubo salvados",
        leaderNominee: leaderNominee ? leaderNominee.name : "No nominó como líder"
      });
});

return (
    <div className="content" style={{
    backgroundImage: `url(${require('../pictures/FondoPlaca.jpg')})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    zIndex: -1,
    paddingTop: 20,
    minHeight: '100vh'
    }}>

<Container style={{marginBottom:10}}>
  <h6 style={{backgroundImage: `url(${require('../pictures/HeaderVotaciones.jpg')})`}} className="tituloTablasNomAnteriores">LISTADO DE LÍDERES</h6>
  </Container>


<Container style={{paddingBottom: 5}}>
  <Table striped bordered hover className="center">
    <thead style={{background:'rgba(40,43,242,0.5)'}}>
      <tr className='encabezadoVotaciones' style={{marginBottom: '10px', backgroundImage: `url(${require('../pictures/HeaderVotaciones.jpg')})`}}>
        <th className='tituloTablaDetalleVotosJugador'>Semana</th>
        <th className='tituloTablaDetalleVotosJugador'>Nombre</th>
        <th className='tituloTablaDetalleVotosJugador'>Salvado</th>
        <th className='tituloTablaDetalleVotosJugador'>Nominado</th>
      </tr>
    </thead>
    <tbody style={{background:'rgba(255,255,255,0.6)', backgroundImage: `url(${require('../pictures/FondoPlaca2.jpg')})`}}>
    {leaders.map((leader, index) => (
        <tr key={index}>
          <td className='comboBoxNominAnteriores'>{leader.week}</td>
          <td>{leader.name}</td>
          <td>{leader.savedName}</td>
          <td>{leader.leaderNominee}</td>
        </tr>
      ))}
    </tbody>
  </Table>

</Container>

  </div>
);
};
export default ListadoLideres;