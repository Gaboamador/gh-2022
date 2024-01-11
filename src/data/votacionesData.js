import React, { useState, useEffect } from 'react';
import '../App.css';
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
    [
    ['Agostina', 'Axel', 'Sabrina'],
    ['Alan', 'Carla', 'Catalina'],
    ['Axel', 'Catalina', 'Juliana'],
    ['Bautista', 'Juliana', 'Carla'],
    ['Carla', 'Isabel', 'Sabrina'],
    ['Catalina', 'Isabel', 'Sabrina'],
    ['Denisse', 'Carla', 'Juliana'],
    ['Emmanuel', 'Rosina', 'Lisandro'],
    ['Federico', 'Juliana', 'Florencia'],
    ['Florencia', 'Sabrina', 'Axel'],
    ['Isabel', 'Florencia', 'Juliana'],
    ['Joel', 'Catalina', 'Juliana'],
    ['Juliana', 'Sabrina', 'Axel'],
    ['Lisandro', 'Juliana', 'Florencia'],
    ['Lucía', 'Isabel', 'Axel'],
    ['Martín', 'Catalina', 'Carla'],
    ['Nicolás', 'Florencia', 'Juliana'],
    ['Rosina', 'Axel', 'Carla'],
    ['Sabrina', 'Juliana', 'Carla'],
    ['Williams', 'Juliana', 'Carla'],
    ['Zoe', 'Juliana', 'Agostina']
    ],
/*SEMANA 3*/
[
    ['Agostina', 'Florencia', 'Sabrina'],
    ['Alan', 'Carla', 'Joel'],
    ['Bautista', 'Carla', 'Catalina'],
    ['Carla', 'Sabrina', 'Denisse'],
    ['Catalina', 'Lisandro', 'Sabrina'],
    ['Denisse', 'Carla', 'Florencia'],
    ['Emmanuel', 'Florencia', 'Agostina'],
    ['Federico', 'Carla', 'Florencia'],
    ['Florencia', 'Sabrina', 'Isabel'],
    ['Isabel', 'Florencia', 'Catalina'],
    ['Joel', 'Carla', 'Lisandro'],
    ['Lisandro', 'Florencia', 'Catalina'],
    ['Lucía', 'Isabel', 'Florencia'],
    ['Martín', 'Florencia', 'Agostina'],
    ['Nicolás', 'Florencia', 'Carla'],
    ['Rosina', 'Florencia', 'Lisandro'],
    ['Sabrina', 'Florencia', 'Carla'],
    ['Zoe', 'Florencia', 'Carla']
],
/*SEMANA 4*/
[
    ['Agostina', 'Martín', 'Sabrina'],
    ['Alan', 'Juliana', 'Rosina'],
    ['Bautista', 'Carla', 'Catalina'],
    ['Carla', 'Isabel', 'Martín'],
    ['Catalina', 'Martín', 'Lisandro'],
    ['Denisse', 'Carla', 'Juliana'],
    ['Emmanuel', 'Lisandro', 'Denisse'],
    ['Federico', 'Carla', 'Florencia'],
    ['Florencia', 'Martín', 'Isabel'],
    ['Isabel', 'Catalina', 'Florencia'],
    ['Joel', 'Lisandro', 'Sabrina'],
    ['Juliana', 'Lisandro', 'Isabel'],
    ['Lisandro', 'Catalina', 'Florencia'],
    ['Lucía', 'Isabel', 'Florencia'],
    ['Martín', 'Carla', 'Florencia'],
    ['Rosina', 'Florencia', 'Carla'],
    ['Sabrina', 'Catalina', 'Juliana'],
    ['Zoe', 'Isabel', 'Florencia']
],
/*SEMANA 5*/
[
    ['Agostina', 'Emmanuel', 'Florencia'],
    ['Alan', 'Agostina', 'Catalina'],
    ['Bautista', 'Carla', 'Catalina'],
    ['Catalina', 'Emmanuel', 'Florencia'],
    ['Denisse', 'Emmanuel', 'Carla'],
    ['Emmanuel', 'Agostina', 'Catalina'],
    ['Federico', 'Agostina', 'Rosina'],
    ['Florencia', 'Carla', 'Agostina'],
    ['Joel', 'Agostina', 'Catalina'],
    ['Lisandro', 'Carla', 'Emmanuel'],
    ['Lucía', 'Florencia', 'Carla'],
    ['Martín', 'Catalina', 'Carla'],
    ['Nicolás', 'Catalina', 'Carla'],
    ['Rosina', 'Sabrina', 'Emmanuel'],
    ['Sabrina', 'Joel', 'Emmanuel'],
    ['Zoe', 'Carla', 'Emmanuel']
],

    ]);
    data[0][13].espontanea = true; /*semana 1*/    
    data[1][0].anulado2 = true; /*semana 2*/ /*solo anulado el segundo voto*/
    data[1][3].anulado1 = true; /*semana 2*/ /*solo anulado el primer voto*/
    data[1][4].anulado2 = true; /*semana 2*/
    data[1][5].anulado2 = true; /*semana 2*/
    data[1][9].anulado1 = true; /*semana 2*/
    data[1][10].anulado2 = true; /*semana 2*/
    data[1][12].espontanea = true; /*semana 2*/
    data[1][12].anulado1 = true; /*semana 2*/
    data[1][18].anulado1 = true; /*semana 2*/
    data[1][19].anulado1 = true; /*semana 2*/
    data[2][4].espontanea = true; /*semana 3*/
    data[3][11].espontanea = true; /*semana 4*/
    // data[1][6].anulado = true;
    // data[17][8].fulminante = true;
    return [data, setData];
  };