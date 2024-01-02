import React, { useState, useContext, useEffect } from "react";
import '../App.css';
import {Container, Image} from 'react-bootstrap';
import Context from "../context";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { FaVoteYea } from 'react-icons/fa';
import {BsFillPersonLinesFill, BsReverseLayoutTextWindowReverse, BsCalendarWeek, BsXCircle, BsAward, BsCalendar2Check, BsFillBarChartLineFill} from 'react-icons/bs';
import { participants, participantsChart } from "../data/participantsData";
import { participantsToImage } from "../data/participantsToImage";

function Home() {

  // const icons = [
  //   { icon: FaVoteYea, label: 'Contador Nominaciones', to: '/ContadorNominaciones' },
  //   { icon: BsFillPersonLinesFill, label: 'Votaciones por Jugador (Lista)', to: 'VotacionesPorJugador' },
  //   { icon: BsFillBarChartLineFill, label: 'Votaciones por Jugador (Gráf.)', to: '/GraficoVotos' },
  //   { icon: BsCalendar2Check, label: 'Votaciones por Semana', to: '/VotacionesPorSemana' },
  //   { icon: BsCalendarWeek, label: 'Placas de Nominados por Semana', to: '/PlacasPorSemana' },
  //   { icon: BsReverseLayoutTextWindowReverse, label: 'Placas de Nominados en Lista', to: '/PlacasEnContinuado' },
  //   { icon: BsAward, label: 'Listado de Líderes', to: '/ListadoLideres' },
  //   { icon: BsXCircle, label: 'Listado de Eliminados', to: '/ListadoEliminados' },
  // ];
  const context= useContext(Context)
  
    // Separate participantsChart into non-eliminated and eliminated participants
  const nonEliminatedParticipants = participantsChart.filter(participant => participants.includes(participant));
  const eliminatedParticipants = participantsChart.filter(participant => !participants.includes(participant));
  
  const updateSelectedParticipant = (participant) => {
    context.setSelectedParticipant(participant);
}

  

return (
<div className="contentHome">

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
 <h6 className="tituloParticipantes">PARTICIPANTES</h6>
 <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', padding: 5, marginBottom: 10 }}>
        {nonEliminatedParticipants.map((participant) => (
           <Link
           to="/GraficoVotos"
           onClick={() => updateSelectedParticipant(participant)}
           style={{ textDecoration: "none" }}
         >
          <div key={participant} style={{ display: 'inline-flex', alignItems: 'flex-end', padding: 5 }}>
            <Image src={participantsToImage[participant]} width="99px" height="105px"/>
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
        >
          <div key={participant} style={{ display: 'inline-flex', alignItems: 'flex-end', padding: 5 }}>
            <Image src={participantsToImage[participant]} width="99px" height="105px" />
          </div>
          </Link>
        ))}
      </Container>

</div>
);
}  
export default Home;