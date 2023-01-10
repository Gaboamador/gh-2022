import React, { useState, useEffect } from 'react';
import {Button, Row, Col, Container} from 'react-bootstrap';
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

const NuevaLista3 = ({ words: initialWords }) => {
    const [words, setWords] = useState(initialWords);
    const [newWord, setNewWord] = useState('');
    const [newName, setNewName] = useState('');
    const [names, setNames] = useState([]);
    const [addExtraOccurrence, setAddExtraOccurrence] = useState(false);
    const [extraOccurrenceCount, setExtraOccurrenceCount] = useState(0);
    const [lastClicked, setLastClicked] = useState("");
  

  const namesOptions = ['Agustín', 'Alexis', 'Ariel', 'Camila', 'Daniela', 'Julieta', 'Lucila', 'Marcos', 'Maximiliano', 'Nacho', 'Romina', 'Thiago', 'Walter'];

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
      setNewName('');
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


  const wordCounts = countWords(words);
  const sortedWords = Object.keys(wordCounts).sort((a, b) => wordCounts[b] - wordCounts[a]);
  const fourthWordCount = sortedWords.length > 3 ? wordCounts[sortedWords[3]] : 0;

  
  return (
    <div>

      <Form.Select id='newName' value={newName} onChange={event => setNewName(event.target.value)} defaultValue={newName}>
      <option>Votante</option>
      {namesOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}      
      </Form.Select>

        <p></p>

      <Form.Select value={newWord} onChange={handleChange}>
      <option>Seleccionar jugador</option>
      {namesOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}      
      </Form.Select>

      <p></p>
      
      {/*BOTÓN PRIMER LUGAR*/}
      <Button onClick={handleSubmitTwo} type="submit" className="btn btn-primary">Primer Lugar</Button>
      
      <p></p>
      
      {/*BOTÓN SEGUNDO LUGAR*/}
      <Button onClick={handleSubmitOne} type="submit" className="btn btn-secondary">Segundo Lugar</Button>
            
      <p></p>

      {/*BOTÓN DESHACER*/}
      <Button onClick={handleUndo} className="btn btn-light">Deshacer</Button>
      
      <p></p>
      
      {/*CHECK ESPONTÁNEA*/}
      <div>
      <Form>
        <Form.Check 
        type="switch"
        id="custom-switch"
        checked={addExtraOccurrence}
        onChange={toggleExtraOccurrence}
        disabled={extraOccurrenceCount >= 2}
        label="Espontánea"
        />
      </Form>
      </div>
      
      
      <p></p>
      
      <div>
        <h4 className="titulo">Placa Nominados</h4>
      {sortedWords.map((word, index) => (
            <div
            key={word}
            style={{ backgroundColor: index < 4 || wordCounts[word] === fourthWordCount ? '#86b7fe' : 'transparent' }}
          >
            {word}: {wordCounts[word]}
          </div>
        ))}
      </div>   
        <p></p>
      <h5>Votaciones</h5>
      <ul>
        {names.map((name, index) => (
          /*<li key={index}>{name}: {words[index]}</li>*/
          <li key={index}>{name}: {words[index]}</li>
        ))}
      </ul>

    </div>
  );
};

export default NuevaLista3;

