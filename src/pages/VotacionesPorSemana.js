import React, { useState, useEffect } from 'react';
import '../App.css';
import { Container, Table, FormSelect} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Titulos from '../componentes/Titulos';

const VotacionesPorSemana = () => {

const [data, setData] = useState(Array.from({ length: 1 }, () => []));

const applyModifications = (data, modifications) => {
  if (data && data.length && modifications) {

    const newData = data.map((week, weekIndex) =>
      week.map((row, rowIndex) => {
        const modifiedRow = [ ...row ];

        if (modifications[`week${weekIndex + 1}`]) {
          const { espontanea, anuladoUno, anuladoDos, fulminante } = modifications[`week${weekIndex + 1}`];

          if (espontanea && espontanea.some(mod => mod[0] === weekIndex && mod[1] === rowIndex)) {
            modifiedRow.espontanea = true;
          }

          if (anuladoUno && anuladoUno.some(mod => mod[0] === weekIndex && mod[1] === rowIndex)) {
            modifiedRow.anulado1 = true;
          }

          if (anuladoDos && anuladoDos.some(mod => mod[0] === weekIndex && mod[1] === rowIndex)) {
            modifiedRow.anulado2 = true;
          }

          if (fulminante && fulminante.some(mod => mod[0] === weekIndex && mod[1] === rowIndex)) {
            modifiedRow.fulminante = true;
          }
        }

        return modifiedRow;
      })
    );

    setData(newData);
  }
};

useEffect(() => {
  const fetchDataAndApplyModifications = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/Gaboamador/gh-data/main/nominaciones.json');
      const jsonData = await response.json();

      if (jsonData && jsonData.data && jsonData.modifications) {
        applyModifications(jsonData.data, jsonData.modifications);
      } else {
        console.error('Invalid data format:', jsonData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchDataAndApplyModifications();
}, []);


const [selectedOption, setSelectedOption] = useState(0);

    const options = data.map((_, index) => (
      <option key={index} value={index}>
        Semana {index + 1}
      </option>
    ));
    

const weekNumber = parseInt(selectedOption) + 1;

return (
<div className="content">

  <Titulos titulo = "detalle de votaciones" semana= {weekNumber}/>

<Container className="containerSelectNominAnteriores"> {/*COMBOBOX PARA SELECCIONAR SEMANA*/}
    <FormSelect value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} className="selectNominAnteriores">
      {options}
    </FormSelect>
  </Container>



  <Container style={{paddingBottom: 5}}> {/*TABLA CON DETALLE DE VOTACIONES DE SEMANA SELECCIONADA*/}
    <Table striped bordered hover className="tablaGeneral">
      <thead>
        <tr >
          <th>Jugador</th>
          <th>Primer Lugar</th>
          <th>Segundo Lugar</th>
        </tr>
      </thead>
      <tbody>
        {data[selectedOption].map((row, index) => (
        <tr
        key={index}
        className={
          row.espontanea && row.anulado ? 'espontanea-anulado-row' :
          row.espontanea && row.anulado1 ? 'espontanea-anulado1-row' :
          row.espontanea && row.anulado2 ? 'espontanea-anulado2-row' :
          row.fulminante && row.anulado ? 'fulminante-anulado-row' :
          row.espontanea ? 'espontanea-row' :
          row.fulminante ? 'fulminante-row' :
          row.anulado ? 'anulado-row' :
          row.anulado1 ? 'anulado1-row' :
          row.anulado2 ? 'anulado2-row' : ''
        }
        >        
          <td>{row[0]}</td>
          {row.length === 2 && (
          <td colSpan={2}>{row[1]}</td>
          )}
          {row.length === 3 && (
          <>
          <td>{row[1]}</td>
          <td>{row[2]}</td>
          </>
          )}
        </tr>
        ))}
      </tbody>
      {data[selectedOption].some(row => row.espontanea || row.fulminante) && (
    <tfoot>
      <tr>
        <td colSpan={3}>
          {data[selectedOption].some(row => row.espontanea) && (
            <p className="zocalo espontanea-row">Espontánea</p>
          )}
          {data[selectedOption].some(row => row.fulminante) && (
            <p className="zocalo fulminante-row">Fulminante</p>
          )}
        </td>
      </tr>
    </tfoot>
  )}
  
    </Table>
  </Container>
      

</div>
);
};
export default VotacionesPorSemana;