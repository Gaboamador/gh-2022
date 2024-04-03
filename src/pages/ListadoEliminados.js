import React, { useState, useEffect } from 'react';
import '../App.css';
import { Button, Container, Table } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { ImSortNumbericDesc } from 'react-icons/im';
import { BsTable } from 'react-icons/bs';
import { fetchData } from '../componentes/DataService';
import Titulos from '../componentes/Titulos';

const ListadoEliminados = () => {

/*inicio llamado de datos automaticos*/
const [dataPlaca, setData] = useState([]);

useEffect(() => {
  const fetchDataFromAPI = async () => {
    try {
      const { placaNominados } = await fetchData();
      setData(placaNominados);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchDataFromAPI();
}, []);

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await fetch('https://raw.githubusercontent.com/Gaboamador/gh-data/main/placasNominados.json');
//       const jsonData = await response.json();
//       setData(jsonData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
//   fetchData();
// }, []);
/*fin llamado de datos automaticos*/

const eliminated = [];

dataPlaca.forEach(week => {
    week.data.forEach(participant => {
      if (participant.result.includes('Eliminado')) {
        eliminated.push({...participant, week: week.week + 1, key: `${participant.name}_${week.week + 1}`});
      }
    })
});

const [sortOrder, setSortOrder] = useState(false);

const handleSort = () => {
  setSortOrder(!sortOrder);
}

const sortedData = sortOrder
  ? eliminated.sort((a, b) => {
      const aPercent = Number(a.result.match(/(\d+)/)[0]);
      const bPercent = Number(b.result.match(/(\d+)/)[0]);
      return bPercent - aPercent;
    })
  : eliminated;

return (
    <div className="content">

<Titulos titulo = "listado de eliminados"/>

<Container>
    <Button onClick={handleSort} className='buttonSort'>
        {sortOrder ? "Ordernar por semana " : "Ordenar de mayor a menor "}
        {sortOrder ? <BsTable /> : <ImSortNumbericDesc />}
    </Button>
    <Table striped bordered hover className="tablaGeneral">
        <thead>
        <tr>
        <th>SEMANA</th>
        <th>NOMBRE</th>
        <th>RESULTADO</th>
        </tr>
        </thead>
        <tbody>
        {sortedData.map(eliminatedPlayer => (
        <tr key={eliminatedPlayer.key}>
        <td>{eliminatedPlayer.week}</td>
        <td>{eliminatedPlayer.name}</td>
        <td>{eliminatedPlayer.result}</td>
        </tr>
        ))}
        </tbody>
    </Table>
</Container>

</div>
);
};
export default ListadoEliminados;