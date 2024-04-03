import React, { useState, useEffect } from 'react';
import '../App.css';
import {Button, Row, Col, Container, ListGroup, Table, FormCheck, FormSelect} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { dataPlaca } from '../data/placasData';
import { ImSortNumbericDesc, ImTable2 } from 'react-icons/im';
import { fetchData } from '../componentes/DataService';
import Titulos from '../componentes/Titulos';

const PlacasEnContinuado = () => {


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


const nominated = [];

dataPlaca.forEach(week => {
    week.data.forEach(participant => {
        if (participant.role === "Nominado" || participant.role === "Nominado por el líder") {
        nominated.push({...participant, week: week.week + 1});
      }
    })
});

const nominatedByWeek = nominated.reduce((acc, cur) => {
    const { week, name, result } = cur;
    if (!acc[week]) {
    acc[week] = { week, names: [name], results: [result] };
    } else {
    acc[week].names.push(name);
    acc[week].results.push(result);
    }
    return acc;
    }, {});

return (
    <div className="content" style={{margin:"-10px 0px"}}>

<Titulos titulo = "listado de placas"/>

<Container>
  {/* <Table striped bordered hover className="tablaGeneralEspecial">
    <thead>
      <tr>
        <th>SEMANA</th>
        <th>NOMBRE</th>
        <th>RESULTADO</th>
      </tr>
    </thead>
    <tbody>
  {Object.values(nominatedByWeek).map((nominee, index) => (
    <React.Fragment key={index}>
      <tr>
        <td rowSpan={nominee.names.length}>{nominee.week}</td>
        <td>{nominee.names[0]}</td>
        <td>{nominee.results[0]}</td>
      </tr>
      {nominee.names.slice(1).map((name, i) => (
        <tr key={i}>
          <td>{name}</td>
          <td style={{ backgroundColor: nominee.results[i + 1].includes('Eliminado') ? 'rgba(171,52,191,1)' : 'inherit',
        color: nominee.results[i + 1].includes('Eliminado') ? 'black' : 'inherit' }}>{nominee.results[i + 1]}</td>
        </tr>
      ))}
    </React.Fragment>
  ))}
</tbody>
  </Table> */}
<Table striped bordered hover className="tablaGeneralEspecial">
  <thead>
    <tr>
      <th>NOMBRE</th>
      <th>RESULTADO</th>
    </tr>
  </thead>
  <tbody>
    {Object.values(nominatedByWeek).map((nominee, index) => (
      <React.Fragment key={index}>
        {nominee.names.map((name, i) => (
          <tr key={`${index}-${i}`}>
            {i - 1 === 0 && (
            <td colSpan="3" className={nominee.week === 1 ? "separator2" : "separator"}></td>)} 
          </tr>
        ))}
        {nominee.names.map((name, i) => (
          <tr key={`${index}-${i}`}>
            {i === 0 && (
            <td colSpan="3" className="week-begin">{'SEMANA ' + nominee.week}</td>)}
          </tr>
        ))}
        {nominee.names.map((name, i) => (
          <tr key={`${index}-${i}`}>
            <td className={nominee.results[i].includes('Eliminado') ? 'row-eliminado' : ''}>{name}</td>
            <td className={nominee.results[i].includes('Eliminado') ? 'row-eliminado' : ''}>{nominee.results[i]}</td>
          </tr>
        ))}
      </React.Fragment>
    ))}
  </tbody>
</Table>




</Container>

  </div>
);
};
export default PlacasEnContinuado;