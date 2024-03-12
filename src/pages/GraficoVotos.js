import React, { useState, useEffect, useContext} from "react";
import { Container, FormSelect, Image} from "react-bootstrap";
import Context from "../context";
// import {participantsChart} from "../data/participantsData";
import { participantsToImage } from "../data/participantsToImage";
import LineaDivisoria from "../componentes/LineaDivisoria";
import LineaDivisoriaToRight from "../componentes/LineaDivisoriaToRight";
import GraficoVotos1 from "../graficos/GraficoVotos1";
import GraficoVotos2 from "../graficos/GraficoVotos2";
import GraficoVotos3 from "../graficos/GraficoVotos3";
import GraficoVotos4 from "../graficos/GraficoVotos4";

const GraficoVotos = () => {
  
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []); 

  const context= useContext(Context)

/*inicio llamado de datos automaticos*/
const [participantsChart, setParticipantsChart] = useState([]);

useEffect(() => {
const fetchData = async () => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/Gaboamador/gh-data/main/participantsChart.json');
    const jsonData = await response.json();
      // Check if the response has a "participants" property
      if (jsonData.participantsChart && Array.isArray(jsonData.participantsChart)) {
        setParticipantsChart(jsonData.participantsChart);
      } else {
        console.error('Invalid data format:', jsonData);
      }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
fetchData();
}, []);
/*fin llamado de datos automaticos*/

  // const participantes = participantsChart;

  // const [selectedParticipant, setSelectedParticipant] = useState(
  //   context.selectedParticipant !== '' ? context.selectedParticipant : participantsChart[0]
  // );
  const [selectedParticipant, setSelectedParticipant] = useState(
    context.selectedParticipant !== '' ? context.selectedParticipant : (participantsChart[0] || '')
  );
  useEffect(() => {
    if (participantsChart.length > 0) {
      // Execute your code here
      // For example, you might want to update the selected participant
      setSelectedParticipant((prevSelected) => {
        // Ensure the previously selected participant is still in the updated participantsChart
        return participantsChart.includes(prevSelected) ? prevSelected : participantsChart[0];
      });
    }
  }, [participantsChart]);
  
  const selectedParticipantData = participantsChart.filter(participant => participant === selectedParticipant);

  const handleParticipantChange = (event) => {
    setSelectedParticipant(event.target.value);
  };

  return (
<div className="content">
{/* <div className="contentChart" style={{minHeight: '100vh'}}> */}
<div className="paddingContent"></div>
<Container style={{display:'flex', alignItems: 'center'}}>
  {selectedParticipantData.map((participant) => (
          <div key={participant} style={{ alignItems: 'flex-end', padding: "5px 5px 0px 5px"}}>
            {/* <Image src={participantsToImage[selectedParticipant]} width="99px" height="105px"/> */}
            <Image className="fotoJugador" src={participantsToImage[participant]}/>
          <div className="zocaloImagen">{participant.toUpperCase()}</div>
          </div>
        ))}
  <FormSelect
    value={selectedParticipant}
    onChange={handleParticipantChange}
    style={{display:'flex', justifyContent:'center', alignItems:'center', width:'50%', margin:'auto'}}
    className="selectNominAnteriores">
    {participantsChart.map((participant) => (
    <option key={participant}>
    {participant}
    </option>))}
  </FormSelect>
</Container>

<LineaDivisoriaToRight/>

<h6 className="titleChartType">Gráfico de Nominaciones Realizadas</h6>

<Container>
<GraficoVotos1 participantName={selectedParticipant} className='grafico'/>
</Container>

<LineaDivisoria nLine={1}/>

<h6 className="titleChartType">Gráficos de Nominaciones Recibidas</h6>

<Container>
<GraficoVotos2 participantName={selectedParticipant} className='grafico'/>
</Container>

<LineaDivisoria nLine={2}/>

<Container>
<GraficoVotos3 participantName={selectedParticipant} className='grafico'/>
</Container>

<LineaDivisoria nLine={1}/>

<Container>
<GraficoVotos4 participantName={selectedParticipant} className='grafico'/>
</Container>


    </div>
  );
};

export default GraficoVotos;