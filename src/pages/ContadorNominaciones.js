import React, { useState, useEffect, useContext, useRef } from "react";
import '../App.css';
import {Button, Row, Col, Container, ListGroup, Table, FormCheck, FormSelect, Image} from 'react-bootstrap';
// import { dataPlaca } from "../data/placasData";
// import { participants } from "../data/participantsData";
import { participantsToImage } from "../data/participantsToImage";
import AnularVotos from "../componentes/AnularVotos";
import Context from "../context";
// import { votoFinal, nominado, noVota, inmune, votoValeDoble, dosVotosEnContra } from "../data/modificadores";
import html2canvas from 'html2canvas';



function ContadorNominaciones() {
  
  const [dataPlaca, setData] = useState([]);
  const [participants, setParticipants] = useState([]);
  // const [eliminado, setLastEliminado] = useState("")
  const [eliminados, setEliminados] = useState({ eliminado1: "", eliminado2: "" });
  // Declaración modificadores
  // const [votoFinal, setVotoFinal] = useState("");
  const [votoFinal1, setVotoFinal1] = useState("");
  const [votoFinal2, setVotoFinal2] = useState("");
  const [nominado, setNominado] = useState(null);
  const [noVota, setNoVota] = useState([]);
  const [inmune, setInmune] = useState([]);
  const [votoValeDoble, setVotoValeDoble] = useState([]);
  const [unVotoVale1, setUnVotoVale1] = useState([]);
  const [unVotoVale2, setUnVotoVale2] = useState([]);
  const [dosVotosEnContra, setDosVotosEnContra] = useState("");
  const [invitado, setInvitado] = useState("");
  const context= useContext(Context)
    
  const fetchData = async () => {
  try {
/**/
const timestamp = new Date().getTime(); // Unique timestamp
/**/

// Fetch data from the first URL (ÚLTIMO ELIMINADO)
  // const response = await fetch('https://raw.githubusercontent.com/Gaboamador/gh-data/main/placasNominados.json');
  const response = await fetch(`https://raw.githubusercontent.com/Gaboamador/gh-data/main/placasNominados.json?_=${timestamp}`);
  const jsonData = await response.json();
  setData(jsonData);

// Fetch data from the second URL (PARTICIPANTES)
  // const response2 = await fetch('https://raw.githubusercontent.com/Gaboamador/gh-data/main/participants.json');
  const response2 = await fetch(`https://raw.githubusercontent.com/Gaboamador/gh-data/main/participants.json?_=${timestamp}`);
  const jsonData2 = await response2.json();
  setParticipants(jsonData2.participants);

  // Fetch data from the third URL (MODIFICADORES)
  // const response3 = await fetch('https://raw.githubusercontent.com/Gaboamador/gh-data/main/modificadores.json');
  const response3 = await fetch(`https://raw.githubusercontent.com/Gaboamador/gh-data/main/modificadores.json?_=${timestamp}`);
  const jsonData3 = await response3.json();
  setVotoFinal1(jsonData3.votoFinal1);
  setVotoFinal2(jsonData3.votoFinal2);
  setNominado(jsonData3.nominado);
  setNoVota(jsonData3.noVota);
  setInmune(jsonData3.inmune);
  setVotoValeDoble(jsonData3.votoValeDoble);
  setUnVotoVale1(jsonData3.unVotoVale1);
  setUnVotoVale2(jsonData3.unVotoVale2);
  setDosVotosEnContra(jsonData3.dosVotosEnContra);
  setInvitado(jsonData3.invitado);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

useEffect(() => {
  fetchData();
}, []);

/* LÓGICA PARA LLAMADO API CON COMPONENTE DataService.js. NO MUESTRA VOTO FINAL COMO DEBERÍA*/
// useEffect(() => {
//   const fetchDataFromAPI = async () => {
//     try {
//       const { placaNominados, participants, modificadores } = await fetchData();
//       setData(placaNominados);
//       setParticipants(participants.participants);
//       setVotoFinal1(modificadores.votoFinal1);
//       setVotoFinal2(modificadores.votoFinal2);
//       setNominado(modificadores.nominado);
//       setNoVota(modificadores.noVota);
//       setInmune(modificadores.inmune);
//       setVotoValeDoble(modificadores.votoValeDoble);
//       setUnVotoVale1(modificadores.unVotoVale1);
//       setUnVotoVale2(modificadores.unVotoVale2);
//       setDosVotosEnContra(modificadores.dosVotosEnContra);
//       setInvitado(modificadores.invitado);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   fetchDataFromAPI();
// }, []);

/*FIN LLAMADAS API*/


useEffect(() => {
  let eliminado1 = null;
  let eliminado2 = null;
  let eliminadoWeek = -1;

  // Iterate through each week's data
  dataPlaca.forEach(weekData => {
    const eliminadoIndices = weekData.data.reduce((acc, entry, index) => {
      if (entry.result.includes('Eliminado')) {
        acc.push({ index, name: entry.name });
      }
      return acc;
    }, []);

    // If there are two 'Eliminado' entries in the last week, assign eliminado1 and eliminado2
    if (eliminadoIndices.length === 2 && weekData.week >= eliminadoWeek) {
      eliminado1 = eliminadoIndices[0].name;
      eliminado2 = eliminadoIndices[1].name;
    } 
    // If there's only one 'Eliminado', update eliminado1 and keep eliminado2 as null
    else if (eliminadoIndices.length === 1 && weekData.week >= eliminadoWeek) {
      eliminado1 = eliminadoIndices[0].name;
      eliminado2 = null;
    }
  });

  // Set the state with the last 'Eliminado' names
  setEliminados({ eliminado1, eliminado2 });
}, [dataPlaca]);

// const initialRows = [
//   ...(votoFinal1 !== ""
//   ? [{ participant: eliminados.eliminado1, firstPlace: votoFinal1, secondPlace: "" }]
//   : []),

//   ...(votoFinal2 !== ""
//   ? [{ participant: eliminados.eliminado2, firstPlace: votoFinal2, secondPlace: "" }]
//   : []),
  
//   ...(dosVotosEnContra !== ""
//   ? [{ participant: "Teléfono", firstPlace: dosVotosEnContra, secondPlace: "" }]
//   : []),

//   ...(invitado !== ""
//   ? [{ participant: '\u2295\u00A0' + invitado, firstPlace: "", secondPlace: "" }]
//   : []),

//   ...(invitado !== ""
//   ? [{ participant: '\u2296\u00A0' + invitado, firstPlace: "", secondPlace: "" }]
//   : []),

//   ...participants.map((participant) => ({ participant, firstPlace: '', secondPlace: '' })),
// ];
const initialRows = [
  ...(votoFinal1 !== "" ? [{ participant: eliminados.eliminado1, firstPlace: votoFinal1, secondPlace: "", firstPlaceCanceled: false, secondPlaceCanceled: false }] : []),
  ...(votoFinal2 !== "" ? [{ participant: eliminados.eliminado2, firstPlace: votoFinal2, secondPlace: "", firstPlaceCanceled: false, secondPlaceCanceled: false }] : []),
  ...(dosVotosEnContra !== "" ? [{ participant: "Teléfono", firstPlace: dosVotosEnContra, secondPlace: "", firstPlaceCanceled: false, secondPlaceCanceled: false }] : []),
  ...(invitado !== "" ? [{ participant: '\u2295\u00A0' + invitado, firstPlace: "", secondPlace: "", firstPlaceCanceled: false, secondPlaceCanceled: false }] : []),
  ...(invitado !== "" ? [{ participant: '\u2296\u00A0' + invitado, firstPlace: "", secondPlace: "", firstPlaceCanceled: false, secondPlaceCanceled: false }] : []),
  ...participants.map((participant) => ({ participant, firstPlace: '', secondPlace: '', firstPlaceCanceled: false, secondPlaceCanceled: false })),

  // COMIENZO ...participants.map ADAPTADO PARA ESPONTÁNEA DE JULIANA AL LÍDER. DESPUÉS VOLVER A USAR LA LÍNEA DE ARRIBA PARA "...participants.map". BORRAR
  // ...participants.map((participant) => {
  //   if (participant === 'Juliana') {
  //     return {
  //       participant,
  //       firstPlace: "Florencia",
  //       secondPlace: "Bautista",
  //       firstPlaceCanceled: false,
  //       secondPlaceCanceled: true,
  //       checked: true
  //     };
  //   } else if (participant === 'Catalina') {
  //     return {
  //       participant,
  //       firstPlace: "Paloma",
  //       secondPlace: "",
  //       firstPlaceCanceled: false,
  //       secondPlaceCanceled: false,
  //       checkedF: true
  //     };
  //   } else {
  //     return {
  //       participant,
  //       firstPlace: "",
  //       secondPlace: "",
  //       firstPlaceCanceled: false,
  //       secondPlaceCanceled: false
  //     };
  //   }
  // })
// FIN ...participants.map ADAPTADO PARA ESPONTÁNEA DE JULIANA AL LÍDER
];


useEffect(() => {
  const storedRows = localStorage.getItem('rows');
  
  if (storedRows !== null) {
    setRows(JSON.parse(storedRows));
  } else {
    setRows(initialRows);
  }
}, [participants, votoFinal1, votoFinal2, nominado, noVota, inmune, votoValeDoble, dosVotosEnContra, unVotoVale1, unVotoVale2, invitado]);

// useEffect(() => {
//   context.setRowsExportar(rows)
//   context.setEliminadosExportar(eliminados)
//   context.setInvitadoExportar(invitado)
//   context.setVotoFinal1Exportar(votoFinal1)
//   context.setVotoFinal2Exportar(votoFinal2)
//   context.setNoVotaExportar(noVota)
//   context.setStatusExportar(status)
// }, [participants, votoFinal1, votoFinal2, nominado, noVota, inmune, votoValeDoble, dosVotosEnContra, invitado]);

// useEffect(() => {
//   const storedRows = localStorage.getItem('rows');
//   if (!storedRows) {
//     localStorage.setItem('rows', JSON.stringify(initialRows));
//   } else {
//     setRows(JSON.parse(storedRows));
//   }
// }, []);

const [rows, setRows] = useState(() => {
  const storedRows = localStorage.getItem('rows');
  return storedRows ? JSON.parse(storedRows) : initialRows;
});

// ESTA ES LA INITIAL ROWS QUE FUNCIONA BIEN
// const initialRows = [
//   ...(votoFinal !== ""
//   ? [{ participant: eliminado, firstPlace: votoFinal, secondPlace: "" }]
//   : []),
  
//   ...(dosVotosEnContra !== ""
//   ? [{ participant: "Teléfono", firstPlace: dosVotosEnContra, secondPlace: "" }]
//   : []),
//   ...participants.map((participant) => ({ participant, firstPlace: '', secondPlace: '' })),
// ];


  // const [rows, setRows] = useState(localStorage.getItem('rows') ? JSON.parse(localStorage.getItem('rows')) : initialRows);
  const [counts, setCounts] = useState(localStorage.getItem('counts') ? JSON.parse(localStorage.getItem('counts')) : {});
  const [selectedIndex, setSelectedIndex] = useState(() => {
        const selectedIndexFromLocalStorage = localStorage.getItem('selectedIndex');
        return selectedIndexFromLocalStorage ? JSON.parse(selectedIndexFromLocalStorage) : -1;
        });
  const [selectedIndexF, setSelectedIndexF] = useState(() => {
        const selectedIndexFromLocalStorage = localStorage.getItem('selectedIndexF');
        return selectedIndexFromLocalStorage ? JSON.parse(selectedIndexFromLocalStorage) : -1;
        });        
  // const [fulminado, setFulminado] = useState(localStorage.getItem('fulminado') || 'Ingresar nombre de fulminado');
  const [fulminado, setFulminado] = useState(localStorage.getItem('fulminado') || '');
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedF, setIsCheckedF] = useState(false);

  // const sortedEntries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  
  // nuevo sortedEntries para excluir participantes con 0 votos:
  const sortedEntries = Object.entries(counts)
  .filter(([participant, count]) => count !== 0)
  .sort((a, b) => b[1] - a[1]);

  const fourthCount = sortedEntries.length > 4 ? sortedEntries[3][1] : 0;
  const thirdCount = sortedEntries.length > 3 ? sortedEntries[2][1] : 0;

  
    useEffect(() => {
    const updatedCounts = {};

    // rows.forEach(({ firstPlace, secondPlace, checked, checkedF, participant }) => {
      rows.forEach(({ firstPlace, secondPlace, checked, checkedF, participant, firstPlaceCanceled, secondPlaceCanceled }) => {

      if (checkedF) {
        if (firstPlace) {
          setFulminado(fulminado)
          const updatedRows = [...rows];
          for (let i = 0; i < updatedRows.length; i++) {
            if (!updatedRows[i].checkedF) {
            updatedRows[i].firstPlace = updatedRows[i].firstPlace === firstPlace ? "" : updatedRows[i].firstPlace;
            updatedRows[i].secondPlace = updatedRows[i].secondPlace === firstPlace ? "" : updatedRows[i].secondPlace;
            }
          }
          // setRows(updatedRows); // línea deshabilitada para evitar re-render infinito. Evaluar si afecta al funcionamiento normal
        }}

      if (!checkedF) {
        
        const isVotoValeDoble = votoValeDoble.includes(participant);
        
        // if (firstPlace) {
          if (firstPlace && !firstPlaceCanceled) {
          if (participant === '\u2295\u00A0' + invitado) {
            updatedCounts[firstPlace] = (updatedCounts[firstPlace] || 0) -2;
          } else {
          updatedCounts[firstPlace] = (updatedCounts[firstPlace] || 0) + (checked ? (isVotoValeDoble ? 5 : 3) : (isVotoValeDoble ? 4 : 2));
          }
        }        
        
        // if (secondPlace) {
          if (secondPlace && !secondPlaceCanceled) {
          if (participant === '\u2295\u00A0' + invitado) {
            updatedCounts[secondPlace] = (updatedCounts[secondPlace] || 0) -1;
          } else {
          updatedCounts[secondPlace] = (updatedCounts[secondPlace] || 0) + (checked ? (isVotoValeDoble ? 3 : 2) : (isVotoValeDoble ? 2 : 1));
          }
          }
      }
    });
    setCounts(updatedCounts);
    localStorage.setItem('fulminado', fulminado);
    localStorage.setItem('selectedIndex', JSON.stringify(selectedIndex));
    localStorage.setItem('selectedIndexF', JSON.stringify(selectedIndexF));
  }, [rows, fulminado, selectedIndex, selectedIndexF, votoValeDoble, invitado]);

  // useEffect(() => {
  //   const updatedCounts = {};

  //   rows.forEach(({ firstPlace, secondPlace, checked, checkedF, participant, firstPlaceCanceled, secondPlaceCanceled }) => {
  //     if (!checkedF) {
  //       const isVotoValeDoble = votoValeDoble.includes(participant);

  //       if (firstPlace && !firstPlaceCanceled) {
  //         updatedCounts[firstPlace] = (updatedCounts[firstPlace] || 0) + (checked ? (isVotoValeDoble ? 5 : 3) : (isVotoValeDoble ? 4 : 2));
  //       }

  //       if (secondPlace && !secondPlaceCanceled) {
  //         updatedCounts[secondPlace] = (updatedCounts[secondPlace] || 0) + (checked ? (isVotoValeDoble ? 3 : 2) : (isVotoValeDoble ? 2 : 1));
  //       }
  //     }
  //   });

  //   setCounts(updatedCounts);
  // }, [rows, votoValeDoble]);


  const handleFirstPlaceChange = (index, value) => {

/*DE ACA PARA ABAJO VAN LAS PRUEBAS*/
const updatedRows = [...rows];
updatedRows[index].firstPlace = value;
setRows(updatedRows);

let fulminatedIndex = -1;
for (let i = 0; i < updatedRows.length; i++) {
  if (updatedRows[i].checkedF) {
    fulminatedIndex = i;
    break;
  }
}

if (fulminatedIndex !== -1) {
  const fulminatedName = updatedRows[fulminatedIndex].firstPlace;
  for (let i = 0; i < updatedRows.length; i++) {
    if (i !== fulminatedIndex && updatedRows[i].firstPlace === fulminatedName) {
      updatedRows[i].firstPlace = "";
    }
  }
}

let fulminatedIndex2 = -1;
for (let i = 0; i < updatedRows.length; i++) {
  if (updatedRows[i].checkedF) {
    fulminatedIndex2 = i;
    break;
  }
}

if (fulminatedIndex2 !== -1) {
  const fulminatedName = updatedRows[fulminatedIndex2].firstPlace;
  for (let i = 0; i < updatedRows.length; i++) {
    if (i !== fulminatedIndex2 && updatedRows[i].secondPlace === fulminatedName) {
      updatedRows[i].secondPlace = "";
    }
  }
}
/*DE ACA PARA ARRIBA VAN LAS PRUEBAS*/

/* DE ACA PARA ABAJO ES LA SEGUNDA PARTE DEL CODIGO ORIGINAL */
    let updatedFulminado = '';
    for (let i = 0; i < updatedRows.length; i++) {
      if (updatedRows[i].checkedF) {
        updatedFulminado = updatedRows[i].firstPlace;
        break;
      }
    }
    setFulminado(updatedFulminado);
    
    localStorage.setItem('rows', JSON.stringify(rows));
    localStorage.setItem('counts', JSON.stringify(counts));
    localStorage.setItem('fulminado', fulminado);
  };
  /* DE ACA PARA ARRIBA ES LA SEGUNDA PARTE DEL CODIGO ORIGINAL */
  
  const handleSecondPlaceChange = (index, value) => {
  
/*DE ACA PARA ABAJO VAN LAS PRUEBAS*/
    const updatedRows = [...rows];
    updatedRows[index].secondPlace = value;
    setRows(updatedRows);
    
    let fulminatedIndex = -1;
for (let i = 0; i < updatedRows.length; i++) {
  if (updatedRows[i].checkedF) {
    fulminatedIndex = i;
    break;
  }
}

if (fulminatedIndex !== -1) {
  const fulminatedName = updatedRows[fulminatedIndex].firstPlace;
  for (let i = 0; i < updatedRows.length; i++) {
    if (i !== fulminatedIndex && updatedRows[i].firstPlace === fulminatedName) {
      updatedRows[i].firstPlace = "";
    }
  }
}
    
    let fulminatedIndex2 = -1;
    for (let i = 0; i < updatedRows.length; i++) {
      if (updatedRows[i].checkedF) {
        fulminatedIndex2 = i;
        break;
      }
    }
    
    if (fulminatedIndex2 !== -1) {
      const fulminatedName = updatedRows[fulminatedIndex2].firstPlace;
      for (let i = 0; i < updatedRows.length; i++) {
        if (i !== fulminatedIndex2 && updatedRows[i].secondPlace === fulminatedName) {
          updatedRows[i].secondPlace = "";
        }
      }
    }
/*DE ACA PARA ARRIBA VAN LAS PRUEBAS*/

    let fulminadoValue = '';
    for (let i = 0; i < updatedRows.length; i++) {
      if (updatedRows[i].checkedF) {
        fulminadoValue = updatedRows[i].firstPlace;
        break;
      }
    }  
    setFulminado(fulminadoValue);
  
    localStorage.setItem('rows', JSON.stringify(rows));
    localStorage.setItem('counts', JSON.stringify(counts));
    localStorage.setItem('fulminado', fulminado);
  };

  const handleCheckbox = (participant, index) => {
    const updatedRows = [...rows];
    updatedRows[index].checked = !updatedRows[index].checked;
    setRows(updatedRows);
    
    if (selectedIndex === -1) {
      setSelectedIndex(index);
    } else if (selectedIndex === index) {
      setSelectedIndex(-1);
    }
    localStorage.setItem('rows', JSON.stringify(rows));
    localStorage.setItem('counts', JSON.stringify(counts));
    localStorage.setItem('fulminado', fulminado);
  };

  const handleCheckboxF = (participant, index) => {
    const updatedRows = [...rows];
    updatedRows[index].checkedF = !updatedRows[index].checkedF;
    setRows(updatedRows);
    if (updatedRows[index].checkedF) {
      setFulminado(updatedRows[index].firstPlace)
    } else {
      setFulminado('')
    }
    
    if (selectedIndexF === -1) {
      setSelectedIndexF(index);
    } else if (selectedIndexF === index) {
      setSelectedIndexF(-1);
    }
    localStorage.setItem('rows', JSON.stringify(rows));
    localStorage.setItem('counts', JSON.stringify(counts));
    localStorage.setItem('fulminado', fulminado);
  };
  
  const [isConfirming, setIsConfirming] = useState(false);
  
  useEffect(() => {
    if (isConfirming) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
    return () => {
      document.body.classList.remove('sidebar-open');
    };
  }, [isConfirming]);

  const handleReset = () => {
    setRows(initialRows);
    setCounts({});
    setFulminado('');
    setSelectedIndex(-1);
    setSelectedIndexF(-1);
    localStorage.removeItem("rows");
    localStorage.removeItem("counts");
    // localStorage.removeItem("fulminado");
    localStorage.removeItem('selectedIndex');
    localStorage.removeItem('selectedIndexF');
    window.location.reload();
  }

  function handleCheckboxClick() {
    setIsChecked(!isChecked);
  }

  function handleCheckboxClickF() {
    setIsCheckedF(!isCheckedF);
  }
  

  const estiloPlacaDeNominados = {
    marginTop: "10px",
    marginBottom: "10px"
  }

  const estiloBotonReiniciar = {
    marginTop: "10px",
    marginBottom: "20px",
    float: "right"
    }

    const estiloBotonExportar = {
      marginTop: "10px",
      marginBottom: "20px",
      float: "left"
      }


      // TRANSFORMADO EN COMPONENTE SEPARADO
    //   const handleExport = () => {
      
    //     // Ask for the password
    //     const password = prompt('Ingrese contraseña para exportar:', '');
    //     // Check if the password is correct
    //     if (password !== 'coradir') {
    //     alert('Contraseña incorrecta.');
    //     return; // Abort export if password is incorrect
    //     }
    //     // Continue with the export process if the password is correct
  
  
    //      // Exclude rows where row.participant is "eliminado" and row.firstPlace is "votoFinal"
    //     // const filteredRows = rows.filter(row => !(row.participant === eliminado && row.firstPlace === votoFinal));
    //     const filteredRows = rows.filter(row => !(
    //       ((row.participant === eliminados.eliminado1 || row.participant === eliminados.eliminado2) && (row.firstPlace === votoFinal1 || row.firstPlace === votoFinal2))
    //       ||
    //       (invitado !== "" && row.participant.includes(invitado))
    //       ||
    //       (noVota.includes(row.participant))
    //       ));
      
    //   // Convert the 'rows' array to the desired format
    //   const exportedArray = filteredRows.map(row => [
    //     `"${row.participant}"`,
    //     `"${row.firstPlace}"`,
    //     `"${row.secondPlace}"`,
    //   ]);
    
    //   // // Create a Blob with the formatted data
    //   //   const blob = new Blob([`[\n${exportedArray.map(row => `  [${row.join(', ')}],`).join('\n')}\n]`], { type: 'application/json' });
      
    //   // Create a Blob with the formatted data
    //   const exportedArrayString = exportedArray.map((row, index) => {
    //   if (index === exportedArray.length - 1) {
    //   return `  [${row.join(', ')}]`; // Exclude comma for the last array
    //   } else {
    //   return `  [${row.join(', ')}],`;
    //   }
    //   }).join('\n');

    //   const blob = new Blob([`[\n${exportedArrayString}\n]`], { type: 'application/json' });

    
    //   // Get the current date and time for the filename
    //   const currentDate = new Date();
    //   const formattedDate = currentDate.toISOString().split('T')[0];

    //   // Create a link element to download the JSON file
    //   const a = document.createElement('a');
    //   a.href = URL.createObjectURL(blob);
    //   // a.download = 'exported_rows.json';
    //   a.download = `nominaciones_${formattedDate}.json`;
    //   document.body.appendChild(a);
    //   a.click();
    //   document.body.removeChild(a);
    // };

    useEffect(() => {
  context.setRowsExportar(rows)
  context.setEliminadosExportar(eliminados)
  context.setInvitadoExportar(invitado)
  context.setVotoFinal1Exportar(votoFinal1)
  context.setVotoFinal2Exportar(votoFinal2)
  context.setNoVotaExportar(noVota)
  context.setUnVotoVale1Exportar(unVotoVale1)
  context.setUnVotoVale2Exportar(unVotoVale2)
}, [counts]);
    
const [prevFulminado, setPrevFulminado] = useState('');
// Function to toggle cancellation of a vote (firstPlace, secondPlace, or both)
const toggleCancel = (index, place) => {
  setRows(prevRows => {
    const updatedRows = prevRows.map((row, rowIndex) => {
      if (rowIndex === index) {
        if (place === 'firstPlace') {
          return {
            ...row,
            firstPlaceCanceled: !row.firstPlaceCanceled
          };
        } else if (place === 'secondPlace') {
          return {
            ...row,
            secondPlaceCanceled: !row.secondPlaceCanceled
          };
        } else if (place === 'both') {
          return {
            ...row,
            firstPlaceCanceled: !row.firstPlaceCanceled,
            secondPlaceCanceled: !row.secondPlaceCanceled
          };
        }
      }
      return row;
    });
    
    // Check if row.checkedF is true, and if so, set 'fulminado' to an empty string
    if (place === 'firstPlace' && updatedRows[index].checkedF && fulminado !== "") {
      setPrevFulminado(fulminado);
      
      setFulminado('');
    } else if (place === 'firstPlace' && updatedRows[index].checkedF && fulminado === "") {
      setFulminado(prevFulminado);
      
    }

    localStorage.setItem('rows', JSON.stringify(updatedRows)); // Update local storage
    return updatedRows;
  });
};

// Logica para actualizar el título y formatos según el título
const [status, setStatus] = useState("");
useEffect(() => {
  var status;

  if (Object.keys(counts).length === 0) {
    status = "sin iniciar";
  } else {
    const isTerminated = rows.filter(row =>
      !row.fulminated &&
      row.participant !== eliminados.eliminado1 &&
      row.participant !== eliminados.eliminado2 &&
      row.participant !== "Teléfono" &&
      (noVota === null || !noVota.includes(row.participant))
    ).every(row =>
      (row.firstPlace !== '' && row.secondPlace !== '') ||
      (row.firstPlace !== '' && row.checkedF) ||
      (row.firstPlace !== '' && unVotoVale2.includes(row.participant)) ||
      (row.secondPlace !== '' && unVotoVale1.includes(row.participant))
    );

    status = isTerminated ? "finalizado" : "en desarrollo";
  }

  setStatus(status);
  context.setStatusExportar(status)
}, [counts]);
let title;
  if (status === "sin iniciar") {
    title = <h6 className="placaNominados noIniciado" style={estiloPlacaDeNominados}><span>GALA DE NOMINACIÓN</span></h6>;
  } else if (status === "finalizado") {
    title = <h6 className="placaNominadosNUEVO" style={estiloPlacaDeNominados}>PLACA FINAL</h6>;
  } else if (status === "en desarrollo") {
    title = <h6 className="placaNominados placaParcial" style={estiloPlacaDeNominados}><span>PLACA PARCIAL</span></h6>;
  }


  //Linea Divisoria hacia la derecha
  let lineaDivisoriaToRight;
  if (status === "sin iniciar" || status === "en desarrollo") {
    lineaDivisoriaToRight = (
      <div className="neon-line-divisoria-toRight">
        <span></span>
      </div>
    );
  } else if (status === "finalizado") {
    lineaDivisoriaToRight = (
      <div className="neon-line-divisoria-fija">
        <span></span>
      </div>
    );
  }

  //Linea Divisoria hacia la izquierda
  let lineaDivisoriaToLeft;
  if (status === "sin iniciar" || status === "en desarrollo") {
    lineaDivisoriaToLeft = (
      <div className="neon-line-divisoria-toLeft">
        <span></span>
      </div>
    );
  } else if (status === "finalizado") {
    lineaDivisoriaToLeft = (
      <div className="neon-line-divisoria-fija">
        <span></span>
      </div>
    );
  }
  
  const divRefNominaciones = useRef(null);
  const divRefPlaca = useRef(null);

const mensajeTablaNominacionesOk = 'Tabla de nominaciones copiada en el portapapeles.'
const mensajeTablaNominacionesFail = 'La tabla de nominaciones no pudo ser copiada en el portapapeles.'
const mensajePlacaOk = 'Placa de nominados copiada en el portapapeles.'
const mensajePlacaFail = 'La placa de nominados no pudo ser copiada en el portapapeles.'

  const takeScreenshot = (divRef, mensajeOk, mensajeFail) => {

  const yValue = divRef === divRefPlaca ? -20 : 0;

    if (divRef.current) {
      html2canvas(divRef.current, {
        allowTaint: true,
        useCORS: true,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight,
        scrollX: window.scrollX,
        y: yValue,
        backgroundColor: '#0a335a',
      }).then((canvas) => {
        canvas.toBlob((blob) => {
          if (blob) {
            navigator.clipboard.write([
              new ClipboardItem({
                'image/png': blob,
              }),
            ]).then(() => {
              alert(mensajeOk);
            }).catch((error) => {
              alert(mensajeFail);
              console.error('Could not copy image to clipboard:', error);
            });
          }
        }, 'image/png');
      });
    }
  };
  
  

  
return (

<div className="content">

<div ref={divRefPlaca}>
  
  <Container className="containerPlaca"> {/* CONTAINER CON LA PLACA DE NOMINADOS Y EL ZOCALO DE VOTACION PARCIAL*/}

  {/* CONTAINER DE ZOCALO VOTACION PARCIAL/FINAL */}
  <Container>{title}</Container>

      <Container className="containerPlaca containerPlacaNominados" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}> {/* CONTAINER DE IMAGENES, SIN ZOCALO */}
      
  {/* DIV CON LAS FOTOS DE LOS SANCIONADOS */}
      {nominado && nominado.map((participant) => {
      return (
        <div key={participant} style={{ display: 'inline-flex', alignItems: 'flex-end', marginBottom: 35 }}>
          {/*TEXTO NOMINADO*/}
          {nominado !== null ? (
          <div className="containerNumerosPlaca nominado"></div>
          ) : null}
          {/*IMAGEN NOMINADO*/}
          {nominado !== null ? (
          <div className="imagenPlaca">
          <Image className="fotoJugador" src={participantsToImage[participant]}/>
            <div className="zocaloImagen">{participant.toUpperCase()}</div>
          </div>
          ) : null}
        </div>
        );
      })}

  {/* DIV CON LA FOTO DEL FULMINADO */}
        {fulminado === '' ? null : (
        <div style={{ display: 'inline-flex', alignItems: 'flex-end', marginBottom: 35 }}>
        {/*TEXTO F FULMINADO*/}
        <div className="containerNumerosPlaca nominado">
          {/* <div className="numerosPlaca">
            X
          </div> */}
        </div>
        {/*IMAGEN FULMINADO*/}
        <div className="imagenPlaca">
          <Image className="fotoJugador" src={participantsToImage[fulminado]}/>
            <div className="zocaloImagen">{fulminado.toUpperCase()}</div>
          </div>
      </div>
    )}

  {/* DIV CON LAS FOTOS DE LOS NOMINADOS DENTRO DE PLACA */}
    {sortedEntries.map(([participant, count], index) => {          
      return (
        <div key={participant} style={{ display: 'inline-flex', alignItems: 'flex-end', marginBottom: 35 }}>
          {/*NUMEROS PLACA ORDENADA*/}
          {index < 3 || count >= fourthCount ? (        
          <div className="containerNumerosPlaca">
            <div className="numerosPlaca">
              {count}
            </div>
          </div>
          ) : null}
          {/*IMAGEN PLACA ORDENADA*/}
          {index < 3 || count >= fourthCount ? (
          <div className="imagenPlaca">
            {/* <Image src={participantsToImage[participant]} width="99px" height="105px"/> */}
            <Image className="fotoJugador" src={participantsToImage[participant]}/>
            <div className="zocaloImagen">{participant.toUpperCase()}</div>
          </div>
          ) : null}
        </div>
      );
    })}
      </Container>    



  </Container>

  {/* DIV CON LAS FOTOS DE LOS NOMINADOS FUERA DE PLACA */}
    {sortedEntries.some(([participant, count], index) => index >= 3 && count < fourthCount) ? (
    <Container className="containerPlaca" style={{ marginTop: -5 }}> {/* CONTAINER CON FUERA DE PLACA Y EL ZOCALO CON FUERA DE PLACA*/}

  {/*CONTAINER CON EL TÍTULO FUERA DE PLACA*/}
  <Container>
        {/* <h6 className="placaNominados placaParcial" style={estiloPlacaDeNominados}> */}      
        <h6 className={`${status === 'finalizado' ? 'placaNominadosNUEVO placaParcial' : 'placaNominados placaParcial'}`} style={estiloPlacaDeNominados}>
        {sortedEntries.some(([participant, count], index) => {
            return (index >= 3 && count < fourthCount)
          }) ? <span>FUERA DE PLACA</span> : null}
        </h6>
        </Container>

        <Container className="containerPlaca" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}> {/* CONTAINER CON LOS FUERA DE PLACA SIN EL ZOCALO*/}
        {sortedEntries.map(([participant, count], index) => {          
          return (
            <div key={participant} style={{ display: 'inline-flex', alignItems: 'flex-end', marginBottom: 35 }}>
              {/*NUMEROS FUERA DE PLACA ORDENADA*/}
              {index < 3 || count >= fourthCount ? null : (        
              <div className="containerNumerosPlaca">
                <div className="numerosPlaca">
                {count}
                </div>
              </div>
              )}
              {/*IMAGEN FUERA DE PLACA ORDENADA*/}
              {index < 3 || count >= fourthCount ? null : (
              <div className="imagenPlaca">
                <Image className="fotoJugador" src={participantsToImage[participant]}/>
                <div className="zocaloImagen">{participant.toUpperCase()}</div>
              </div>
              )}
            </div>
          );
        })}
        </Container>


    </Container>
    ) : null}


  {(status !== "sin iniciar" || fulminado !== "" || nominado !== null) &&
  <Container>
  <div className="neon-line-divisoria-fija">
    <span></span>
  </div>
  </Container>
  }

</div>

<Container> {/* CONTAINER CON LAS VOTACIONES */}

<AnularVotos rows={rows} toggleCancel={toggleCancel} eliminados={eliminados} counts={counts}/>
      
      <Table className="tablaNominaciones" ref={divRefNominaciones}>
         <thead>
         <tr>
            <th>E</th>
            <th>F</th>
            <th>JUGADOR</th>
            <th>1er LUGAR</th>
            <th>2do LUGAR</th>
          </tr> 
          </thead>

<tbody>
        {rows.map((row, index) => (
// FORMATO DE COLOR PARA CADA UNA DE LAS FILAS COMPLETAS
          <tr
          key={index}
          className={`
            ${row.checked ? 'espontaneaRow' : ''}
            ${row.checkedF ? 'fulminanteRow' : ''}
            ${row.participant === eliminados.eliminado1 || row.participant === eliminados.eliminado2 ? 'eliminadoRow' : ''}
            ${row.participant === "Teléfono" ? 'telefonoRow' : ''}
          `}>

{/* COLUMNA 1, CON EL CHECKBOX PARA LA ESPONTÁNEA */}
            <td >
              <FormCheck
              type="checkbox"
              checked={row.checked}
              onChange={() => handleCheckbox(row.participant, index)}
              onClick={handleCheckboxClick}
              disabled={index !== selectedIndex && selectedIndex !== -1}
              // disabled={true} //BORRAR. Volver a la línea de arriba con la lógica original
              className={`
              ${row.checkedF ? 'votoFinalDisabler' : ''}
              ${row.participant === eliminados.eliminado1 || row.participant === eliminados.eliminado2 || row.participant === "Teléfono" || (noVota !== null && noVota.includes(row.participant)) || (invitado !== "" && row.participant.includes(invitado)) ? 'votoFinalDisabler' : ''}`}
              >
              </FormCheck>
            </td>

{/* COLUMNA 2, CON EL CHECKBOX PARA LA FULMINANTE */}
            <td >
              <FormCheck
              type="checkbox"
              checked={row.checkedF}
              onChange={() => handleCheckboxF(row.participant, index)}
              onClick={handleCheckboxClickF}
              disabled={index !== selectedIndexF && selectedIndexF !== -1}
              // disabled={true} //BORRAR. Volver a la línea de arriba con la lógica original
              className={`
              ${row.checked ? 'votoFinalDisabler' : ''}
              ${row.participant === eliminados.eliminado1 || row.participant === eliminados.eliminado2 || row.participant === "Teléfono" || (noVota !== null && noVota.includes(row.participant)) || (invitado !== "" && row.participant.includes(invitado)) ? 'votoFinalDisabler' : ''}`}
              >
              </FormCheck>
            </td>

{/* COLUMNA 3, CON LA LISTA DE NOMBRES DE PARTICIPANTES */}
            <td>
              <ListGroup
              className={`columnaJugadoresNegrita
              ${row.checkedF ? 'espfulmFont' : ''}
              ${row.checked ? 'espfulmFont' : ''}
              ${row.participant === eliminados.eliminado1 || row.participant === eliminados.eliminado2 || row.participant === "Teléfono" ? 'votoFinalDisabler' : ''}
              ${votoValeDoble.includes(row.participant) ? 'votoValeDoble' : ''} `}
              style={{marginTop: '2.5px', marginBottom: '2.5px'}}
              >
              {row.participant}
              {votoValeDoble.includes(row.participant) && " *"}
              </ListGroup>
              {row.participant === eliminados.eliminado1 && (
              <div className="columnaJugadoresNegrita espfulmFont" style={{marginTop: '2.5px', marginBottom: '2.5px'}}>{eliminados.eliminado1}</div>
              )}
              {row.participant === eliminados.eliminado2 && (
              <div className="columnaJugadoresNegrita espfulmFont" style={{marginTop: '2.5px', marginBottom: '2.5px'}}>{eliminados.eliminado2}</div>
              )}
              {row.participant === "Teléfono" && (
              <div className="columnaJugadoresNegrita telefono" style={{marginTop: '2.5px', marginBottom: '2.5px'}}>Teléfono</div>
              )}
            </td>

{/* COLUMNA 4, CON EL FORM SELECT PARA EL VOTO DE PRIMER LUGAR */}
            <td>
              <FormSelect
                value={row.firstPlace}
                className={`comboBox
                ${row.checkedF ? 'fulminanteColor' : ''}
                ${row.checked ? 'espontanea' : ''}
                ${row.firstPlaceCanceled ? 'votoFinalDisabler' : ''}
                ${row.participant === eliminados.eliminado1 ||
                  row.participant === eliminados.eliminado2 ||
                  row.participant === "Teléfono" ||
                  (noVota!== null && noVota.includes(row.participant)) ||
                  (unVotoVale1!== null && unVotoVale1.includes(row.participant))
                  ? 'votoFinalDisabler' : ''}
                ${votoValeDoble.includes(row.participant) ? 'columnaJugadoresNegrita votoValeDoble' : ''}
                `}
                style={{
                marginTop: '2.5px',
                marginBottom: '2.5px',
                }}
                onChange={e => handleFirstPlaceChange(index, e.target.value)}
                disabled={row.participant === eliminados.eliminado1 || row.participant === eliminados.eliminado2}
                // disabled={row.participant === 'Catalina' || row.participant === 'Juliana'} // BORRAR. Volver a la línea de arriba con la lógica original
                >
                <option value="">-</option>
                {participants
                // .filter(participant => !inmune.includes(participant))
                .filter(participant =>
                  participant !== row.participant &&
                  !inmune.includes(participant) &&
                  !row.secondPlace.includes(participant) &&
                  (!fulminado.includes(participant) || row.checkedF) &&
                  // (nominado !== null && !nominado.includes(participant))
                  (nominado !== null ? !nominado.includes(participant) : true)
                  )
                .map(participant => (
                <option key={participant} value={participant}>
                {participant}
                </option>
                ))}
              </FormSelect>
              {row.participant === eliminados.eliminado1 && (
              <div className="columnaJugadoresNegrita espfulmFont" style={{backgroundColor: 'transparent'}}>{votoFinal1}</div>
              )}
              {row.participant === eliminados.eliminado2 && (
              <div className="columnaJugadoresNegrita espfulmFont" style={{backgroundColor: 'transparent'}}>{votoFinal2}</div>
              )}
              {row.participant === "Teléfono" && (
              <div className="columnaJugadoresNegrita espfulmFont" style={{backgroundColor: 'transparent'}}>{dosVotosEnContra}</div>
              )}
              {row.firstPlaceCanceled && (
              <div className="anulado" style={{backgroundColor: 'transparent'}}>{row.firstPlace}</div>
              )}
            </td>

{/* COLUMNA 5, CON EL FORM SELECT PARA EL VOTO DE SEGUNDO LUGAR */}
            <td>
              <FormSelect
                as="select"
                disabled={row.checkedF || row.participant === eliminados.eliminado1 || row.participant === eliminados.eliminado2 }
                // disabled={row.participant === 'Catalina' || row.participant === 'Juliana'} // BORRAR. Volver a la línea de arriba con la lógica original
                value={row.secondPlace}
                // ${row.participant === 'Catalina' ? 'disabled' : ''} VA EN CLASSNAME = LINEA PARA DESHABILITAR SEGUNDO VOTO A QUIEN USÓ LA FULMINANTE
                className={`comboBox
                ${row.checkedF ? 'disabled' : ''}
                ${row.checked ? 'espontanea' : ''}
                ${row.secondPlaceCanceled ? 'votoFinalDisabler' : ''}
                ${row.participant === eliminados.eliminado1 ||
                  row.participant === eliminados.eliminado2 ||
                  row.participant === "Teléfono" ||
                  (noVota !== null && noVota.includes(row.participant)) ||
                  (unVotoVale2!== null && unVotoVale2.includes(row.participant))
                  ? 'votoFinalDisabler' : ''}
                ${votoValeDoble.includes(row.participant) ? 'columnaJugadoresNegrita votoValeDoble' : ''}
                `}
                style={{
                  marginTop: '2.5px',
                  marginBottom: '2.5px',
                  }}
                onChange={e => handleSecondPlaceChange(index, e.target.value)}>
                <option value="">-</option>
                {participants
                // .filter(participant => !inmune.includes(participant))
                .filter(participant =>
                  participant !== row.participant &&
                  !inmune.includes(participant) &&
                  !row.firstPlace.includes(participant) &&
                  (!fulminado.includes(participant) || row.checkedF) &&
                  // (nominado !== null && !nominado.includes(participant))
                  ((nominado !== null ? !nominado.includes(participant) : true))
                  )
                .map(participant => (
                <option key={participant} value={participant}>
                {participant}
                </option>
                ))}
              </FormSelect>
              {row.participant === eliminados.eliminado1 && (
              <div className="columnaJugadoresNegrita espfulmFont votoFinalSecondPlaceRow" style={{backgroundColor: 'transparent'}}>(voto final)</div>
              )}
              {row.participant === eliminados.eliminado2 && (
              <div className="columnaJugadoresNegrita espfulmFont votoFinalSecondPlaceRow" style={{backgroundColor: 'transparent'}}>(voto final)</div>
              )}
              {row.secondPlaceCanceled && (
              <div className="anulado" style={{backgroundColor: 'transparent'}}>{row.secondPlace}</div>
              )}
            </td>
          </tr>
        ))}
        <tr>
        {votoValeDoble.length !== 0 && (
          <>
          <td></td>
          <td></td>
          <td className="columnaJugadoresNegrita votoValeDoble" colSpan="3">* Los votos valen doble</td></>
          )}
        </tr>
</tbody>
      </Table>
 
 
      <div className="neon-line-divisoria-fija">
  <span></span>
</div>
 {/* {lineaDivisoriaToLeft} */}

</Container>  

{/* <LineaDivisoria2/> */}
{/* <div className="neon-line-divisoria-toLeft">
  <span></span>
</div> */}



  <Container className="containerBotonReiniciar"> {/*BOTÓN REINICIAR*/}
    <Row>
      <Col xs={12} style={{display: 'flex', justifyContent: 'center'}}>
      <>
            {isConfirming && (
              <div> {/* className="sidebar-open" */}
                <div className="sidebar-overlay reiniciar"></div>
                <div className="container-neon-reiniciar" style={estiloBotonReiniciar}>
                  <h6>Esta acción eliminará todos los datos cargados. ¿Proceder?</h6>
                  <Button onClick={() => {handleReset(); setIsConfirming(false)}} variant="danger" className="fixed-width-reiniciar">Sí</Button>{' '}
                  <Button onClick={() => setIsConfirming(false)} variant="dark" className="fixed-width-reiniciar">No</Button>{' '}
                </div>
              </div>
            )}
          </>
      </Col>
    </Row>
    <Row>
        {/* <Col xs={6}>
        {status === "finalizado" && (
          <Button style={estiloBotonExportar} onClick={handleExport} className="custom-class-exportar">Exportar</Button>
          )}
        </Col> */}
        
          <Button style={estiloBotonReiniciar} onClick={() => setIsConfirming(true)} className="custom-class-reiniciar">Reiniciar nominaciones</Button>
        
    </Row>



  </Container>


  <Container className="container-capturar">
      <Button onClick={() => takeScreenshot(divRefNominaciones, mensajeTablaNominacionesOk, mensajeTablaNominacionesFail)} className="custom-class-capturar">Capturar votos</Button>
      <Button onClick={() => takeScreenshot(divRefPlaca, mensajePlacaOk, mensajePlacaFail)} className="custom-class-capturar">Capturar placa</Button>
      </Container>


</div>
);
}  
export default ContadorNominaciones;