import React, { useState, useEffect } from 'react';
import '../App.css';
import {Button, Row, Col, Container, ListGroup, Table, Image, FormCheck, FormSelect} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useData } from '../data/votacionesData';
// import { participantsChart } from '../data/participantsData';
import { participantsToImage } from '../data/participantsToImage';
import { fetchData } from '../componentes/DataService';
import Titulos from '../componentes/Titulos';
import LineaDivisoriaToRight from '../componentes/LineaDivisoriaToRight';



const VotacionesPorJugador = () => {

  const [data, setData] = useState([]);
  const [participantsChart, setParticipantsChart] = useState([]);
  
  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const { nominaciones, participantsChart } = await fetchData();
          if (nominaciones && nominaciones.data) {
          setData(nominaciones.data);
            } else {
              console.error('Invalid data format:', nominaciones);
          }        
          if (participantsChart.participantsChart && Array.isArray(participantsChart.participantsChart)) {
          setParticipantsChart(participantsChart.participantsChart)
            } else {
            console.error('Invalid data format:', participantsChart);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    };
  
    fetchDataFromAPI();
  }, []);

//   const fetchData = async () => {
//   try {
//     const response = await fetch('https://raw.githubusercontent.com/Gaboamador/gh-data/main/nominaciones.json');
//     const jsonData = await response.json();

//     if (jsonData && jsonData.data) {
//       setData(jsonData.data);

//     } else {
//       console.error('Invalid data format:', jsonData);
//     }

// // Fetch data from the second URL
// const response2 = await fetch('https://raw.githubusercontent.com/Gaboamador/gh-data/main/participantsChart.json');
// const jsonData2 = await response2.json();

// // Check if the response has a "participants" property
// // if (jsonData.participantsChart && Array.isArray(jsonData.participantsChart)) {
//   if (jsonData2 && Array.isArray(jsonData2.participantsChart)) {
//     setParticipantsChart(jsonData2.participantsChart);
// } else {
//   console.error('Invalid data format:', jsonData2);
// }

//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };

// useEffect(() => {
//   fetchData();
// }, []);

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
<div className="content">

<div className="paddingContent"></div>
 
  {/* <Container style={{marginBottom:10}}> */}
  <Container style={{display:'flex', alignItems: 'center'}}>
  {selectedParticipantData.map((participant) => (
          <div key={participant} style={{ alignItems: 'flex-end', padding: "5px 5px 0px 5px"}}>
            {/* <Image src={participantsToImage[selectedName]} width="99px" height="105px" /> */}
            <Image className="fotoJugador" src={participantsToImage[participant]}/>
          <div className="zocaloImagen">{participant.toUpperCase()}</div>
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

  {/* <Container style={{marginTop: 20, marginBottom: 20}}>
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
</Container> */}
{/* <LineaDivisoriaToRight/> */}

  <Titulos titulo = "detalle de votaciones de" participante={selectedName}/>

  <Container> {/*TABLA CON DETALLE DE VOTACIONES DE JUGADOR SELECCIONADO*/}
    <Table striped bordered hover className="tablaGeneral">
      <thead>
        <tr>
        <th>Semana</th>
        <th>Primer Lugar</th>
        <th>Segundo Lugar</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result, index) => (
        <tr key={index}>
        <td>{result.week}</td>
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