import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const useData = () => {
    const [data, setData] = useState([
/*SEMANA 1*/
[
    ['Agostina', 'Lucía', 'Isabel'],
    ['Alan', 'Zoe', 'Juliana'],
    ['Axel', 'Carla', 'Juliana'],
    ['Bautista', 'Juliana', 'Catalina'],
    ['Carla', 'Hernán', 'Axel'],
    ['Catalina', 'Hernán', 'Nicolás'],
    ['Denisse', 'Juliana', 'Lisandro'],
    ['Emmanuel', 'Juliana', 'Hernán'],
    ['Federico', 'Catalina', 'Juliana'],
    ['Florencia', 'Emmanuel', 'Williams'],
    ['Hernán', 'Catalina', 'Juliana'],
    ['Isabel', 'Zoe', 'Juliana'],
    ['Joel', 'Juliana', 'Hernán'],
    ['Juliana', 'Denisse', 'Zoe'],
    ['Lisandro', 'Juliana', 'Zoe'],
    ['Lucía', 'Denisse', 'Florencia'],
    ['Martín', 'Zoe', 'Carla'],
    ['Nicolás', 'Juliana', 'Hernán'],
    ['Rosina', 'Juliana', 'Axel'],
    ['Sabrina', 'Juliana', 'Catalina'],
    ['Williams', 'Isabel', 'Juliana'],
    ['Zoe', 'Williams', 'Axel'],
    ],
/*SEMANA 2*/



    ]);
    data[0][13].espontanea = true; /*semana 1*/
    // data[1][12].espontanea = true; /*semana 2*/
    // data[1][6].anulado = true; /*semana 2*/
    // data[6][13].anulado1 = true; /*semana 7*/ /*solo anulado el primer voto*/
    // data[10][5].anulado2 = true; /*semana 11*/ /*solo anulado el segundo voto*/
    // data[17][8].fulminante = true; /*semana 18*/
    return [data, setData];
  };