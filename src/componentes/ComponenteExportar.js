import React, { useState, useContext } from 'react';
import {Table, Button} from 'react-bootstrap';
import { BiSolidRightArrowCircle } from 'react-icons/bi';
import { GiCancel } from "react-icons/gi";
import Context from "../context";

const ComponenteExportar = () => {
    
    
const context= useContext(Context)
      

const handleExport = () => {
    // Ask for the password
    const password = prompt('Ingrese contraseña para exportar:', '');
    // Check if the password is correct
    if (password !== 'coradir') {
    alert('Contraseña incorrecta.');
    return; // Abort export if password is incorrect
    }
    // Continue with the export process if the password is correct


     // Exclude rows where row.participant is "eliminado" and row.firstPlace is "votoFinal"
    // const filteredRows = rows.filter(row => !(row.participant === eliminado && row.firstPlace === votoFinal));
    const filteredRows = context.rowsExportar.filter(row => !(
      ((row.participant === context.eliminadosExportar.eliminado1 || row.participant === context.eliminadosExportar.eliminado2) && (row.firstPlace === context.votoFinal1Exportar || row.firstPlace === context.votoFinal2Exportar))
      ||
      (context.invitadoExportar !== "" && row.participant.includes(context.invitadoExportar))
      ||
      (context.noVotaExportar.includes(row.participant))
      ));
  
  // Convert the 'rows' array to the desired format
  // const exportedArray = filteredRows.map(row => [
  //   `"${row.participant}"`,
  //   `"${row.firstPlace}"`,
  //   `"${row.secondPlace}"`,
  // ]);
  const exportedArray = filteredRows.map(row => {
    const rowData = [`"${row.participant}"`, `"${row.firstPlace}"`];
    if (!row.checkedF) {
      rowData.push(`"${row.secondPlace}"`);
    }
    return rowData;
  });

  // // Create a Blob with the formatted data
  //   const blob = new Blob([`[\n${exportedArray.map(row => `  [${row.join(', ')}],`).join('\n')}\n]`], { type: 'application/json' });
  
  // Create a Blob with the formatted data
  const exportedArrayString = exportedArray.map((row, index) => {
  if (index === exportedArray.length - 1) {
  return `  [${row.join(', ')}]`; // Exclude comma for the last array
  } else {
  return `  [${row.join(', ')}],`;
  }
  }).join('\n');

  const blob = new Blob([`[\n${exportedArrayString}\n]`], { type: 'application/json' });


  // Get the current date and time for the filename
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];

  // Create a link element to download the JSON file
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  // a.download = 'exported_rows.json';
  a.download = `nominaciones_${formattedDate}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

  return (
    <div>
    {context.statusExportar === "finalizado" && (
    <div onClick={handleExport} className="submenu-arrow">
          Exportar
    </div>
    )}
  
  </div>
  )

};


export default ComponenteExportar;
