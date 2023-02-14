import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as Io5 from "react-icons/io5";
import * as Ri from "react-icons/ri";
import * as Bi from "react-icons/bi";
import { GiVote, GiCalculator, GiHouse } from 'react-icons/gi';

export const SidebarData = [
  {
    title: 'Página Principal',
    path: '/',
    icon: <GiHouse size={40}/>,
    cName: 'nav-text'
  },
  {
    title: 'Contador Nominaciones',
    path: '/ContadorNominaciones',
    icon: <GiCalculator size={40} />,
    cName: 'nav-text'
  },
  {
    title: 'Placas por semana',
    path: '/PlacasPorSemana',
    icon: <GiVote size={40}/>,
    cName: 'nav-text'
  },
  {
    title: 'Placas en continuado',
    path: '/PlacasEnContinuado',
    icon: <GiVote size={40}/>,
    cName: 'nav-text'
  },
  {
    title: 'Votaciones por semana',
    path: '/VotacionesPorSemana',
    icon: <GiVote size={40}/>,
    cName: 'nav-text'
  },
  {
    title: 'Votaciones por jugador',
    path: '/VotacionesPorJugador',
    icon: <GiVote size={40}/>,
    cName: 'nav-text'
  },
  {
    title: 'Listado de líderes',
    path: '/ListadoLideres',
    icon: <GiVote size={40}/>,
    cName: 'nav-text'
  },
  {
    title: 'Listado de eliminados',
    path: '/ListadoEliminados',
    icon: <GiVote size={40}/>,
    cName: 'nav-text'
  },
];
