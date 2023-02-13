import React, { useState, useEffect } from 'react';
import './App.css';
import {Button, Row, Col, Container, ListGroup, Table, FormCheck, FormSelect} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { dataPlaca } from './dataPlaca';
import { ImSortNumbericDesc, ImTable2 } from 'react-icons/im';

const ListadoRolesNominaciones = () => {

const leaders = [];
const nominated = [];
const eliminated = [];

dataPlaca.forEach(week => {
    let savedParticipant = null;
    let leader = null;
    week.data.forEach(participant => {
      if (participant.result === "Salvado por el líder") {
        savedParticipant = participant;
      }
      if (participant.role === "Líder") {
        leader = participant;
      }
    });
    if (savedParticipant && leader) {
      leaders.push({
        week: week.week + 1,
        name: leader.name,
        savedName: savedParticipant.name
      });
    } else if (leader) {
      leaders.push({
        week: week.week + 1,
        name: leader.name,
        savedName: "No hubo salvados"
      });
    }
});



dataPlaca.forEach(week => {
    week.data.forEach(participant => {
        if (participant.role === "Nominado") {
        nominated.push({...participant, week: week.week + 1});
      }
      if (participant.result.includes('Eliminado')) {
        eliminated.push({...participant, week: week.week + 1});
      }
    })
});


const [selectedRole, setSelectedRole] = useState('Líder');
const week = leaders[0].week;
const [sortOrder, setSortOrder] = useState(false);

const sortedData = sortOrder
  ? eliminated.sort((a, b) => {
      const aPercent = Number(a.result.match(/(\d+)/)[0]);
      const bPercent = Number(b.result.match(/(\d+)/)[0]);
      return bPercent - aPercent;
    })
  : eliminated;

  const handleSort = () => {
    setSortOrder(!sortOrder);
  }

const getSortedData = () => {
  switch (sortOrder) {
    case 'descending':
      return eliminated.sort((a, b) => {
        const aPercent = Number(a.result.match(/(\d+)/)[0]);
        const bPercent = Number(b.result.match(/(\d+)/)[0]);
        return bPercent - aPercent;
      });
    case 'ascending':
      return eliminated.sort((a, b) => {
        const aPercent = Number(a.result.match(/(\d+)/)[0]);
        const bPercent = Number(b.result.match(/(\d+)/)[0]);
        return aPercent - bPercent;
      });
    default:
      return eliminated;
  }
};

const data = getSortedData();

let savedName = '';
nominated.forEach(participant => {
  if (participant.result === 'Salvado por el líder') {
    savedName = participant.name;
    return;
  }
});

return (
    <div className="content" style={{
    marginTop: -10,
    backgroundImage: `url(${require('./pictures/FondoPlaca.jpg')})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    zIndex: -1,
    paddingTop: 20,
    minHeight: '100vh'
    }}>

<Container style={{marginBottom:10, marginTop:10}}>
    <FormSelect id="roleSelect" onChange={e => setSelectedRole(e.target.value)}
    style={{display:'flex', justifyContent:'center', alignItems:'center', width:'50%', margin:'auto'}}
    className="comboBoxNominAnteriores"
    >
    <option value="Líder">Líderes</option>
    <option value="Nominado">Nominados</option>
    <option value="Eliminado">Eliminados</option>
    </FormSelect>
</Container>

<Container style={{paddingBottom: 5}}>
      {selectedRole === "Líder" && (
  <Table striped bordered hover className="center">
    <thead style={{background:'rgba(40,43,242,0.5)'}}>
      <tr className='encabezadoVotaciones' style={{marginBottom: '10px', backgroundImage: `url(${require('./pictures/HeaderVotaciones.jpg')})`}}>
        <th className='tituloTablaDetalleVotosJugador'>Semana</th>
        <th className='tituloTablaDetalleVotosJugador'>Nombre</th>
        <th className='tituloTablaDetalleVotosJugador'>Resultado</th>
      </tr>
    </thead>
    <tbody style={{background:'rgba(255,255,255,0.6)'}}>
    {leaders.map((leader, index) => (
        <tr>
          <td>{leader.week}</td>
          <td className='comboBoxNominAnteriores'>{leader.name}</td>
          <td>{leader.savedName}</td>
        </tr>
      ))}
    </tbody>
  </Table>
)}
{selectedRole === "Nominado" && (
  <Table striped bordered hover className="center">
    <thead style={{background:'rgba(40,43,242,0.5)'}}>
      <tr className='encabezadoVotaciones' style={{marginBottom: '10px', backgroundImage: `url(${require('./pictures/HeaderVotaciones.jpg')})`}}>
      <th className='tituloTablaDetalleVotosJugador'>Semana</th>
        <th className='tituloTablaDetalleVotosJugador'>Nombre</th>
        <th className='tituloTablaDetalleVotosJugador'>Resultado</th>
      </tr>
    </thead>
    <tbody style={{background:'rgba(255,255,255,0.6)'}}>
      {nominated.map((nominee, index) => (
        <tr>
          <td>{nominee.week}</td>
          <td className='comboBoxNominAnteriores'>{nominee.name}</td>
          <td>{nominee.result}</td>
        </tr>
      ))}
    </tbody>
  </Table>
)}

{selectedRole === "Eliminado" && (
    <><Button onClick={handleSort}>
        {sortOrder ? "Mostrar por defecto " : "Ordenar "}
        {sortOrder ? <ImTable2 /> : <ImSortNumbericDesc />}
    </Button>
    <Table striped bordered hover className="center">
        <thead style={{ background: 'rgba(40,43,242,0.5)' }}>
        <tr className='encabezadoVotaciones' style={{ marginBottom: '10px', backgroundImage: `url(${require('./pictures/HeaderVotaciones.jpg')})` }}>
        <th className='tituloTablaDetalleVotosJugador'>Semana</th>
        <th className='tituloTablaDetalleVotosJugador'>Nombre</th>
        <th className='tituloTablaDetalleVotosJugador'>Resultado</th>
        </tr>
        </thead>
        <tbody style={{ background: 'rgba(255,255,255,0.6)' }}>
        {sortedData.map(eliminatedPlayer => (
        <tr>
        <td>{eliminatedPlayer.week}</td>
        <td className='comboBoxNominAnteriores'>{eliminatedPlayer.name}</td>
        <td>{eliminatedPlayer.result}</td>
        </tr>
        ))}
        </tbody>
    </Table></>
)}
</Container>

  </div>
);
};
export default ListadoRolesNominaciones;