import React, { useState, useEffect } from "react";
import '../App.css';
import {Button, Row, Col, Container, ListGroup, Table, FormCheck, FormSelect, Image} from 'react-bootstrap';
// import { dataPlaca } from "../data/placasData";
// import { participants } from "../data/participantsData";
import { participantsToImage } from "../data/participantsToImage";
// import { votoFinal, nominado, noVota, inmune, votoValeDoble, dosVotosEnContra } from "../data/modificadores";

function ContadorNominaciones() {
  
  const [dataPlaca, setData] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [eliminado, setLastEliminado] = useState("")
  // Declaración modificadores
  const [votoFinal, setVotoFinal] = useState("");
  // const [nominado, setNominado] = useState([]);
  const [nominado, setNominado] = useState(null);
  const [noVota, setNoVota] = useState([]);
  const [inmune, setInmune] = useState([]);
  const [votoValeDoble, setVotoValeDoble] = useState([]);
  const [dosVotosEnContra, setDosVotosEnContra] = useState("");
    
  const fetchData = async () => {
  try {

// Fetch data from the first URL (ÚLTIMO ELIMINADO)
  const response = await fetch('https://raw.githubusercontent.com/Gaboamador/gh-data/main/placasNominados.json');
  const jsonData = await response.json();
  setData(jsonData);

// Fetch data from the second URL (PARTICIPANTES)
  const response2 = await fetch('https://raw.githubusercontent.com/Gaboamador/gh-data/main/participants.json');
  const jsonData2 = await response2.json();
  setParticipants(jsonData2.participants);

  // Fetch data from the third URL (MODIFICADORES)
  const response3 = await fetch('https://raw.githubusercontent.com/Gaboamador/gh-data/main/modificadores.json');
  const jsonData3 = await response3.json();
  setVotoFinal(jsonData3.votoFinal);
  setNominado(jsonData3.nominado);
  setNoVota(jsonData3.noVota);
  setInmune(jsonData3.inmune);
  setVotoValeDoble(jsonData3.votoValeDoble);
  setDosVotosEnContra(jsonData3.dosVotosEnContra);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

useEffect(() => {
  fetchData();
}, []);


/*FIN LLAMADAS API*/

// Find the last 'Eliminado' of the last week

useEffect(() => {
let lastEliminadoName = null;
let lastEliminadoWeek = -1;

dataPlaca.forEach(weekData => {
  const eliminadoIndex = weekData.data.findIndex(entry => entry.result.includes('Eliminado'));
  
  if (eliminadoIndex !== -1 && weekData.week > lastEliminadoWeek) {
    lastEliminadoWeek = weekData.week;
    lastEliminadoName = weekData.data[eliminadoIndex].name;
  }
});
setLastEliminado(lastEliminadoName)

}, [dataPlaca, eliminado]);
// const eliminado = lastEliminadoName

// const initialRows = [
//   ...(votoFinal !== ""
//     ? [{ participant: eliminado, firstPlace: votoFinal, secondPlace: "" }]
//     : []),
//   ...participants.map((participant) => ({ participant, firstPlace: '', secondPlace: '' }))
// ];

const initialRows = [
  ...(votoFinal !== ""
  ? [{ participant: eliminado, firstPlace: votoFinal, secondPlace: "" }]
  : []),
  
  ...(dosVotosEnContra !== ""
  ? [{ participant: "Teléfono", firstPlace: dosVotosEnContra, secondPlace: "" }]
  : []),
  ...participants.map((participant) => ({ participant, firstPlace: '', secondPlace: '' })),
];

// useEffect(() => {

//   if (localStorage.getItem('rows') !== null) {
//     setRows([JSON.parse(localStorage.getItem('rows'))]);
//   } else {
//     setRows([...initialRows]);
//   }  
  
// }, [participants]);
useEffect(() => {
  const storedRows = localStorage.getItem('rows');
  
  if (storedRows !== null) {
    setRows(JSON.parse(storedRows));
  } else {
    setRows(initialRows);
  }
}, [participants, votoFinal, nominado, noVota, inmune, votoValeDoble, dosVotosEnContra]);

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
  const [fulminado, setFulminado] = useState(localStorage.getItem('fulminado') || '');
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedF, setIsCheckedF] = useState(false);

  const sortedEntries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const fourthCount = sortedEntries.length > 4 ? sortedEntries[3][1] : 0;
  const thirdCount = sortedEntries.length > 3 ? sortedEntries[2][1] : 0;

  
    useEffect(() => {
    const updatedCounts = {};

    // rows.forEach(({ firstPlace, secondPlace, checked, checkedF }) => {
    rows.forEach(({ firstPlace, secondPlace, checked, checkedF, participant }) => {

      if (checkedF) {
        if (firstPlace) {
          setFulminado(fulminado)
          /**/
          const updatedRows = [...rows];
          for (let i = 0; i < updatedRows.length; i++) {
            if (!updatedRows[i].checkedF) {
            updatedRows[i].firstPlace = updatedRows[i].firstPlace === firstPlace ? "" : updatedRows[i].firstPlace;
            updatedRows[i].secondPlace = updatedRows[i].secondPlace === firstPlace ? "" : updatedRows[i].secondPlace;
            }
          }
          setRows(updatedRows);
          /**/
        }}

      if (!checkedF) {
        
        const isVotoValeDoble = votoValeDoble.includes(participant);
        
        if (firstPlace) {

          // updatedCounts[firstPlace] = (updatedCounts[firstPlace] || 0) + (checked ? 3 : 2);
          updatedCounts[firstPlace] = (updatedCounts[firstPlace] || 0) + (checked ? (isVotoValeDoble ? 5 : 3) : (isVotoValeDoble ? 4 : 2));

        }        
        
        if (secondPlace) {

          // updatedCounts[secondPlace] = (updatedCounts[secondPlace] || 0) + (checked ? 2 : 1);
          updatedCounts[secondPlace] = (updatedCounts[secondPlace] || 0) + (checked ? (isVotoValeDoble ? 3 : 2) : (isVotoValeDoble ? 2 : 1));

          }
      }
    });
    setCounts(updatedCounts);
    localStorage.setItem('fulminado', fulminado);
    localStorage.setItem('selectedIndex', JSON.stringify(selectedIndex));
    localStorage.setItem('selectedIndexF', JSON.stringify(selectedIndexF));
  }, [rows, fulminado, selectedIndex, selectedIndexF, votoValeDoble]);


  const handleFirstPlaceChange = (index, value) => {
/* DE ACA PARA ABAJO ES LA PRIMERA PARTE DEL CODIGO ORIGINAL
    const updatedRows = [...rows];
    updatedRows[index].firstPlace = value;
    setRows(updatedRows);
/* DE ACA PARA ARRIBA ES LA PRIMERA PARTE DEL CODIGO ORIGINAL

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
/* DE ACA PARA ABAJO ES LA PRIMERA PARTE DEL CODIGO ORIGINAL
    const updatedRows = [...rows];
    updatedRows[index].secondPlace = value;
    setRows(updatedRows);
/* DE ACA PARA ARRIBA ES LA PRIMERA PARTE DEL CODIGO ORIGINAL
  
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

/* DE ACA PARA ABAJO ES LA SEGUNDA PARTE DEL CODIGO ORIGINAL */
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
  /* DE ACA PARA ARRIBA ES LA SEGUNDA PARTE DEL CODIGO ORIGINAL */

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
  const handleReset = () => {
    setRows(initialRows);
    setCounts({});
    setFulminado('');
    setSelectedIndex(-1);
    setSelectedIndexF(-1);
    localStorage.removeItem("rows");
    localStorage.removeItem("counts");
    localStorage.removeItem("fulminado");
    localStorage.removeItem('selectedIndex');
    localStorage.removeItem('selectedIndexF');
    setFulminado('');
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

    const handleExport = () => {
      // Convert the 'rows' array to the desired format
      const exportedArray = rows.map(row => [
        `'${row.participant}'`,
        `'${row.firstPlace}'`,
        `'${row.secondPlace}'`,
      ]);
    
      // Convert the array to a string
      const formattedArray = `[${exportedArray.map(row => `[${row.join(', ')}]`).join(',\n')}]`;
    
      // Create a Blob with the formatted data
      const blob = new Blob([formattedArray], { type: 'application/json' });
    
      // Create a link element to download the JSON file
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'exported_rows.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    
    

return (
<div className="content"  style={{
  backgroundImage: `url(${require('../pictures/FondoPlaca.jpg')})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  zIndex: -1,
  paddingTop: 20,
  minHeight: '100vh'
  }}>
  
<Container> {/* CONTAINER CON LA PLACA DE NOMINADOS Y EL ZOCALO DE VOTACION PARCIAL*/}
    <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginBottom: -10}}> {/* CONTAINER DE IMAGENES, SIN ZOCALO */}

    
    {nominado && nominado.map((participant) => {
    return (
      <div key={participant} style={{ display: 'inline-flex', alignItems: 'flex-end', marginBottom: 40 }}>
        {/*TEXTO NOMINADO*/}
        {nominado !== null ? (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: 'white',
                fontSize: 23,
                fontFamily: 'Oswald-Regular',
                fontWeight: 600,
                // background: "linear-gradient(to top right, #ab34bf 0%, #1f185b 30%)",
                background: "transparent",
                marginBottom: -14,
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 15,
                borderBottomRightRadius: 10,
                borderTopRightRadius: 0,
                width: 45,
                zIndex: 1
                }}>
                
              </div>
        ) : null}
        {/*IMAGEN NOMINADO*/}
        {nominado !== null ? (
                  <div style={{
                    marginLeft: -45,
                    paddingTop: 5,
                    marginBottom: -30,
                    paddingLeft: 10,
                    paddingRight: 10,
                    zIndex: 0
                    }}>
        <Image src={participantsToImage[participant]} width="99px" height="105px"/>
        </div>
        ) : null}
      </div>
    );
  })}

      {fulminado === '' ? null : (
      <div style={{ display: 'inline-flex', alignItems: 'flex-end', marginBottom: 40 }}>
      {/*TEXTO F FULMINADO*/}
      <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: 'white',
                fontSize: 23,
                fontFamily: 'Oswald-Regular',
                fontWeight: 600,
                background: "linear-gradient(to top right, #ab34bf 0%, #1f185b 30%)",
                marginBottom: -14,
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 15,
                borderBottomRightRadius: 10,
                borderTopRightRadius: 0,
                width: 45,
                zIndex: 1
                }}>
                X
      </div>
      {/*IMAGEN FULMINADO*/}
      <div style={{
                    marginLeft: -45,
                    paddingTop: 5,
                    marginBottom: -30,
                    paddingLeft: 10,
                    paddingRight: 10,
                    zIndex: 0
                    }}>
        <Image src={participantsToImage[fulminado]} width="99px" height="105px"/>
        </div>
    </div>
  )}
  {sortedEntries.map(([participant, count], index) => {          
    return (
      <div key={participant} style={{ display: 'inline-flex', alignItems: 'flex-end', marginBottom: 40 }}>
        {/*NUMEROS PLACA ORDENADA*/}
        {index < 3 || count >= fourthCount ? (        
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: 'white',
                fontSize: 23,
                fontFamily: 'Oswald-Regular',
                fontWeight: 600,
                background: "linear-gradient(to top right, #ab34bf 0%, #1f185b 30%)",
                marginBottom: -14,
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 15,
                borderBottomRightRadius: 10,
                borderTopRightRadius: 0,
                width: 45,
                zIndex: 1
                }}>
                {count}
              </div>
        ) : null}
        {/*IMAGEN PLACA ORDENADA*/}
        {index < 3 || count >= fourthCount ? (
                  <div style={{
                    marginLeft: -45,
                    paddingTop: 5,
                    marginBottom: -30,
                    paddingLeft: 10,
                    paddingRight: 10,
                    zIndex: 0
                    }}>
        <Image src={participantsToImage[participant]} width="99px" height="105px"/>
        </div>
        ) : null}
      </div>
    );
  })}
    </Container>    
    <Container id="zocaloEstadoVotacion"> {/* CONTAINER DE ZOCALO VOTACION PARCIAL/FINAL */}
    {/*
    <h6 className="placaNominados" style={estiloPlacaDeNominados}>
    {rows.every(row => (row.firstPlace !== '' && row.secondPlace !== '') || (row.firstPlace !== '' && row.checkedF)) 
    ? 'VOTACIÓN FINAL'
    : rows.some(row => row.firstPlace !== '' || row.secondPlace !== '') 
    ? 'VOTACIÓN PARCIAL'
    : ''
    }
    </h6>
    */}
    <h6 className="placaNominados" style={estiloPlacaDeNominados}>
    {rows.filter(row => !row.fulminated).every(row => (row.firstPlace !== '' || row.secondPlace !== '') || (row.firstPlace !== '' && row.checkedF)) 
    ? 'VOTACIÓN FINAL'
    : rows.filter(row => !row.fulminated).some(row => row.firstPlace !== '' || row.secondPlace !== '') 
    ? 'VOTACIÓN PARCIAL'
    : ''
    }
    </h6>
    </Container>
</Container>

<Container> {/* CONTAINER CON FUERA DE PLACA Y EL ZOCALO CON FUERA DE PLACA*/}
    <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}> {/* CONTAINER CON LOS FUERA DE PLACA SIN EL ZOCALO*/}
    {sortedEntries.map(([participant, count], index) => {          
      return (
        <div key={participant} style={{ display: 'inline-flex', alignItems: 'flex-end', marginBottom: 30 }}>
          {/*NUMEROS FUERA DE PLACA ORDENADA*/}
          {index < 3 || count >= fourthCount ? null : (        
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: 'white',
                fontSize: 23,
                fontFamily: 'Oswald-Regular',
                fontWeight: 600,
                background: "linear-gradient(to top right, #ab34bf 0%, #1f185b 30%)",
                marginBottom: -14,
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 15,
                borderBottomRightRadius: 10,
                borderTopRightRadius: 0,
                width: 45,
                zIndex: 1
                  }}>
                  {count}
                </div>
          )}
          {/*IMAGEN PLACA ORDENADA*/}
          {index < 3 || count >= fourthCount ? null : (
                    <div style={{
                      marginLeft: -45,
                      paddingTop: 5,
                      marginBottom: -30,
                      paddingLeft: 10,
                      paddingRight: 10,
                      zIndex: 0
                      }}>
          <Image src={participantsToImage[participant]} width="99px" height="105px"/>
          </div>
          )}
        </div>
      );
    })}
    </Container>
    <Container> {/*CONTAINER CON EL ZOCALO FUERA DE PLACA*/}
    <h6 className="placaNominados" style={estiloPlacaDeNominados}>
      {sortedEntries.some(([participant, count], index) => {
        return (index >= 3 && count < fourthCount)
      }) ? 'FUERA DE PLACA' : null}
    </h6>
    </Container>
</Container>

<Container style={{marginTop: '20px'}}>
<Row>
  <Col xs={1}>
  </Col>
  <Col xs={8} className="lineaDivisoria2" style={{width:'60%'}}>
  </Col>
  <Col xs={1}>
  </Col>
  <Col xs={2} className="lineaDivisoria2" style={{width:'20%'}}>
  </Col>
  </Row>
</Container>
<Container className="containerVotaciones"> {/* CONTAINER CON LAS VOTACIONES */}
      <Container style={{paddingBottom: 1, marginTop: '0px', backgroundImage: `url(${require('../pictures/FondoPlaca2.jpg')})`}}>
      <Table>
          <Row className='encabezadoVotaciones' style={{marginBottom: '10px', backgroundImage: `url(${require('../pictures/HeaderVotaciones.jpg')})`}}>
            <Col className='tituloEspontanea' xs={1}>E</Col>
            <Col className='tituloFulminante' xs={1}>F</Col>
            <Col className='tituloTablaDetalleVotosJugador'
             style={{marginLeft: '-1px'}}>JUGADOR</Col>
            <Col className='tituloTablaDetalleVotos1erLugar'>1er LUGAR</Col>
            <Col className='tituloTablaDetalleVotos2doLugar'>2do LUGAR</Col>
          </Row>
          
        {rows.map((row, index) => (

// FORMATO DE COLOR PARA CADA UNA DE LAS FILAS COMPLETAS
          <Row
          key={index}
          style={
            row.checked ?
            {background: "linear-gradient(to right, rgba(36,38,212,1) 0%, rgba(36,38,212,0.9) 20%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%)",borderRadius: "20px"} :
            row.checkedF ?
            {background: "linear-gradient(to right, rgba(171,52,191,1) 0%, rgba(171,52,191,0.9) 20%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%)",borderRadius: "20px"} :
            row.participant === eliminado ?
            {background: "linear-gradient(to right, rgba(255,255,255,0) 1%, rgba(20, 91, 158,0.5) 10%, rgba(20, 91, 158,1) 50%, rgba(20, 91, 158,0.5) 90%, rgba(255,255,255,0) 99%)"} :
            row.participant === "Teléfono" ?
            {background: "linear-gradient(to right, rgba(255,255,255,0) 1%, rgba(178,0,0,0.5) 10%, rgba(178,0,0,1) 50%, rgba(178,0,0,0.5) 90%, rgba(255,255,255,0) 99%)"} :
            {}
            }>

{/* COLUMNA 1, CON EL CHECKBOX PARA LA ESPONTÁNEA */}
            <Col xs={1} style={{marginLeft:'-7px'}}>
              <FormCheck
              type="checkbox"
              style={{marginTop: '2.5px', marginBottom: '2.5px', backgroundColor: 'transparent'}}
              checked={row.checked}
              onChange={() => handleCheckbox(row.participant, index)}
              onClick={handleCheckboxClick}
              disabled={index !== selectedIndex && selectedIndex !== -1}
              className={`
              ${row.checkedF ? 'votoFinalDisabler' : ''}
              ${row.participant === eliminado || row.participant === "Teléfono" || (noVota !== null && noVota.includes(row.participant)) ? 'votoFinalDisabler' : ''}`}
              >
              </FormCheck>
            </Col>

{/* COLUMNA 2, CON EL CHECKBOX PARA LA FULMINANTE */}
            <Col xs={1}>
              <FormCheck
              type="checkbox"
              style={{marginTop: '2.5px', marginBottom: '2.5px', backgroundColor: 'transparent'}}
              checked={row.checkedF}
              onChange={() => handleCheckboxF(row.participant, index)}
              onClick={handleCheckboxClickF}
              disabled={index !== selectedIndexF && selectedIndexF !== -1}
              className={`
              ${row.checked ? 'votoFinalDisabler' : ''}
              ${row.participant === eliminado || row.participant === "Teléfono" || (noVota !== null && noVota.includes(row.participant)) ? 'votoFinalDisabler' : ''}`}
              >
              </FormCheck>
            </Col>

{/* COLUMNA 3, CON LA LISTA DE NOMBRES DE PARTICIPANTES */}
            <Col className="columnaJugadoresNegrita">
              <ListGroup
              // className={`columnaJugadoresNegrita ${row.checkedF ? 'espfulmFont' : ''} ${row.checked ? 'espfulmFont' : ''} `}
              className={`columnaJugadoresNegrita
              ${row.checkedF ? 'espfulmFont' : ''}
              ${row.checked ? 'espfulmFont' : ''}
              ${row.participant === eliminado || row.participant === "Teléfono" ? 'votoFinalDisabler' : ''}
              ${votoValeDoble.includes(row.participant) ? 'votoValeDoble' : ''} `}
              style={{marginTop: '2.5px', marginBottom: '2.5px', backgroundColor: 'transparent'}}>
              {row.participant}
              {votoValeDoble.includes(row.participant) && "*"}
              </ListGroup>
              {row.participant === eliminado && (
              <div className="columnaJugadoresNegrita espfulmFont" style={{backgroundColor: 'transparent'}}>{eliminado}</div>
              )}
              {row.participant === "Teléfono" && (
              <div className="columnaJugadoresNegrita telefono" style={{backgroundColor: 'transparent'}}>Teléfono</div>
              )}
            </Col>

{/* COLUMNA 4, CON EL FORM SELECT PARA EL VOTO DE PRIMER LUGAR */}
            <Col>
              <FormSelect
                value={row.firstPlace}
                // className={`comboBox ${row.checkedF ? 'fulminanteColor' : ''} ${row.checked ? 'espontanea' : ''} ${row.participant === eliminado ? 'votoFinalFirstPlace' : ''}`}
                className={`comboBox
                ${row.checkedF ? 'fulminanteColor' : ''}
                ${row.checked ? 'espontanea' : ''}
                ${row.participant === eliminado || row.participant === "Teléfono" || (noVota!== null && noVota.includes(row.participant)) ? 'votoFinalDisabler' : ''}`}
                style={{
                marginTop: '2.5px',
                marginBottom: '2.5px',
                backgroundColor: 'transparent'
                }}
                onChange={e => handleFirstPlaceChange(index, e.target.value)}
                disabled={row.participant === eliminado}
                >
                <option value="">-</option>
                {participants
                .filter(participant => !inmune.includes(participant))
                .map(participant => (
                <option key={participant} value={participant}>
                {participant}
                </option>
                ))}
              </FormSelect>
              {row.participant === eliminado && (
              <div className="columnaJugadoresNegrita espfulmFont" style={{backgroundColor: 'transparent'}}>{votoFinal}</div>
              )}
              {row.participant === "Teléfono" && (
              <div className="columnaJugadoresNegrita espfulmFont" style={{backgroundColor: 'transparent'}}>{dosVotosEnContra}</div>
              )}
            </Col>

{/* COLUMNA 5, CON EL FORM SELECT PARA EL VOTO DE SEGUNDO LUGAR */}
            <Col>
              <FormSelect
                as="select"
                disabled={row.checkedF || row.participant === eliminado }
                value={row.secondPlace}
                className={`comboBox
                ${row.checkedF ? 'disabled' : ''}
                ${row.checked ? 'espontanea' : ''}
                ${row.participant === eliminado || row.participant === "Teléfono" || (noVota !== null && noVota.includes(row.participant)) ? 'votoFinalDisabler' : ''}`}
                style={{
                  marginTop: '2.5px',
                  marginBottom: '2.5px',
                  backgroundColor: 'transparent'
                  }}
                onChange={e => handleSecondPlaceChange(index, e.target.value)}>
                <option value="">-</option>
                {participants
                .filter(participant => !inmune.includes(participant))
                .map(participant => (
                <option key={participant} value={participant}>
                {participant}
                </option>
                ))}
              </FormSelect>
              {row.participant === eliminado && (
              <div className="columnaJugadoresNegrita espfulmFont votoFinalSecondPlaceRow" style={{backgroundColor: 'transparent'}}>(voto final)</div>
              )}
            </Col>
          </Row>
        ))}
        <footer className="columnaJugadoresNegrita votoValeDoble" style={{marginTop:10}}>
        {votoValeDoble.length !== 0 && (
          <span>* Los votos valen doble</span>
          )}
        </footer>
      </Table>
      </Container>
</Container>  

<Container style={{marginTop: '12px'}}>
<Row>
  <Col xs={1} className="lineaDivisoria2" style={{width:'5%', marginLeft:20}}>
  </Col>
  <Col xs={2}>
  </Col>
  <Col xs={4} className="lineaDivisoria2" style={{width:'60%'}}>
  </Col>
  <Col xs={2}>
  </Col>
  </Row>
</Container>


<Container> {/* CONTAINER CON BOTÓN DE REINICIAR */}
  <Container> {/*BOTÓN REINICIAR*/}
    <Row>
      <Col xs={12} style={{display: 'flex', justifyContent: 'center'}}>
      <>
            {isConfirming && (
              <div className="container-neon-reiniciar" style={estiloBotonReiniciar}>
                <h6>Esta acción eliminará todos los datos cargados. ¿Proceder?</h6>
                <Button onClick={() => {handleReset(); setIsConfirming(false)}} variant="danger" className="fixed-width-reiniciar">Sí</Button>{' '}
                <Button onClick={() => setIsConfirming(false)} variant="dark" className="fixed-width-reiniciar">No</Button>{' '}
              </div>
            )}
          </>
      </Col>
    </Row>
    <Row>
        <Col xs={6}>
          <Button style={estiloBotonExportar} onClick={handleExport} className="custom-class-exportar">Exportar</Button>
        </Col>
        <Col xs={6}>
          <Button style={estiloBotonReiniciar} onClick={() => setIsConfirming(true)} className="custom-class-reiniciar">Reiniciar</Button>
        </Col>
    </Row>
  </Container>
</Container>


</div>
);
}  
export default ContadorNominaciones;