import React, { useState, useEffect } from 'react';
import './App.css';
import {Button, Row, Col, Container, ListGroup, Table, FormCheck, FormSelect} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useData } from './data';
import { dataPlaca } from './dataPlaca';

const participantes = ['Agustín', 'Alexis', 'Ariel', 'Camila', 'Constanza', 'Daniela', 'Juan', 'Juliana', 'Julieta', 'Lucila', 'Marcos', 'María Laura', 'Martina', 'Maximiliano', 'Mora', 'Nacho', 'Romina', 'Thiago', 'Tomás', 'Walter'];

const PlacasPorSemana = () => {
const [selectedOption, setSelectedOption] = useState(0);
const [selectedName, setSelectedName] = useState(participantes[0]);
const [data, setData] = useData();


const [results, setResults] = useState([]);

    const options = data.map((_, index) => (
      <option key={index} value={index}>
        Semana {index + 1}
      </option>
    ));
    
    const Footer = ({ data }) => {
        let hasStar = false;
        data.forEach(weekData => {
          weekData.forEach(row => {
            if (row.includes("(e)")) {
              hasStar = true;
            }
          });
        });
        return hasStar ? <p>(e) Espontánea</p> : null;
      };

     const handleChange = (event) => {
  const selectedName = event.target.value;
  let results = [];
  data.forEach((week, index) => {
    week.forEach((vote) => {
      if (vote[0] === selectedName) {
        results.push({
          week: index + 1,
          vote: vote.slice(1),
        });
      }
    });
  });
  setResults(results);
  setSelectedName(selectedName);
};

useEffect(() => {
  setSelectedName(participantes[0]);
  handleChange({ target: { value: participantes[0] } });
}, []);


const weekNumber = parseInt(selectedOption) + 1;

const DataTable = ({ week, data }) => {
  return (
    <Table striped bordered hover className="center">
      <thead style={{background:'rgba(40,43,242,0.5)'}}>
        <tr className='encabezadoVotaciones' style={{marginBottom: '10px', backgroundImage: `url(${require('./pictures/HeaderVotaciones.jpg')})`}}>
          <th className='tituloTablaDetalleVotosJugador'>Rol</th>
          <th className='tituloTablaDetalleVotosJugador'>Nombre</th>
          <th className='tituloTablaDetalleVotosJugador'>Resultado</th>
        </tr>
      </thead>
      <tbody style={{background:'rgba(255,255,255,0.6)', backgroundImage: `url(${require('./pictures/FondoPlaca2.jpg')})`}}>
        {data.map((row, index) => (
          <tr key={index}>
            <td className='comboBoxNominAnteriores'>{row.role}</td>
            <td>{row.name}</td>
            <td>{row.result}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};


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

<Container style={{marginBottom:10}}> {/*COMBOBOX PARA SELECCIONAR SEMANA*/}
    <FormSelect value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}
      style={{display:'flex', justifyContent:'center', alignItems:'center', width:'50%', margin:'auto'}}
      className="selectNominAnteriores">
      {options}
    </FormSelect>
  </Container>

<Container style={{marginBottom:5}}>
  <h6 style={{backgroundImage: `url(${require('./pictures/HeaderVotaciones.jpg')})`}} className="tituloTablasNomAnteriores">PLACA NOMINACIONES {weekNumber}° SEMANA</h6>
  </Container>
  
  <Container style={{}}> {/*TABLA CON RESULTADOS PLACA DE SEMANA SELECCIONADA*/}
    <Table>
    {dataPlaca.map(w => {
    if (w.week === Number(selectedOption)) {
    return <DataTable data={w.data}/>;
    }
    return null;
    })}
    </Table>
  </Container>

</div>
);
};
export default PlacasPorSemana;