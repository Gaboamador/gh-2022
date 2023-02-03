import React, { useState, useEffect } from "react";
import './App.css';
import Ariel from './pictures/Ariel.png'
import Camila from './pictures/Camila.png'
import Daniela from './pictures/Daniela.png'
import Julieta from './pictures/Julieta.png'
import Lucila from './pictures/Lucila.png'
import Marcos from './pictures/Marcos.png'
import Nacho from './pictures/Nacho.png'
import Romina from './pictures/Romina.png'
import Walter from './pictures/Walter.png'
import {Button, Row, Col, Container, ListGroup, Table, FormCheck, FormSelect, Image} from 'react-bootstrap';

const participants = ['Ariel', 'Camila', 'Daniela', 'Julieta', 'Lucila', 'Marcos', 'Nacho', 'Romina', 'Walter'];

const initialRows = participants.map(participant => ({ participant, firstPlace: '', secondPlace: ''}));

const participantsToImage = {
  Ariel: Ariel,
  Camila: Camila,
  Daniela: Daniela,
  Julieta: Julieta,
  Lucila: Lucila,
  Marcos: Marcos,
  Nacho: Nacho,
  Romina: Romina,
  Walter: Walter
};

function ContadorNominaciones() {
  
  const [rows, setRows] = useState(localStorage.getItem('rows') ? JSON.parse(localStorage.getItem('rows')) : initialRows);
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

    useEffect(() => {
    const updatedCounts = {};
    rows.forEach(({ firstPlace, secondPlace, checked, checkedF }) => {
      if (checkedF) {
        if (firstPlace) {
          setFulminado(fulminado)
        }}

      if (!checkedF) {
        
        if (firstPlace) {
          updatedCounts[firstPlace] = (updatedCounts[firstPlace] || 0) + (checked ? 3 : 2);
        }        
        
        if (secondPlace) {
          updatedCounts[secondPlace] = (updatedCounts[secondPlace] || 0) + (checked ? 2 : 1);
          }
      }
    });
    setCounts(updatedCounts);
    localStorage.setItem('fulminado', fulminado);
    localStorage.setItem('selectedIndex', JSON.stringify(selectedIndex));
    localStorage.setItem('selectedIndexF', JSON.stringify(selectedIndexF));
  }, [rows, fulminado, selectedIndex, selectedIndexF]);


  const handleFirstPlaceChange = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].firstPlace = value;
    setRows(updatedRows);

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
  
  
  const handleSecondPlaceChange = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].secondPlace = value;
    setRows(updatedRows);
  
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
  const estiloFueraDePlaca = {
    marginTop: "10px",
    marginBottom: "10px"
  }
  const estiloVotaciones = {
    marginTop: "10px",
    marginBottom: "10px"
  }
  const estiloBotonReiniciar = {
    marginTop: "40px",
    marginBottom: "20px",
    float: "right"
    }

