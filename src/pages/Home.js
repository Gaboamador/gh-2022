import React, { useState, useContext, useEffect } from "react";
import '../App.css';
import {Container, Image} from 'react-bootstrap';
import Context from "../context";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { FaVoteYea } from 'react-icons/fa';
import {BsFillPersonLinesFill, BsReverseLayoutTextWindowReverse, BsCalendarWeek, BsXCircle, BsAward, BsCalendar2Check, BsFillBarChartLineFill} from 'react-icons/bs';
// import { participants, participantsChart } from "../data/participantsData";
import { participantsToImage } from "../data/participantsToImage";


function Home() {

/*inicio llamado de datos automaticos*/
const [participants, setParticipants] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/Gaboamador/gh-data/main/participants.json');
      const jsonData = await response.json();
        // Check if the response has a "participants" property
        if (jsonData.participants && Array.isArray(jsonData.participants)) {
          setParticipants(jsonData.participants);
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

  const context= useContext(Context)
  
    // Separate participantsChart into non-eliminated and eliminated participants
  const nonEliminatedParticipants = participantsChart.filter(participant => participants.includes(participant));
  const eliminatedParticipants = participantsChart.filter(participant => !participants.includes(participant));
  
  const updateSelectedParticipant = (participant) => {
    context.setSelectedParticipant(participant);
}

  

return (
<div className="content">
<div className="paddingContent"></div>
{/* <Container className="navigation">
  {icons.map((item, index) => (
    <Link to={item.to} key={index} className='icon'>
      <div className="icon-wrapper">
        <div className="icon">
          <item.icon />
        </div>
      </div>
      <div className="label">{item.label}</div>
    </Link>
  ))}
</Container> */}

 {/* Container for non-eliminated participants */}
 <h6 className="tituloParticipantes">JUGADORES</h6>
 <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', padding: 5, marginBottom: 10 }}>
        {nonEliminatedParticipants.map((participant) => (
           <Link
           to="/GraficoVotos"
           onClick={() => updateSelectedParticipant(participant)}
           style={{ textDecoration: "none" }}
           key={participant}
         >
          <div style={{ alignItems: 'flex-end', padding: 5 }}>
            {/* <Image src={participantsToImage[participant]} width="99px" height="105px"/> */}
            <Image className="fotoJugador" src={participantsToImage[participant]}/>
          <div className="zocaloImagen">{participant.toUpperCase()}</div>
          </div>
          </Link>
        ))}
      </Container>

      {/* Container for eliminated participants */}
      <h6 className="tituloParticipantes" style={{ paddingTop: 10}}>ELIMINADOS</h6>
      <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', padding: 5, marginBottom: 10 }}>
        {eliminatedParticipants.map((participant) => (
          <Link
          to="/GraficoVotos"
          onClick={() => updateSelectedParticipant(participant)}
          style={{ textDecoration: "none" }}
          key={participant} 
        >
          <div style={{ alignItems: 'flex-end', padding: 5 }}>
            {/* <Image src={participantsToImage[participant]} width="99px" height="105px" /> */}
            <Image className="fotoJugador" src={participantsToImage[participant]}/>
          <div className="zocaloImagen">{participant.toUpperCase()}</div>
          </div>
          </Link>
        ))}
      </Container>

</div>
);
}  
export default Home;