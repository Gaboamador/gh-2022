import React, { useState, useEffect } from 'react';
import './App.css';
import {Button, Row, Col, Container, ListGroup, Table, FormCheck, FormSelect} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useData } from './data';
import { dataPlaca } from './dataPlaca';
import participants from "./participantsData";

const participantes = participants;

const NominAnteriores = () => {
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
      <tbody style={{background:'rgba(255,255,255,0.6)'}}>
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
marginTop: -10,
backgroundImage: `url(${require('./pictures/FondoPlaca.jpg')})`,
backgroundSize: 'cover',
backgroundRepeat: 'no-repeat',
backgroundPosition: 'center center',
zIndex: -1,
paddingTop: 20,
minHeight: '100vh'
}}>

<Container style={{marginBottom:10, marginTop:10}}> {/*COMBOBOX PARA SELECCIONAR SEMANA*/}
    <FormSelect value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}
      style={{display:'flex', justifyContent:'center', alignItems:'center', width:'50%', margin:'auto'}}
      className="comboBoxNominAnteriores">
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
  
  <Container style={{marginBottom:5}}>
  <h6 style={{backgroundImage: `url(${require('./pictures/HeaderVotaciones.jpg')})`}} className="tituloTablasNomAnteriores">DETALLE DE VOTACIONES {weekNumber}° SEMANA</h6>
  </Container>

  <Container> {/*TABLA CON DETALLE DE VOTACIONES DE SEMANA SELECCIONADA*/}
    <Table striped bordered hover className="center">
      <thead>
        <tr className='encabezadoVotaciones' style={{marginBottom: '10px', backgroundImage: `url(${require('./pictures/HeaderVotaciones.jpg')})`}}>
          <th className='tituloTablaDetalleVotosJugador'>Jugador</th>
          <th className='tituloTablaDetalleVotosJugador'>Primer Lugar</th>
          <th className='tituloTablaDetalleVotosJugador'>Segundo Lugar</th>
        </tr>
      </thead>
      <tbody style={{background:'rgba(255,255,255,0.6)'}}>
        {data[selectedOption].map((row, index) => (
        <tr key={index}>
          <td className='comboBoxNominAnteriores'>{row[0]}</td>
          {row.length === 2 && (
          <td colSpan={2}>{row[1]}</td>
          )}
          {row.length === 3 && (
          <>
          <td>{row[1]}</td>
          <td>{row[2]}</td>
          </>
          )}
        </tr>
        ))}
      </tbody>
    </Table>
    <Footer data={data[selectedOption]}/>
  </Container>

  <Container style={{marginTop: '20px'}}>
<Row>
  <Col xs={1}>
  </Col>
  <Col xs={8} className="lineaDivisoria2" style={{width:'60%'}}>
  </Col>
  <Col xs={1}>
  </Col>
  <Col xs={2} className="lineaDivisoria2" style={{width:'20%'}}>
  </Col>
  </Row>
</Container>

  <Container style={{marginBottom:10, marginTop:10}}> {/*COMBOBOX PARA SELECCIONAR JUGADOR*/}
    <FormSelect onChange={handleChange}
    style={{display:'flex', justifyContent:'center', alignItems:'center', width:'50%', margin:'auto'}}
    className="comboBoxNominAnteriores">
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
      <tbody style={{background:'rgba(255,255,255,0.6)'}}>
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
export default NominAnteriores;