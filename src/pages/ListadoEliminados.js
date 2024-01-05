import React, { useState, useEffect } from 'react';
import '../App.css';
import {Button, Row, Col, Container, ListGroup, Table, FormCheck, FormSelect} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { dataPlaca } from '../data/placasData';
import { ImSortNumbericDesc, ImTable2 } from 'react-icons/im';
import { BsSortNumericDownAlt, BsTable } from 'react-icons/bs';

const ListadoEliminados = () => {

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
    backgroundImage: `url(${require('../pictures/FondoPlaca.jpg')})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    zIndex: -1,
    paddingTop: 20,
    minHeight: '100vh'
    }}>


<Container style={{marginBottom:10}}>
  <h6 style={{backgroundImage: `url(${require('../pictures/HeaderVotaciones.jpg')})`}} className="tituloTablasNomAnteriores">LISTADO DE ELIMINADOS</h6>
  </Container>


<Container style={{paddingBottom:10, marginTop:10}}>
    <><Button onClick={handleSort} className='buttonSort'>
        {sortOrder ? "Mostrar por defecto " : "Ordenar "}
        {sortOrder ? <BsTable /> : <ImSortNumbericDesc />}
    </Button>
    <Table striped bordered hover className="center">
        <thead style={{ background: 'rgba(40,43,242,0.5)' }}>
        <tr className='encabezadoVotaciones' style={{ marginBottom: '10px', backgroundImage: `url(${require('../pictures/HeaderVotaciones.jpg')})` }}>
        <th className='tituloTablaDetalleVotosJugador' style={{backgroundColor: 'transparent'}}>Semana</th>
        <th className='tituloTablaDetalleVotosJugador' style={{backgroundColor: 'transparent'}}>Nombre</th>
        <th className='tituloTablaDetalleVotosJugador' style={{backgroundColor: 'transparent'}}>Resultado</th>
        </tr>
        </thead>
        <tbody style={{ background: 'rgba(255,255,255,0.6)', backgroundImage: `url(${require('../pictures/FondoPlaca2.jpg')})`}}>
        {sortedData.map(eliminatedPlayer => (
        <tr key={eliminatedPlayer.week}>
        <td className='comboBoxNominAnteriores'>{eliminatedPlayer.week}</td>
        <td>{eliminatedPlayer.name}</td>
        <td>{eliminatedPlayer.result}</td>
        </tr>
        ))}
        </tbody>
    </Table></>

</Container>

  </div>
);
};
export default ListadoEliminados;