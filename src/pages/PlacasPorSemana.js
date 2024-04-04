import React, { useState, useEffect } from 'react';
import '../App.css';
import {Container, Table, FormSelect} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchData } from '../componentes/DataService';
import Titulos from '../componentes/Titulos';
// import { useData } from '../data/votacionesData';
// import { dataPlaca } from '../data/placasData';

const PlacasPorSemana = () => {
const [selectedOption, setSelectedOption] = useState(0);

// const [data] = useData();

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

const options = dataPlaca.map((_, index) => (
  <option key={index} value={index}>
    Semana {index + 1}
  </option>
));

const weekNumber = parseInt(selectedOption) + 1;

const DataTable = ({ week, data }) => {
  return (
    <Table striped bordered hover className="tablaGeneral">
      <thead>
        <tr>
          <th>ROL</th>
          <th>NOMBRE</th>
          <th>RESULTADO</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.role}</td>
            <td>{row.name}</td>
            <td>{row.result}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};


return (
<div className="content">

<Titulos titulo = "placa nominaciones" semana = {weekNumber}/>

<Container className="containerSelectNominAnteriores"> {/*COMBOBOX PARA SELECCIONAR SEMANA*/}
    <FormSelect value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} className="selectNominAnteriores">
      {options}
    </FormSelect>
  </Container>

  

  <Container> {/*TABLA CON RESULTADOS PLACA DE SEMANA SELECCIONADA*/}
    {dataPlaca.map(w => {
    if (w.week === Number(selectedOption)) {
    return <DataTable key={w} data={w.data}/>;
    }
    return null;
    })}
  </Container>

</div>
);
};
export default PlacasPorSemana;