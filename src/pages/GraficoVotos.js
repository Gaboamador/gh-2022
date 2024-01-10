import React, { useState, useEffect, useContext} from "react";
import { Container, FormSelect, Image} from "react-bootstrap";
import Context from "../context";
import {participantsChart} from "../data/participantsData";
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

  const participantes = participantsChart;

  const [selectedParticipant, setSelectedParticipant] = useState(
    context.selectedParticipant !== '' ? context.selectedParticipant : participantes[0]
  );
  
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
    {participantes.map((participant) => (
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