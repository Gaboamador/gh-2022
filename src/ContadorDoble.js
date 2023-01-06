import React, { useState } from 'react';
import {Button, Row, Col, Container} from 'react-bootstrap';

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
  const [newWord, setNewWord] = useState("Agustín");
  const [addExtraOccurrence, setAddExtraOccurrence] = useState(false);

  const handleChange = event => {
    setNewWord(event.target.value);
  }

  const handleSubmitOne = event => {
    event.preventDefault();
    if (newWord) {
    setWords([...words, newWord, ...(addExtraOccurrence ? [newWord] : [])]);
    setNewWord(event.target.value);
  }
}

  const handleSubmitTwo = event => {
    event.preventDefault();
    if (newWord) {
    setWords([...words, newWord, newWord, ...(addExtraOccurrence ? [newWord] : [])]);
    setNewWord(event.target.value);
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
    <div style={{ justifyContent: 'space-between' }}>
      <form onSubmit={handleSubmitTwo}>
        <label>
        <select value={newWord} onChange={handleChange}>
            <option value="Agustín">Agustín</option>
            <option value="Alexis">Alexis</option>
            <option value="Ariel">Ariel</option>
            <option value="Camila">Camila</option>
            <option value="Daniela">Daniela</option>
            <option value="Julieta">Julieta</option>
            <option value="Lucila">Lucila</option>
            <option value="Marcos">Marcos</option>
            <option value="Maximiliano">Maximiliano</option>
            <option value="Nacho">Nacho</option>
            <option value="Romina">Romina</option>
            <option value="Thiago">Thiago</option>
            <option value="Walter">Walter</option>
          </select>
        </label>
        <Button type="submit" className="btn btn-primary">Primer Lugar</Button>
      </form>
      <p></p>
      <form onSubmit={handleSubmitOne}>
        <Button type="submit" className="btn btn-secondary">Segundo Lugar</Button>
      </form>
      <p></p>
      <Button onClick={handleUndo} className="btn btn-light">Deshacer</Button>
      <p></p>
      <div>
        <label>
        <input type="checkbox" checked={addExtraOccurrence} onChange={toggleExtraOccurrence} />
        Espontánea
        </label>
      </div>
      
      <div>
      {sortedWords.map((word, index) => (
            <div
            key={word}
            style={{ color: index < 4 || wordCounts[word] === fourthWordCount ? 'red' : 'black' }}
          >
            {word}: {wordCounts[word]}
          </div>
        ))}
      </div>
      

{/*ACÁ DEBERÍA IR LA LISTA CON EL DETALLE DE A QUIÉN VOTÓ CADA UNO*/}
      <div>

      </div>
{/*HASTA ACÁ DEBERÍA IR LA LISTA CON EL DETALLE DE A QUIÉN VOTÓ CADA UNO*/}
    
    
    </div>
  );
};

export default ContadorDoble;