import React, { useState } from 'react';
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

const ContadorDoble = ({ words: initialWords }) => {
  const [words, setWords] = useState(initialWords);
  const [newWord, setNewWord] = useState('');
  const [addExtraOccurrence, setAddExtraOccurrence] = useState(false);
  const [extraOccurrenceCount, setExtraOccurrenceCount] = useState(0);

  const namesOptions = ['Agustín', 'Alexis', 'Ariel', 'Camila', 'Daniela', 'Julieta', 'Lucila', 'Marcos', 'Maximiliano', 'Nacho', 'Romina', 'Thiago', 'Walter'];

  const handleChange = event => {
    setNewWord(event.target.value);
  }

  const handleSubmitOne = event => {
    event.preventDefault();
    if (newWord) {
      setWords([...words, newWord, ...(addExtraOccurrence && extraOccurrenceCount < 2 ? [newWord] : [])]);
      setNewWord(event.target.value);
      if (addExtraOccurrence && extraOccurrenceCount < 2) {
        setExtraOccurrenceCount(extraOccurrenceCount + 1);
      }
    }
  }

  const handleSubmitTwo = event => {
    event.preventDefault();
    if (newWord) {
      setWords([...words, newWord, newWord, ...(addExtraOccurrence && extraOccurrenceCount < 2 ? [newWord] : [])]);
      setNewWord(event.target.value);
      if (addExtraOccurrence && extraOccurrenceCount < 2) {
        setExtraOccurrenceCount(extraOccurrenceCount + 1);
      }
    }
  }

  const handleUndo = () => {
    setWords(words.slice(0, -1));
  }

  const toggleExtraOccurrence = () => {
    setAddExtraOccurrence(!addExtraOccurrence);
  }

  const wordCounts = countWords(words);
  const sortedWords = Object.keys(wordCounts).sort((a, b) => wordCounts[b] - wordCounts[a]);
  const fourthWordCount = sortedWords.length > 3 ? wordCounts[sortedWords[3]] : 0;

  return (
    <div>

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
        <h4>Placa Nominados</h4>
      {sortedWords.map((word, index) => (
            <div
            key={word}
            style={{ backgroundColor: index < 4 || wordCounts[word] === fourthWordCount ? '#86b7fe' : 'transparent' }}
          >
            {word}: {wordCounts[word]}
          </div>
        ))}
      </div>   
    
    </div>
  );
};

export default ContadorDoble;