return (
  <div className="GeneralFont">
  
  {/* CONTAINER CON LA PLACA DE NOMINADOS */}
  <Container 
  style={{
    marginTop: -10,
    marginBottom: 20,
    backgroundImage: `url(${require('./pictures/FondoPlaca.jpg')})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    zIndex: -1,
    }}> 
    {fulminado === '' ? null : (
    <div style={{ display: 'inline-flex', alignItems: 'flex-end', marginBottom: 40 }}>
    {/*TEXTO F FULMINADO*/}
    <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'black',
              fontSize: 25,
              fontFamily: 'BIZ UDGothic',
              fontWeight: 600,
              backgroundColor: '#e700ee',
              marginTop: 10,
              borderBottomLeftRadius: 0,
              borderTopLeftRadius: 15,
              borderBottomRightRadius: 10,
              borderTopRightRadius: 10,
              width: 35,
              zIndex: 1
              }}>
              F
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
      {index < 4 || count >= fourthCount ? (        
          <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'black',
              fontSize: 25,
              fontFamily: 'BIZ UDGothic',
              fontWeight: 600,
              backgroundColor: '#e700ee',
              marginTop: 10,
              borderBottomLeftRadius: 0,
              borderTopLeftRadius: 15,
              borderBottomRightRadius: 10,
              borderTopRightRadius: 10,
              width: 35,
              zIndex: 1
              }}>
              {count}
            </div>
      ) : null}
      {/*IMAGEN PLACA ORDENADA*/}
      {index < 4 || count >= fourthCount ? (
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
{/*
{sortedEntries.length > 0 ? (
    <h6 className="placaNominados" style={estiloPlacaDeNominados}>VOTACIÓN PARCIAL</h6>
    ) : null}
*/}
{sortedEntries.length > 0 ? (
  <h6 className="placaNominados" style={estiloPlacaDeNominados}>
    {participants ? (
      participants.some(participant => participant[1] > 0) ? 'VOTACIÓN PARCIAL' : 'PLACA NOMINADOS'
    ) : null}
  </h6>
) : null}
</Container>

<Container style={{marginBottom: 20 }}> {/* CONTAINER CON LOS FUERA DE PLACA */}

{sortedEntries.length > 0 ? (
  <h6 className="fueraDePlaca" style={estiloFueraDePlaca}>FUERA DE PLACA</h6>
) : null}
{sortedEntries.map(([participant, count], index) => {          
  return (
    <div key={participant} style={{ display: 'inline-flex', alignItems: 'flex-end', marginBottom: 40 }}>
      {/*NUMEROS PLACA ORDENADA*/}
      {index < 4 || count >= fourthCount ? null : (        
          <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'black',
              fontSize: 25,
              fontFamily: 'BIZ UDGothic',
              fontWeight: 600,
              backgroundColor: '#e700ee',
              marginTop: 10,
              borderBottomLeftRadius: 0,
              borderTopLeftRadius: 15,
              borderBottomRightRadius: 10,
              borderTopRightRadius: 10,
              width: 35,
              zIndex: 1
              }}>
              {count}
            </div>
      )}
      {/*IMAGEN PLACA ORDENADA*/}
      {index < 4 || count >= fourthCount ? null : (
                <div style={{
                  marginLeft: -45,
                  paddingTop: 5,
                  marginBottom: -30,
                  paddingLeft: 10,
                  paddingRight: 10,
                  zIndex: -1
                  }}>
      <Image src={participantsToImage[participant]} width="99px" height="105px"/>
      </div>
      )}
    </div>
  );
})}
</Container>

    <Container>
    <h6 className="votaciones" style={estiloVotaciones}>VOTACIONES</h6>
      <Container>
      <Table>
          <Row style={{marginBottom: '10px'}}>
            <Col className='tituloEspontanea' xs={1}>E</Col>
            <Col className='tituloFulminante' xs={1}>F</Col>
            <Col className='tituloTablaDetalleVotosJugador'>JUGADOR</Col>
            <Col className='tituloTablaDetalleVotos1erLugar'>1er LUGAR</Col>
            <Col className='tituloTablaDetalleVotos2doLugar'>2do LUGAR</Col>
          </Row>
          
        {rows.map((row, index) => (
          <Row
          style={row.checked ?
            {background: "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(36,38,212,0.3) 20%, rgba(36,38,212,0.3) 80%, rgba(255,255,255,0) 100%)"} :
            row.checkedF ?
            {background: "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(171,52,191,0.3) 20%, rgba(171,52,191,0.3) 80%, rgba(255,255,255,0) 100%)"} :
            {}
            }>              
            <Col xs={1} style={{marginLeft:'-11px'}}>
              <FormCheck
              type="checkbox"
              style={{marginTop: '2.5px', marginBottom: '2.5px'}}
              checked={row.checked}
              onChange={() => handleCheckbox(row.participant, index)}
              onClick={handleCheckboxClick}
              disabled={index !== selectedIndex && selectedIndex !== -1}>
              </FormCheck>
            </Col>
            <Col xs={1}>
              <FormCheck
              type="checkbox"
              style={{marginTop: '2.5px', marginBottom: '2.5px'}}
              checked={row.checkedF}
              onChange={() => handleCheckboxF(row.participant, index)}
              onClick={handleCheckboxClickF}
              disabled={index !== selectedIndexF && selectedIndexF !== -1}>
              </FormCheck>
            </Col>
            <Col className="columnaJugadoresNegrita">
              <ListGroup
              style={{marginTop: '2.5px', marginBottom: '2.5px'}}>
              {row.participant}
              </ListGroup>
            </Col>
            <Col>
              <FormSelect
                value={row.firstPlace}
                style={{marginTop: '2.5px', marginBottom: '2.5px'}}
                onChange={e => handleFirstPlaceChange(index, e.target.value)}>
                <option value="">-</option>
                {participants.map(participant => (
                <option key={participant} value={participant}>
                {participant}
                </option>
                ))}
              </FormSelect>
            </Col>
            <Col>
              <FormSelect
                value={row.secondPlace}
                style={{marginTop: '2.5px', marginBottom: '2.5px'}}
                onChange={e => handleSecondPlaceChange(index, e.target.value)}>
                <option value="">-</option>
                {participants.map(participant => (
                <option key={participant} value={participant}>
                {participant}
                </option>
                ))}
              </FormSelect>
            </Col>
          </Row>
        ))}
      </Table>
      </Container>
    </Container>  
    
<Container>
    <Container> {/*BOTÓN REINICIAR*/}
<Row>
    <Col xs={12}>
      <>
        {isConfirming && (
          <div className="precaucion" style={estiloBotonReiniciar}>
            <h6>Esta acción eliminará todos los datos cargados. ¿Proceder?</h6>
            <Button onClick={() => {handleReset(); setIsConfirming(false)}} variant="outline-danger">Sí</Button>{' '}
            <Button onClick={() => setIsConfirming(false)} variant="outline-dark">No</Button>{' '}
          </div>
        )}
      </>
    </Col>
  </Row>
  <Row>
    <Col xs={6}></Col>
    <Col xs={6}>
      <Button style={estiloBotonReiniciar} onClick={() => setIsConfirming(true)} className="btn btn-danger">↺</Button>
    </Col>
  </Row>
</Container>
</Container>

  </div>
);
}  
export default ContadorNominaciones;