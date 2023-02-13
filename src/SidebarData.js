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
    title: 'Nominaciones Anteriores',
    path: '/NominAnteriores',
    icon: <GiVote size={40}/>,
    cName: 'nav-text'
  },
  {
    title: 'Listado Roles Nominaciones',
    path: '/ListadoRolesNominaciones',
    icon: <GiVote size={40}/>,
    cName: 'nav-text'
  },
];