import React from "react";
import './App.css';
import {Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { FaVoteYea } from 'react-icons/fa';
import {BsFillPersonLinesFill, BsReverseLayoutTextWindowReverse, BsCalendarWeek, BsXCircle, BsAward, BsCalendar2Check, BsFillBarChartLineFill} from 'react-icons/bs';

function Home() {

  const icons = [
    { icon: FaVoteYea, label: 'Contador Nominaciones', to: '/ContadorNominaciones' },
    { icon: BsFillPersonLinesFill, label: 'Votaciones por Jugador (Lista)', to: 'VotacionesPorJugador' },
    { icon: BsFillBarChartLineFill, label: 'Votaciones por Jugador (Gráf.)', to: '/GraficoVotos' },
    { icon: BsCalendar2Check, label: 'Votaciones por Semana', to: '/VotacionesPorSemana' },
    { icon: BsCalendarWeek, label: 'Placas de Nominados por Semana', to: '/PlacasPorSemana' },
    { icon: BsReverseLayoutTextWindowReverse, label: 'Placas de Nominados en Lista', to: '/PlacasEnContinuado' },
    { icon: BsAward, label: 'Listado de Líderes', to: '/ListadoLideres' },
    { icon: BsXCircle, label: 'Listado de Eliminados', to: '/ListadoEliminados' },
  ];

return (
<div className="contentHome">

<Container className="navigation">
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
</Container>

</div>
);
}  
export default Home;