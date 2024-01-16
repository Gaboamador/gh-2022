import React, { useState, useEffect } from 'react';
import '../App.css';
import {Button, Row, Col, Container, ListGroup, Table, Image, FormCheck, FormSelect} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useData } from '../data/votacionesData';
// import { participantsChart } from '../data/participantsData';
import { participantsToImage } from '../data/participantsToImage';



const VotacionesPorJugador = () => {

  const [data, setData] = useState([]);
  const [participantsChart, setParticipantsChart] = useState([]);
  

  const fetchData = async () => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/Gaboamador/gh-data/main/nominaciones.json');
    const jsonData = await response.json();

    if (jsonData && jsonData.data) {
      setData(jsonData.data);

    } else {
      console.error('Invalid data format:', jsonData);
    }

// Fetch data from the second URL
const response2 = await fetch('https://raw.githubusercontent.com/Gaboamador/gh-data/main/participantsChart.json');
const jsonData2 = await response2.json();

// Check if the response has a "participants" property
// if (jsonData.participantsChart && Array.isArray(jsonData.participantsChart)) {
  if (jsonData2 && Array.isArray(jsonData2.participantsChart)) {
    setParticipantsChart(jsonData2.participantsChart);
} else {
  console.error('Invalid data format:', jsonData2);
}

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

useEffect(() => {
  fetchData();
}, []);

// const [selectedName, setSelectedName] = useState(participantsChart[0]);
const [selectedName, setSelectedName] = useState('Agostina');

const selectedParticipantData = participantsChart.filter(participant => participant === selectedName);

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
  // setSelectedName(participantsChart[0]);
  // handleChange({ target: { value: participantsChart[0] } });
  setSelectedName('Agostina');
  handleChange({ target: { value: 'Agostina' } });
}, [data]);


return (
<div className="content" style={{
backgroundImage: `url(${require('../pictures/FondoPlaca.jpg')})`,
backgroundSize: 'cover',
backgroundRepeat: 'no-repeat',
backgroundPosition: 'center center',
zIndex: -1,
minHeight: '100vh'
}}>
 
  {/* <Container style={{marginBottom:10}}> */}
  <Container style={{display:'flex', alignItems: 'center'}}>
  {selectedParticipantData.map((participant) => (
          <div key={participant} style={{ display: 'inline-flex', alignItems: 'flex-end', padding: 5}}>
            <Image src={participantsToImage[selectedName]} width="99px" height="105px" />
          </div>
        ))}
    <FormSelect onChange={handleChange}
    style={{display:'flex', justifyContent:'center', alignItems:'center', width:'50%', margin:'auto'}}
    className="selectNominAnteriores">
    {participantsChart.map((option, index) => (
    <option key={index} value={option}>
    {option}
    </option>
    ))}
    </FormSelect>
  </Container>

  <Container style={{marginTop: 20, marginBottom: 20}}>
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

    
  <Container style={{marginBottom:5}}>
  <h6 style={{backgroundImage: `url(${require('../pictures/HeaderVotaciones.jpg')})`}} className="tituloTablasNomAnteriores">DETALLE DE VOTACIONES DE {selectedName.toUpperCase()}</h6>
  </Container>

  <Container style={{paddingBottom: 5}}> {/*TABLA CON DETALLE DE VOTACIONES DE JUGADOR SELECCIONADO*/}
    <Table striped bordered hover className="center">
      <thead>
        <tr className='encabezadoVotaciones' style={{backgroundImage: `url(${require('../pictures/HeaderVotaciones.jpg')})`}}>
        <th className='tituloTablaDetalleVotosJugador' style={{backgroundColor: 'transparent'}}>Semana</th>
        <th className='tituloTablaDetalleVotosJugador'style={{backgroundColor: 'transparent'}}>Primer Lugar</th>
        <th className='tituloTablaDetalleVotosJugador' style={{backgroundColor: 'transparent'}}>Segundo Lugar</th>
        </tr>
      </thead>
      <tbody style={{background:'rgba(255,255,255,0.6)', backgroundImage: `url(${require('../pictures/FondoPlaca2.jpg')})`}}>
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