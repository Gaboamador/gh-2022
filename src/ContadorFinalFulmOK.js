import React, { useState, useEffect } from 'react';
import './App.css';
import {Button, Row, Col, Container, ListGroup} from 'react-bootstrap';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import domtoimage from 'dom-to-image';

const ContadorFinalFulmOK = ({ words: initialWords }) => {

const countWords = words => {
        const counts = {};
        words.forEach(word => {
          if (counts[word]) {
            counts[word] += 1;
          } else {
            counts[word] = 1;
          }
        });
        return counts;
}

    const [words, setWords] = useState(localStorage.getItem('words') ? JSON.parse(localStorage.getItem('words')) : initialWords);
    const [names, setNames] = useState(localStorage.getItem('names') ? JSON.parse(localStorage.getItem('names')) : []);
    const [newWord, setNewWord] = useState('');
    const [newName, setNewName] = useState('');
    const [addExtraOccurrence, setAddExtraOccurrence] = useState(false);
    const [extraOccurrenceCount, setExtraOccurrenceCount] = useState(localStorage.getItem('extraOccurrenceCount') || '');
    const [lastClicked, setLastClicked] = useState(localStorage.getItem('lastClicked') || '');
    const [fulminado, setFulminado] = useState(localStorage.getItem('fulminado') || '');
    const [fulminador, setFulminador] = useState(localStorage.getItem('fulminador') || '');

useEffect(() => {
        localStorage.setItem('words', JSON.stringify(words));
        localStorage.setItem('names', JSON.stringify(names));
        localStorage.setItem('lastClicked', lastClicked);
        localStorage.setItem('extraOccurrenceCount', extraOccurrenceCount);
        localStorage.setItem('fulminado', fulminado);
        localStorage.setItem('fulminador', fulminador);
}, [words, names, lastClicked, extraOccurrenceCount, fulminado, fulminador]);

    const namesOptions = ['Agustín', 'Ariel', 'Camila', 'Daniela', 'Julieta', 'Lucila', 'Marcos', 'Nacho', 'Romina', 'Walter'];

    const namesCount = countWords(names);
    const wordCounts = countWords(words);
    const sortedWords = Object.keys(wordCounts).sort((a, b) => wordCounts[b] - wordCounts[a]);
    const fourthWordCount = sortedWords.length > 3 ? wordCounts[sortedWords[3]] : 0;

const handleChange = event => {
    setNewWord(event.target.value);
    }

const handleSubmitOne = event => {
    event.preventDefault();
    if (newWord && newName) {
      setWords([...words, newWord, ...(addExtraOccurrence && extraOccurrenceCount < 2 ? [newWord] : [])]);
      setNames([...names, newName, ...(addExtraOccurrence && extraOccurrenceCount < 2 ? [newName] : [])]);
      setNewWord('');
      setNewName('');
      setLastClicked('One');
      if (addExtraOccurrence && extraOccurrenceCount < 2) {
        setExtraOccurrenceCount(extraOccurrenceCount + 1);
      }
    }
}

const handleSubmitTwo = event => {
    event.preventDefault();
    if (newWord && newName) {
      setWords([...words, newWord, newWord, ...(addExtraOccurrence && extraOccurrenceCount < 2 ? [newWord] : [])]);
      setNames([...names, newName, newName, ...(addExtraOccurrence && extraOccurrenceCount < 2 ? [newName] : [])]);
      setNewWord('');
      setNewName(newName);
      setLastClicked('Two');
      if (addExtraOccurrence && extraOccurrenceCount < 2) {
        setExtraOccurrenceCount(extraOccurrenceCount + 1);
      }
    }
  }
  

const handleUndo = () => {
  if (lastClicked === 'One') {
    setWords(words.slice(0, -1));
    setNames(names.slice(0, -1));
  } else if (lastClicked === 'Two') {
    setWords(words.slice(0, -2));
    setNames(names.slice(0, -2));
  } else if (lastClicked === 'Fulminante') {
    setFulminado('');
    setFulminador('');
  }
}

const toggleExtraOccurrence = () => {
    setAddExtraOccurrence(!addExtraOccurrence);
  }

  const handleFulminado = (jugadorFulminado) => {
    setFulminado(jugadorFulminado);
    setLastClicked('Fulminante');
}

const handleFulminador = newName => {
  if (newWord && newName) {
  setFulminador([newName]);
  }
  };
  

const [isConfirming, setIsConfirming] = useState(false);
  const handleReset = () => {
    setWords([]);
    setNames([]);
    setLastClicked('');
    setExtraOccurrenceCount('');
    setFulminado('');
    setFulminador('');
    localStorage.removeItem("words");
    localStorage.removeItem("names");
    localStorage.removeItem("lastClicked");
    localStorage.removeItem("extraOccurrenceCount");
    localStorage.removeItem("fulminado");
    localStorage.removeItem("fulminador");
  }

const estiloSeleccionarVotanteGroupItem = {
  marginBottom: "10px",
}
const estiloSeleccionarVotante = {
  marginTop: "10px",
  marginBottom: "10px"
}
const estiloListaJugadoresRadio = {
  marginTop: "0px",
  marginBottom: "0px",
  marginRight: "0px",
  marginLeft: "0px"
}
const estiloPlacaNominadosyFueraDePlaca = {
  marginTop: "10px",
  marginBottom: "10px",
}
const estiloPlacaDeNominados = {
  marginBottom: "10px",
}
const estiloFueraDePlaca = {
  marginTop: "30px",
  marginBottom: "10px"
}
const estiloEspontanea = {
  marginBotton: "10px",
}
const estiloBotonesYSelecJug = {
  marginTop: "10px",
  marginBottom: "10px",
}
const estiloBotones1y2Lugar = {
  marginTop: "20px",
  marginBottom: "10px",
}
const estiloBotonesDeshacerYFulminante = {
  marginTop: "20px",
  marginBottom: "30px",
}
const estiloBotones = {
  marginRight: "10px",
  marginLeft: "10px"
}
const estiloBotonReiniciar = {
    marginTop: "40px",
    marginBottom: "20px",
    float: "right"
    }

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5,
            marginTop: "20px",
            marginBottom: "20px"
        }}
    />
);

