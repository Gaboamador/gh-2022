import React, { useState, useEffect } from 'react';
import './App.css';
import {Button, Row, Col, Container, ListGroup} from 'react-bootstrap';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';

const ContadorFinal = ({ words: initialWords }) => {

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

useEffect(() => {
        localStorage.setItem('words', JSON.stringify(words));
        localStorage.setItem('names', JSON.stringify(names));
        localStorage.setItem('lastClicked', lastClicked);
        localStorage.setItem('extraOccurrenceCount', extraOccurrenceCount);
}, [words, names, lastClicked, extraOccurrenceCount]);

    const namesOptions = ['Agustín', 'Ariel', 'Camila', 'Daniela', 'Julieta', 'Lucila', 'Marcos', 'Maximiliano', 'Nacho', 'Romina', 'Thiago', 'Walter'];

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
  }
}

const toggleExtraOccurrence = () => {
    setAddExtraOccurrence(!addExtraOccurrence);
  }

const [isConfirming, setIsConfirming] = useState(false);
  const handleReset = () => {
    setWords([]);
    setNames([]);
    setLastClicked('');
    setExtraOccurrenceCount('');
    localStorage.removeItem("words");
    localStorage.removeItem("names");
    localStorage.removeItem("lastClicked");
    localStorage.removeItem("extraOccurrenceCount");
  }

const estiloSeleccionarVotanteGroupItem = {
  marginTop: "10px",
  marginBottom: "10px",
}
const estiloSeleccionarVotante = {
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
  marginTop: "10px",
  
}
const estiloBotonesYSelecJug = {
  marginTop: "10px",
  marginBottom: "10px",
}
const estiloDetalleDeVotos = {
  marginTop: "10px",
  marginBottom: "10px",
  marginRight: "10px",
  marginLeft: "10px"
}
const estiloBotonReiniciar = {
    marginTop: "20px",
    marginBottom: "10px",
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

  
return (
<div>

<Container>
  <Row>
    <Col xs={6}>
      <ListGroup>
      <ListGroup.Item style={estiloSeleccionarVotanteGroupItem}>
        <h6 className="seleccionarVotante" style={estiloSeleccionarVotante}>SELECCIONAR VOTANTE</h6>
          <Form style={estiloListaJugadoresRadio}>
            {namesOptions.map((option) => (
                <Form.Check 
                    key={option}
                    type="radio"
                    value={option}
                    name={option}
                    label={option}
                    disabled={namesCount[option]>=3}
                    checked={newName === option}
                    onClick={() => setNewName(option)}
                />
            ))}
          </Form>
          </ListGroup.Item>
      </ListGroup>
    </Col>

    <Col xs={6}>
      <ListGroup style={estiloPlacaNominadosyFueraDePlaca}>
        <h6 className="placaNominados" style={estiloPlacaDeNominados}>PLACA DE NOMINADOS</h6>
          <ListGroup.Item>
            <div>
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
    <Col xs={6}> {/*BOTONES*/}
      <ButtonToolbar aria-label="Toolbar with button groups">
        <ButtonGroup className="me-2" aria-label="First group">
          <Button onClick={handleSubmitTwo} type="submit" className="btn btn-primary">1°</Button>
          <Button onClick={handleSubmitOne} type="submit" className="btn btn-secondary">2°</Button>
        </ButtonGroup>
        <ButtonGroup className="me-2" aria-label="Second group">
          <Button onClick={handleUndo} className="btn btn-warning">⎌</Button>
        </ButtonGroup>
      </ButtonToolbar>
    </Col>
    <Col xs={6}> {/*SELECCIONAR JUGADOR*/}
      <Form.Select value={newWord} onChange={handleChange}>
        <option>Selecc. jugador</option>
        {namesOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}      
      </Form.Select>
    </Col>
  </Row>      
</Container>

<ColoredLine color= "#C338DD" />

<Container> {/*LISTA DETALLE VOTOS*/}
  <Row>
    <ListGroup className="col10-class">
      <h6 style={estiloDetalleDeVotos}>DETALLE DE VOTOS</h6>
        <ListGroup.Item>
          <dl>
            {names.map((name, index) => (
            <li key={index}>{name}: {words[index]}</li>
            ))}
          </dl>
        </ListGroup.Item>
    </ListGroup>
  </Row>
</Container>

<Container> {/*BOTÓN REINICIAR*/}
  <Row>
    <>
      {isConfirming && (
        <div className="precaucion" style={estiloBotonReiniciar}>
        <h6>Esta acción eliminará todos los datos cargados. ¿Proceder?</h6>
              <Button onClick={() => {handleReset(); setIsConfirming(false)}} variant="outline-danger">Sí</Button>{' '}
              <Button onClick={() => setIsConfirming(false)} variant="outline-dark">No</Button>{' '}
        </div>
      )}
    <Button style={estiloBotonReiniciar} onClick={() => setIsConfirming(true)} className="btn btn-danger">Reiniciar formulario</Button>
    </>
  </Row>
</Container>

</div>

  );
};

export default ContadorFinal;