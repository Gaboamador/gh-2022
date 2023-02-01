import React, { useState, useEffect } from "react";
import './App.css';
import gh from './logo.png';
import {Button, Row, Col, Container, ListGroup, Table, FormCheck, FormSelect, Nav} from 'react-bootstrap';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import domtoimage from 'dom-to-image';
import { findRenderedComponentWithType } from "react-dom/test-utils";

const participants = ['Ariel', 'Camila', 'Daniela', 'Julieta', 'Lucila', 'Marcos', 'Nacho', 'Romina', 'Walter'];

const initialRows = participants.map(participant => ({ participant, firstPlace: '', secondPlace: ''}));

function App() {
/*
  const [rows, setRows] = useState(initialRows);
  const [counts, setCounts] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedIndexF, setSelectedIndexF] = useState(-1);
  const [fulminado, setFulminado] = useState('');
*/

  const [rows, setRows] = useState(localStorage.getItem('rows') ? JSON.parse(localStorage.getItem('rows')) : initialRows);
  const [counts, setCounts] = useState(localStorage.getItem('counts') ? JSON.parse(localStorage.getItem('counts')) : {});
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedIndexF, setSelectedIndexF] = useState(-1);
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
  }, [rows, fulminado]);

  const handleFirstPlaceChange = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].firstPlace = value;
    setRows(updatedRows);
    localStorage.setItem('rows', JSON.stringify(rows));
    localStorage.setItem('counts', JSON.stringify(counts));
    localStorage.setItem('fulminado', fulminado);  
  };
  
  const handleSecondPlaceChange = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].secondPlace = value;
    setRows(updatedRows);
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
    setFulminado(updatedRows[index].firstPlace)
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
    localStorage.removeItem("rows");
    localStorage.removeItem("counts");
    localStorage.removeItem("fulminado");
    window.location.reload();
  }

  function handleCheckboxClick() {
    setIsChecked(!isChecked);
  }

  function handleCheckboxClickF() {
    setIsCheckedF(!isCheckedF);
  }

  const estiloPlacaDeNominados = {
    marginTop: "20px",
    marginBottom: "10px"
  }
  const estiloFueraDePlaca = {
    marginTop: "20px",
    marginBottom: "10px"
  }
  const estiloBotonReiniciar = {
    marginTop: "40px",
    marginBottom: "20px",
    float: "right"
    }

    function copyScreenshotPlaca() {
      domtoimage.toBlob(document.getElementById('screenPlaca'))
        .then(function (blob) {
            navigator.clipboard.write([new ClipboardItem({'image/png': blob})]);
        });
        alert("Se ha guardado una captura de pantalla con la placa de nominados.");
    }
    
    function copyScreenshotDetalleVotos() {
      domtoimage.toBlob(document.getElementById('screenDetalleVotos'))
        .then(function (blob) {
            navigator.clipboard.write([new ClipboardItem({'image/png': blob})]);
        });
        alert("Se ha guardado una captura de pantalla con el detalle de votos.");
    }

return (
  <div className="GeneralFont">
  
  <header className="App-header">
    <Container>
      <Row className="d-flex align-items-center justify-content-center">
        <Col xs={1} className="mx-auto align-items-right">
          <img src={gh} alt={""} width="40px" height="40px"/>
        </Col>
        <Col xs={10}>
          <div class="col10-class">
            <h3 class="title-word-class">
              <span class="title-word">GRAN</span>&nbsp;&nbsp;
              <span class="title-word second-word">HERMANO</span>
            </h3>
          </div>
        </Col>
      </Row>
    </Container>
  </header>

    <Container id="screenDetalleVotos">
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
    
    <Container id="screenPlaca" className="whiteBackground">
      <Row>
        <Col xs={6}>
          <h6 className="placaNominados" style={estiloPlacaDeNominados}>PLACA DE NOMINADOS</h6>
            <ListGroup>
            <ListGroup.Item>
            {fulminado === '' ? null : fulminado + " (Fulm.)"}
            {sortedEntries.map(([participant, count], index) => (
            <div key={participant}>
              {index < 4 || count >= fourthCount ? participant + ": " + count : null}
            </div>
            ))}
            </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col xs={6}>
            <h6 className="fueraDePlaca" style={estiloFueraDePlaca}>FUERA DE PLACA</h6>
            <ListGroup>
            <ListGroup.Item>
            {sortedEntries.map(([participant, count], index) => (
            <div key={participant}>
              {index < 4 || count >= fourthCount ? null : participant + ": " + count}
            </div>
            ))}
            </ListGroup.Item>
            </ListGroup>
        </Col>
      </Row>
    </Container>

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
    <Col xs={3}>
      <Button style={estiloBotonReiniciar} onClick={copyScreenshotPlaca} type="submit" className="custom-class-screenshotPlaca">Placa</Button>
    </Col>
    <Col xs={3}>
    {/*<Button style={estiloBotonReiniciar} onClick={copyScreenshotDetalleVotos} type="submit" className="custom-class-screenshotVotos">Votos</Button>*/}
    </Col>
    <Col xs={6}>
      <Button style={estiloBotonReiniciar} onClick={() => setIsConfirming(true)} className="btn btn-danger">↺</Button>
    </Col>
  </Row>
</Container>
    
  </div>
);
}  
export default App;