const namesData = {};
names.forEach((name, index) => {
    if (!namesData[name]) {
        namesData[name] = {
            name: name,
            words: {
                [words[index]]: 1
            }
        }
    } else {
        if (!namesData[name]['words'][words[index]]) {
            namesData[name]['words'][words[index]] = 1
        } else {
            namesData[name]['words'][words[index]] += 1
        }
    }
});

const rows = Object.keys(namesData).map(name => {
    return (
        <Row key={name}>
            <Col>{name}</Col>
            {Object.keys(namesData[name]['words']).map(word => {
                return (
                    <Col key={word}>
                        {word} ({namesData[name]['words'][word]})
                    </Col>
                )
            })}
        </Row>
    );
});

const containerClass = "container";
const rowClass = "row rounded-borders";
const colClass = "col";


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

<Container>
  <Row>
    <Col xs={6}>
      <ListGroup>
      <h6 className="seleccionarVotante" style={estiloSeleccionarVotante}>SELECC. VOTANTE</h6>
      <ListGroup.Item style={estiloSeleccionarVotanteGroupItem}>
        
          <Form style={estiloListaJugadoresRadio}>
            {namesOptions.map((option) => (
                <Form.Check 
                    key={option}
                    type="radio"
                    value={option}
                    name={option}
                    label={option}
                    disabled={namesCount[option]>=3 || fulminador.includes(option)}
                    checked={newName === option}
                    onClick={() => setNewName(option)}
                />
            ))}
          </Form>
          </ListGroup.Item>
      </ListGroup>
    </Col>

    <Col xs={6} id="screenPlaca" className="whiteBackground">
      <ListGroup style={estiloPlacaNominadosyFueraDePlaca} id="text-to-copy">
        <h6 className="placaNominados" style={estiloPlacaDeNominados}>PLACA DE NOMINADOS</h6>
          <ListGroup.Item>
            <div>
            {fulminado === '' ? null : fulminado + " (Fulm.)"}
            {sortedWords.map((word, index) => {
            const count = wordCounts[word];
            return (
                <div key={word}>
                {index < 4 || count === fourthWordCount ? [word] + ": " + wordCounts[word] : null}
                </div>
                    )
                })}
            </div>
          </ListGroup.Item>
          
        <h6 className="fueraDePlaca" style={estiloFueraDePlaca}>FUERA DE PLACA</h6>
          <ListGroup.Item>
            <div>
            {sortedWords.map((word, index) => {
            const count = wordCounts[word];
            return (
                <div key={word}>
                {index < 4 || count === fourthWordCount ? null : [word] + ": " + wordCounts[word]}                
              </div>
                  )
              })}
            </div>
          </ListGroup.Item>
      </ListGroup>
    </Col>
  </Row>
