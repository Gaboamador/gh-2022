import React, { useState } from 'react';
import {Table, Button} from 'react-bootstrap';
import { BiSolidRightArrowCircle } from 'react-icons/bi';
import { GiCancel } from "react-icons/gi";

const AnularVotos = ({rows, toggleCancel, eliminados, counts}) => {

  const [sidebarAnularVotosOpen, setSidebarAnularVotosOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarAnularVotosOpen(!sidebarAnularVotosOpen);
  };

  // const filteredRows = rows.filter(row => row.participant !== eliminados.eliminado1 && row.participant !== eliminados.eliminado2);
  // if (Object.keys(counts).length <= 1 && (rows.participant.includes(eliminados.eliminado1) || rows.participant.includes(eliminados.eliminado2))) {
  //   return null;
  // }
  
  // Fórmula para no mostrar el componente (return null) si no hay participantes con votos (más allá de los que están en placa parcial por "voto final")
  if (Object.keys(counts).length === 0) {
    return null;
}
  let eliminadosCount = 0;
  for (let row of rows) {
      if (row.participant === eliminados.eliminado1 || row.participant === eliminados.eliminado2) {
          eliminadosCount++;
      }
  }
  if (eliminadosCount > 0 && Object.keys(counts).length <= eliminadosCount) {
      return null;
  }
  
  return (

    <div className={`navMenuInfo ${sidebarAnularVotosOpen ? 'active' : ''}`}>
      <div className={`openbtnInfo ${sidebarAnularVotosOpen ? 'active' : ''}`} onClick={toggleSidebar}>
        {sidebarAnularVotosOpen ? <BiSolidRightArrowCircle className={`iconInfo ${sidebarAnularVotosOpen ? 'active' : ''}`} /> : <GiCancel className={`iconInfo ${sidebarAnularVotosOpen ? 'active' : ''}`} />}
      </div>
      {sidebarAnularVotosOpen && (
        <div className={`sidebarInfo ${sidebarAnularVotosOpen ? 'active' : ''}`}>


<Table striped bordered hover size="sm" className="centered-table">
        <thead>
          <tr>
            <th>JUGADOR</th>
            <th>1er LUGAR</th>
            <th>2do LUGAR</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <React.Fragment key={index}>
              {row.firstPlace && row.participant !== eliminados.eliminado1 && row.participant !== eliminados.eliminado2 && (
              <tr>
                <td rowSpan="2">{row.participant}</td>
                <td colSpan={row.checkedF ? 2 : 1}>{row.firstPlace}</td>
                {!row.checkedF && (
                <td>{row.secondPlace}</td>
                )}
              </tr>
              )}
              <tr>
              {row.firstPlace && row.participant !== eliminados.eliminado1 && row.participant !== eliminados.eliminado2 && (
              <td colSpan={row.checkedF ? 2 : 1}>
                <Button className={`botonAnular ${row.firstPlaceCanceled ? 'valido' : 'no-valido'}`} onClick={() => toggleCancel(index, 'firstPlace')}>
                    {row.firstPlaceCanceled ? 'Validar' : 'Anular'}
                </Button>
                </td>
              )}
               {row.secondPlace && row.participant !== eliminados.eliminado1 && row.participant !== eliminados.eliminado2 && (
                <td>
                <Button className={`botonAnular ${row.secondPlaceCanceled ? 'valido' : 'no-valido'}`} onClick={() => toggleCancel(index, 'secondPlace')}>
                    {row.secondPlaceCanceled ? 'Validar' : 'Anular'}
                </Button>
                </td>
               )}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>



        </div>
      )}
    </div>
  
  
    );
};

export default AnularVotos;
