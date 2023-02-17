import React, { useState, useEffect } from 'react';
import './App.css';
import {Button, Row, Col, Container, ListGroup, Table, FormCheck, FormSelect} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useData } from './data';
import { dataPlaca } from './dataPlaca';

const participantes = ['Agustín', 'Alexis', 'Ariel', 'Camila', 'Constanza', 'Daniela', 'Juan', 'Juliana', 'Julieta', 'Lucila', 'Marcos', 'María Laura', 'Martina', 'Maximiliano', 'Mora', 'Nacho', 'Romina', 'Thiago', 'Tomás', 'Walter'];

const VotacionesPorJugador = () => {

const [selectedName, setSelectedName] = useState(participantes[0]);
const [data, setData] = useData();

const [results, setResults] = useState([]);
    
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


return (
<div className="content" style={{
backgroundImage: `url(${require('./pictures/FondoPlaca.jpg')})`,
backgroundSize: 'cover',
backgroundRepeat: 'no-repeat',
backgroundPosition: 'center center',
zIndex: -1,
minHeight: '100vh'
}}>
 
  <Container style={{marginBottom:10}}> {/*COMBOBOX PARA SELECCIONAR JUGADOR*/}
    <FormSelect onChange={handleChange}
    style={{display:'flex', justifyContent:'center', alignItems:'center', width:'50%', margin:'auto'}}
    className="selectNominAnteriores">
    {participantes.map((option, index) => (
    <option key={index} value={option}>
    {option}
    </option>
    ))}
    </FormSelect>
  </Container>
    
  <Container style={{marginBottom:5}}>
  <h6 style={{backgroundImage: `url(${require('./pictures/HeaderVotaciones.jpg')})`}} className="tituloTablasNomAnteriores">DETALLE DE VOTACIONES DE {selectedName.toUpperCase()}</h6>
  </Container>

  <Container style={{paddingBottom: 5}}> {/*TABLA CON DETALLE DE VOTACIONES DE JUGADOR SELECCIONADO*/}
    <Table striped bordered hover className="center">
      <thead>
        <tr className='encabezadoVotaciones' style={{backgroundImage: `url(${require('./pictures/HeaderVotaciones.jpg')})`}}>
        <th className='tituloTablaDetalleVotosJugador'>Semana</th>
        <th className='tituloTablaDetalleVotosJugador'>Primer Lugar</th>
        <th className='tituloTablaDetalleVotosJugador'>Segundo Lugar</th>
        </tr>
      </thead>
      <tbody style={{background:'rgba(255,255,255,0.6)', backgroundImage: `url(${require('./pictures/FondoPlaca2.jpg')})`}}>
        {results.map((result, index) => (
        <tr key={index}>
        <td className='comboBoxNominAnteriores'>{result.week}</td>
        {result.vote.length === 1 && (
        <td colSpan={2}>{result.vote[0]}</td>
        )}
        {result.vote.length === 2 && (
        <>
        <td>{result.vote[0]}</td>
        <td>{result.vote[1]}</td>
        </>
        )}
        </tr>
        ))}
      </tbody>
    </Table>
  </Container>      

</div>
);
};
export default VotacionesPorJugador;