</Container>

<Container> {/*CHECK ESPONTÁNEA*/}
    <Row>
      <div>
      <Form>
        <Form.Check style={estiloEspontanea}
        type="switch"
        id="custom-switch"
        checked={addExtraOccurrence}
        onChange={toggleExtraOccurrence}
        disabled={extraOccurrenceCount >= 2}
        label="ESPONTÁNEA"
        />
      </Form>
      </div>
    </Row>
</Container>

<Container style={estiloBotonesYSelecJug}> {/*BOTONES + SELECCIONAR JUGADOR*/}
  <Row>
    <Col xs={12} className="text-center"> {/*SELECCIONAR JUGADOR*/}
      <Form.Select value={newWord} onChange={handleChange}>
        <option>Seleccionar jugador votado</option>
        {namesOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}      
      </Form.Select>
    </Col>    
    
  </Row>
</Container>

<Container style={estiloBotones1y2Lugar}> {/*BOTONES 1 y 2 LUGAR*/}
  <Row>
    <Col className="d-flex justify-content-center align-items-center" size={12}> {/*BOTONES*/}
      <ButtonToolbar aria-label="Toolbar with button groups">
        <ButtonGroup className="me-2" aria-label="First group">
          <Button onClick={handleSubmitTwo} type="submit" className="custom-class-1erlugar">Primer Lugar</Button>
          <Button onClick={handleSubmitOne} type="submit" className="custom-class-2dolugar">Segundo Lugar</Button>
        </ButtonGroup>
      </ButtonToolbar>
    </Col>
  </Row>      
</Container>

<Container style={estiloBotonesDeshacerYFulminante}> {/*BOTONES DESHACER Y FULMINANTE*/}
  <Row>
    <Col xs={6} className="d-flex justify-content-center"> {/*DESHACER*/}  
      <Button style={estiloBotones} onClick={handleUndo} className="custom-class-deshacer">Deshacer</Button>
    </Col>
    <Col xs={6} className="d-flex justify-content-center"> {/*FULMINANTE*/}  
      <Button style={estiloBotones} onClick={() => {handleFulminado(newWord); handleFulminador(newName);}} className="custom-class-fulminante">Fulminante</Button>
    </Col>
  </Row>
</Container>

<Container className={`${containerClass} whiteBackground`} id="screenDetalleVotos"> {/*LISTA DETALLE VOTOS*/}
      <Row>
        <Col className="detalleDeVotos">DETALLE &nbsp; &nbsp; DE &nbsp; &nbsp; VOTOS</Col>
      </Row>
      
      <Row>
        <Col className='tituloTablaDetalleVotosJugador' xs={4}>JUGADOR</Col>
        <Col className='tituloTablaDetalleVotos1erLugar' xs={4}>PRIMER L.</Col>
        <Col className='tituloTablaDetalleVotos2doLugar' xs={4}>SEGUNDO L.</Col>
      </Row>
      
      <Row className={rowClass}>
      {fulminado === '' ? null : fulminador === '' ? (
      <>
        <Col xs={4}></Col>
        <Col>{fulminado} (Fulm.)</Col>
        <Col>-</Col>
      </>
      ) : (
      <>
        <Col className="columnaJugadoresNegrita" xs={4}>{fulminador}</Col>
        <Col>{fulminado} (Fulm.)</Col>
        <Col>-</Col>
      </>
      )}
      </Row>

      {Object.keys(namesData).map(name => {
            return (
                <Row key={name} className={`${rowClass} ${Object.keys(namesData[name]['words']).map(word => namesData[name]['words'][word]).includes(3) ? 'highlight-bg' : ''}`}>
                    <Col xs={4} className="columnaJugadoresNegrita">{name}</Col>
                    {Object.keys(namesData[name]['words']).map((word, index) => {
                        return (
                            <Col key={word} className={colClass}>
                                {word} {/* *esto comentado muestra entre paréntesis la cantidad de votos ->* ({namesData[name]['words'][word]}) */}
                            </Col>
                        )
                    })}
                </Row>
            );
        })}
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
    <Button style={estiloBotonReiniciar} onClick={copyScreenshotDetalleVotos} type="submit" className="custom-class-screenshotVotos">Votos</Button>
    </Col>
    <Col xs={6}>
      <Button style={estiloBotonReiniciar} onClick={() => setIsConfirming(true)} className="btn btn-danger">↺</Button>
    </Col>
  </Row>
</Container>

</div>

  );
};

export default ContadorFinalFulmOK;