import React, { useState, useEffect } from 'react';
import '../App.css';
import {Button, Row, Col, Container, ListGroup, Table, FormCheck, FormSelect} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { dataPlaca } from '../data/placasData';
import { ImSortNumbericDesc, ImTable2 } from 'react-icons/im';

const PlacasEnContinuado = () => {


/*inicio llamado de datos automaticos*/
//   const [dataPlaca, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://raw.githubusercontent.com/Gaboamador/gh-data/main/placasNominados.json');
//         const jsonData = await response.json();
//         setData(jsonData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
// console.log(dataPlaca, "data placa")
//     fetchData();
//   }, []);
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
  <h6 style={{backgroundImage: `url(${require('../pictures/HeaderVotaciones.jpg')})`}} className="tituloTablasNomAnteriores">LISTADO DE PLACAS</h6>
</Container>
<Container style={{paddingBottom: 5}}>
  <Table striped bordered hover className="center">
    <thead style={{background:'rgba(40,43,242,0.5)'}}>
      <tr className='encabezadoVotaciones' style={{marginBottom: '10px', backgroundImage: `url(${require('../pictures/HeaderVotaciones.jpg')})`}}>
      <th className='tituloTablaDetalleVotosJugador'>Semana</th>
        <th className='tituloTablaDetalleVotosJugador'>Nombre</th>
        <th className='tituloTablaDetalleVotosJugador'>Resultado</th>
      </tr>
    </thead>
    <tbody style={{ background: 'rgba(255,255,255,0.6)', backgroundImage: `url(${require('../pictures/FondoPlaca2.jpg')})`, backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'}}>
  {Object.values(nominatedByWeek).map((nominee, index) => (
    <React.Fragment key={index}>
      <tr>
        <td rowSpan={nominee.names.length} className='comboBoxNominAnteriores'>{nominee.week}</td>
        <td className='comboBoxNominAnteriores'>{nominee.names[0]}</td>
        <td>{nominee.results[0]}</td>
      </tr>
      {nominee.names.slice(1).map((name, i) => (
        <tr key={i}>
          <td style={{ backgroundColor: nominee.results[i + 1].includes('Eliminado') ? 'rgba(171,52,191,0.6)' : 'inherit',
        color: nominee.results[i + 1].includes('Eliminado') ? 'white' : 'inherit' }}>{name}</td>
          <td style={{ backgroundColor: nominee.results[i + 1].includes('Eliminado') ? 'rgba(171,52,191,0.6)' : 'inherit',
        color: nominee.results[i + 1].includes('Eliminado') ? 'white' : 'inherit' }}>{nominee.results[i + 1]}</td>
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