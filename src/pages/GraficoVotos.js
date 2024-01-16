import React, { useState, useEffect, useContext} from "react";
import { Container, FormSelect, Image} from "react-bootstrap";
import Context from "../context";
// import {participantsChart} from "../data/participantsData";
import { participantsToImage } from "../data/participantsToImage";
import LineaDivisoria1 from "../componentes/LineaDivisoria1";
import LineaDivisoria2 from "../componentes/LineaDivisoria2";
import GraficoVotos1 from "../graficos/GraficoVotos1";
import GraficoVotos2 from "../graficos/GraficoVotos2";
import GraficoVotos3 from "../graficos/GraficoVotos3";
import GraficoVotos4 from "../graficos/GraficoVotos4";
import GraficoVotos5 from "../graficos/GraficoVotos5";
import GraficoVotos6 from "../graficos/GraficoVotos6";

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
<div className="contentChart">
{/* <div className="contentChart" style={{minHeight: '100vh'}}> */}

<Container style={{display:'flex', alignItems: 'center'}}>
  {selectedParticipantData.map((participant) => (
          <div key={participant} style={{ display: 'inline-flex', alignItems: 'flex-end', padding: 5}}>
            <Image src={participantsToImage[selectedParticipant]} width="99px" height="105px" />
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

<LineaDivisoria1/>
{/* prueba grafico 6 */}
{/* <Container>
<GraficoVotos6 participantName={selectedParticipant} className='grafico'/>
</Container>

<LineaDivisoria2/> */}
{/* prueba grafico 6 */}
<Container>
<GraficoVotos1 participantName={selectedParticipant} className='grafico'/>
</Container>

<LineaDivisoria2/>

<Container>
<GraficoVotos5 participantName={selectedParticipant} className='grafico'/>
</Container>

<LineaDivisoria1/>

<Container>
<GraficoVotos2 participantName={selectedParticipant} className='grafico'/>
</Container>

<LineaDivisoria2/>

<Container>
<GraficoVotos3 participantName={selectedParticipant} className='grafico'/>
</Container>

<LineaDivisoria1/>

<Container>
<GraficoVotos4 participantName={selectedParticipant} className='grafico'/>
</Container>


    </div>
  );
};

export default GraficoVotos;