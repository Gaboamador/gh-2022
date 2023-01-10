import React, { useState, useEffect } from 'react';
import {Button, Row, Col, Container, ListGroup} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

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

const NuevaLista4 = ({ words: initialWords }) => {

    const [words, setWords] = useState(localStorage.getItem('words') ? JSON.parse(localStorage.getItem('words')) : initialWords);
    const [names, setNames] = useState(localStorage.getItem('names') ? JSON.parse(localStorage.getItem('names')) : []);

    /*const [words, setWords] = useState(initialWords);*/
    const [newWord, setNewWord] = useState('');
    const [newName, setNewName] = useState('');
    /*const [names, setNames] = useState([]);*/
    const [addExtraOccurrence, setAddExtraOccurrence] = useState(false);
    /*const [extraOccurrenceCount, setExtraOccurrenceCount] = useState(0);*/
    const [extraOccurrenceCount, setExtraOccurrenceCount] = useState(localStorage.getItem('extraOccurrenceCount') || '');
    const [lastClicked, setLastClicked] = useState(localStorage.getItem('lastClicked') || '');
    /*const [lastClicked, setLastClicked] = useState("");*/

    useEffect(() => {
        localStorage.setItem('words', JSON.stringify(words));
        localStorage.setItem('names', JSON.stringify(names));
        localStorage.setItem('lastClicked', lastClicked);
        localStorage.setItem('extraOccurrenceCount', extraOccurrenceCount);
        }, [words, names, lastClicked, extraOccurrenceCount]);

  const namesOptions = ['Agustín', 'Ariel', 'Camila', 'Daniela', 'Julieta', 'Lucila', 'Marcos', 'Maximiliano', 'Nacho', 'Romina', 'Thiago', 'Walter'];

 /*PRUEBA DE CÓDIGO NUEVO*/ 
  const [selectedOptions, setSelectedOptions] = useState({});
  const handleOptionChange = (event) => {
      const {name, checked} = event.target;
      setSelectedOptions(prevSelectedOptions => ({
          ...prevSelectedOptions,
          [name]: checked,
      }));
  };
  
  const options = ['Agustín', 'Alexis', 'Ariel', 'Camila', 'Daniela', 'Julieta', 'Lucila', 'Marcos', 'Maximiliano', 'Nacho', 'Romina', 'Thiago', 'Walter'];
  const namesCount = countWords(names);
/*PRUEBA DE CÓDIGO NUEVO*/




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

const buttonStyle = {
    marginRight: "20px",
    marginBottom: "20px"
  }
  
const formStyle = {
    marginTop: "10px",
    marginBottom: "10px",
    marginRight: "10px",
    marginLeft: "10px"
  }

  const formSelectStyle = {
    marginTop: "10px",
    marginBottom: "20px"
  }

  const wordCounts = countWords(words);
  const sortedWords = Object.keys(wordCounts).sort((a, b) => wordCounts[b] - wordCounts[a]);
  const fourthWordCount = sortedWords.length > 3 ? wordCounts[sortedWords[3]] : 0;


  
  return (
<div>
{/*
<Container>
{options.map((option) => (
        <Form.Check 
            key={option}
            type="checkbox"
            label={option}
            name={option}
            disabled={namesCount[option]>=4}
            checked={selectedOptions[option] || false}
            onChange={handleOptionChange}
        />
    ))}
</Container>

<Container>
{namesOptions.map((option) => (
        <Form.Check 
            key={option}
            type="radio"
            label={option}
            name={option}
            disabled={namesCount[option]>=4}
            checked={selectedOptions[option] || false}
            onChange={handleOptionChange}
            
        />
    ))}
</Container>
*/}
<Container style={formStyle}>
<Row>
<Col xs={6}>
<ListGroup>
<Form style={formStyle}><h6 className="titulo3" style={buttonStyle}>Seleccionar emisor del voto</h6>
      {['radio'].map((type) => (
        <div id="nameForm" value={newName} onChange={event => setNewName(event.target.value)} key={`inline-${type}`} className="mb-0">
          <Form.Check 
            inline
            value="Agustín"
            label="Agustín"
            name="group1"
            type={type}
            id={`inline-${type}-1`}
            disabled={namesCount["Agustín"]>=3}
          />
          <Form.Check
            inline
            label="Ariel"   
            value="Ariel"
            name="group1"
            type={type}
            id={`inline-${type}-2`}
            disabled={namesCount["Ariel"]>=3}
          />
          <Form.Check
            inline
            label="Camila"
            value="Camila"
            name="group1"
            type={type}
            id={`inline-${type}-3`}
            disabled={namesCount["Camila"]>=3}
          />
          <Form.Check
            inline
            label="Daniela"
            value="Daniela"
            name="group1"
            type={type}
            id={`inline-${type}-4`}
            disabled={namesCount["Daniela"]>=3}
          />
          <Form.Check
            inline
            label="Julieta"
            value="Julieta"
            name="group1"
            type={type}
            id={`inline-${type}-5`}
            disabled={namesCount["Julieta"]>=3}
          />
          <Form.Check
            inline
            label="Lucila"
            value="Lucila"
            name="group1"
            type={type}
            id={`inline-${type}-6`}
            disabled={namesCount["Lucila"]>=3}
          />
          <Form.Check
            inline
            label="Marcos"
            value="Marcos"
            name="group1"
            type={type}
            id={`inline-${type}-7`}
            disabled={namesCount["Marcos"]>=3}
          />
          <Form.Check
            inline
            label="Maximiliano"
            value="Maximiliano"
            name="group1"
            type={type}
            id={`inline-${type}-8`}
            disabled={namesCount["Maximiliano"]>=3}
          />
          <Form.Check
            inline
            label="Nacho"
            value="Nacho"
            name="group1"
            type={type}
            id={`inline-${type}-9`}
            disabled={namesCount["Nacho"]>=3}
          />
          <Form.Check
            inline
            label="Romina"
            value="Romina"
            name="group1"
            type={type}
            id={`inline-${type}-10`}
            disabled={namesCount["Romina"]>=3}
          />
          <Form.Check
            inline
            label="Thiago"
            value="Thiago"
            name="group1"
            type={type}
            id={`inline-${type}-11`}
            disabled={namesCount["Thiago"]>=3}
          />
          <Form.Check
            inline
            label="Walter"
            value="Walter"
            name="group1"
            type={type}
            id={`inline-${type}-12`}
            disabled={namesCount["Walter"]>=3}
          />
        </div>
      ))}
    </Form>
    </ListGroup>
</Col>

<Col xs={6}>
<h6>PLACA DE NOMINADOS</h6>
<ListGroup>
          <ListGroup.Item>
          <div>
    {sortedWords.map((word, index) => {
        const count = wordCounts[word];
        return (
            <div key={word}>
                
                {/*CON IMÁGENES
                {index < 4 || count === fourthWordCount ? <img src={`./${word}.jpg`} alt={word} width="64px" height="64px"/> : null}
                */}
                
                {/*SIN IMÁGENES*/}
                {index < 4 || count === fourthWordCount ? [word] : null}

            </div>
        )
    })}
</div>
          </ListGroup.Item>
</ListGroup>
</Col>    

</Row>
</Container>


<Container> {/*DESPLEGABLES NOMBRES*/}
{/*
    <Row>
        <Form.Select style={buttonStyle} value={newName} onChange={event => setNewName(event.target.value)}>
        <option>Votante</option>
        {namesOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}      
        </Form.Select>
    </Row>
*/}
    <Row>
      <Form.Select style={formSelectStyle} value={newWord} onChange={handleChange}>
        <option>Seleccionar jugador votado</option>
        {namesOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}      
        </Form.Select>
    </Row>      
</Container>

<Container> {/*PRIMERA FILA DE BOTONES*/}
    <Row>
        <Col xs={6}>
            <Button style={buttonStyle} onClick={handleSubmitTwo} type="submit" className="btn btn-primary">Primer Lugar</Button>
        </Col>
        <Col xs={6}>
            <Button style={buttonStyle} onClick={handleUndo} className="btn btn-light">Deshacer acción</Button>
        </Col>
    </Row>
</Container>

<Container> {/*SEGUNDA FILA DE BOTONES*/}
    <Row>
        <Col xs={6}>
        <Button style={buttonStyle} onClick={handleSubmitOne} type="submit" className="btn btn-secondary">Segundo Lugar</Button>
        </Col>
        <Col xs={6}>
            <Button style={buttonStyle} onClick={handleReset} className="btn btn-danger">Reiniciar</Button>
        </Col>
    </Row>
</Container>
      
<Container> {/*CHECK ESPONTÁNEA*/}
    <Row>
      <div>
      <Form>
        <Form.Check style={buttonStyle}
        type="switch"
        id="custom-switch"
        checked={addExtraOccurrence}
        onChange={toggleExtraOccurrence}
        disabled={extraOccurrenceCount >= 2}
        label="Espontánea"
        />
      </Form>
      </div>
    </Row>
</Container>

<Container>
<Row>
    <Col xs={6}> {/*LISTA PLACA DE NOMINADOS*/}
        <ListGroup>
          <ListGroup.Item>
          <h4 className="titulo">Votos totales</h4>
        {sortedWords.map((word, index) => (
            <div
            key={word}
            style={{ backgroundColor: index < 4 || wordCounts[word] === fourthWordCount ? '#86b7fe' : 'transparent' }}
          >
            {word}: {wordCounts[word]}
          </div>
            ))}
            </ListGroup.Item>
        </ListGroup>
    </Col>

    <Col xs={6}> {/*LISTA VOTACIONES*/}
        <h5>Votaciones</h5>
        <dl>
        {names.map((name, index) => (
          <li key={index}>{name}: {words[index]}</li>
        ))}
        </dl>
        </Col>
</Row>
</Container>

</div>

  );
};

export default NuevaLista4;

