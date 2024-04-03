import React, { useState, useEffect } from 'react';
import '../App.css';
import {Button, Row, Col, Container, ListGroup, Table, FormCheck, FormSelect} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { dataPlaca } from '../data/placasData';
import { ImSortNumbericDesc, ImTable2 } from 'react-icons/im';
import { fetchData } from '../componentes/DataService';
import Titulos from '../componentes/Titulos';

const ListadoLideres = () => {

/*inicio llamado de datos automaticos*/
const [dataPlaca, setData] = useState([]);

useEffect(() => {
  const fetchDataFromAPI = async () => {
    try {
      const { placaNominados } = await fetchData();
      setData(placaNominados);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchDataFromAPI();
}, []);

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await fetch('https://raw.githubusercontent.com/Gaboamador/gh-data/main/placasNominados.json');
//       const jsonData = await response.json();
//       setData(jsonData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
//   fetchData();
// }, []);
/*fin llamado de datos automaticos*/

/*INICIO SET DE DATOS MANUAL PARA PRUEBAS DE CÓDIGO. DESHABILITADO POR DEFAULT, USAR PARA PRUEBAS LOCALES*/
// const dataPlaca = [
// {
// "week": 0,
// "data": [
// { "role": "Líder", "name": "Sabrina", "result": "-" },
// { "role": "Nominado", "name": "Catalina", "result": "Salvado por el líder" },
// { "role": "Nominado", "name": "Zoe", "result": "10,60% (Entre 4)" },
// { "role": "Nominado por el líder", "name": "Williams", "result": "6,76% (Entre 3)" },
// { "role": "Nominado", "name": "Juliana", "result": "47,40% (Entre 2)" },
// { "role": "Nominado", "name": "Hernán", "result": "Eliminado (52,60%)" }
// ]
// },
// {
// "week": 12,
// "data": [
// { "role": "Líder", "name": "Martín", "result": "-" },
// { "role": "Líder", "name": "Zoe", "result": "-" },
// { "role": "Nominado", "name": "Florencia", "result": "Salvado por el líder" },
// { "role": "Nominado por el líder", "name": "Nicolás", "result": "" },
// { "role": "Nominado por el líder", "name": "Mauro", "result": "" },
// { "role": "Nominado", "name": "Denisse", "result": "" },
// { "role": "Nominado", "name": "Darío", "result": "" },
// { "role": "Nominado", "name": "Damián", "result": "" },
// { "role": "Nominado", "name": "Bautista", "result": "" }
// ]
// },
// {
// "week": 13,
// "data": [
// { "role": "Líder", "name": "Emmanuel", "result": "-" },
// { "role": "Nominado", "name": "Martín", "result": "Salvado por el líder" },
// { "role": "Nominado", "name": "Nicolás", "result": "0,20% (Entre 5)" },
// { "role": "Nominado", "name": "Bautista", "result": "1,40% (Entre 4)" },
// { "role": "Nominado", "name": "Joel", "result": "3,00% (Entre 3)" },
// { "role": "Nominado por el líder", "name": "Catalina", "result": "39,50% (Entre 2)" },
// { "role": "Nominado", "name": "Sabrina", "result": "Eliminado (60,50%)" }
// ]
// },
// ];
/*FIN SET DE DATOS MANUAL PARA PRUEBAS DE CÓDIGO. DESHABILITADO POR DEFAULT, USAR PARA PRUEBAS LOCALES*/

const leaders = [];

dataPlaca.forEach(week => {
    let savedParticipant = null;
    // let leader = null;
    let leadersInWeek = []; // Array to store multiple leaders in the same week
    // let leaderNominee = null;
    let leaderNomineesInWeek = [];
    week.data.forEach(participant => {
      if (participant.result === "Salvado por el líder") {
        savedParticipant = participant;
      }
      if (participant.role === "Nominado por el líder") {
        // leaderNominee = participant;
        leaderNomineesInWeek.push(participant)
      }
      if (participant.role === "Líder") {
        // leader = participant;
        leadersInWeek.push(participant); // Store all leaders in the same week
      }
    });

         // For each leader in the week, add an entry to the leaders array
    leadersInWeek.forEach((leader, index) => {
      // Find the nominee corresponding to the current leader index
      const nominee = leaderNomineesInWeek[index] || null;
  
      leaders.push({
          week: week.week + 1,
          name: leader.name,
          savedName: savedParticipant ? savedParticipant.name : "No hubo salvados",
          leaderNominee: nominee ? nominee.name : leaderNomineesInWeek.length === 2 ? "No nominaron como líderes" : "No nominó como líder",
      });
  });

});


return (
    <div className="content">

<Titulos titulo = "listado de líderes"/>

<Container>
<Table striped bordered className="tablaGeneral lideres">
    <thead>
      <tr>
        <th>SEMANA</th>
        <th>LÍDER</th>
        <th>SALVÓ A</th>
        <th>NOMINÓ A</th>
      </tr>
    </thead>
    <tbody>
    {/* {leaders.map((leader, index) => (
        <tr key={index}>
          <td>{leader.week}</td>
          <td>{leader.name}</td>
          <td>{leader.savedName}</td>
          <td>{leader.leaderNominee}</td>
        </tr>
      ))} */}
  {leaders.map((leader, index) => (
                        <tr key={index}>
                          
                          {leaders.filter(l => l.week === leader.week).length === 2 ? (
                          leaders.indexOf(leader) === leaders.findIndex(l => l.week === leader.week) &&
                          <td rowSpan={2}>{leader.week}</td>
                          ) : (
                          <td>{leader.week}</td>
                          )}

                          <td>{leader.name}</td>

                          {leaders.filter(l => l.week === leader.week).length === 2 ? (
                          leaders.indexOf(leader) === leaders.findIndex(l => l.week === leader.week) &&
                          <td rowSpan={2}>{leader.savedName}</td>
                          ) : (
                          <td>{leader.savedName}</td>
                          )}

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