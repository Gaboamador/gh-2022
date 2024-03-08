import React, { useState, useEffect } from 'react';
import '../App.css';
import {Button, Row, Col, Container, ListGroup, Table, FormCheck, FormSelect} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { dataPlaca } from '../data/placasData';
import { ImSortNumbericDesc, ImTable2 } from 'react-icons/im';
import Titulos from '../componentes/Titulos';

const ListadoLideres = () => {

/*inicio llamado de datos automaticos*/
const [dataPlaca, setData] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/Gaboamador/gh-data/main/placasNominados.json');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  fetchData();
}, []);
/*fin llamado de datos automaticos*/

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
    <div className="content" style={{margin:"-10px 0px"}}>

<Titulos titulo = "listado de líderes"/>

<Container>
<Table striped bordered hover className="tablaGeneral">
    <thead>
      <tr>
        <th>SEMANA</th>
        <th>LÍDER</th>
        <th>SALVÓ A</th>
        <th>NOMINÓ A</th>
      </tr>
    </thead>
    <tbody>
    {leaders.map((leader, index) => (
        <tr key={index}>
          <td>{leader.week}</td>
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