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

export const ListaJugadores = ({ words: initialWords }) => {
  const [words, setWords] = useState(initialWords);
  const [names, setNames] = useState([]);
  const [newWord, setNewWord] = useState('Agustín');
  const [newName, setNewName] = useState('Agustín');
  const [addExtraOccurrence, setAddExtraOccurrence] = useState(false);
  const [extraOccurrenceCount, setExtraOccurrenceCount] = useState(0);

  const handleWordChange = event => {
    setNewWord(event.target.value);
  }

  const handleNameChange = event => {
    setNewName(event.target.value);
  }

  const handleSubmitOne = event => {
    event.preventDefault();
    if (newWord && newName) {
      setWords([...words, newWord]);
      setNames([...names, newName]);
      setNewWord(event.target.value);
      setNewName(event.target.value);
      if (addExtraOccurrence && extraOccurrenceCount < 2) {
        setWords([...words, newWord]);
        setNames([...names, newName]);
        setExtraOccurrenceCount(extraOccurrenceCount + 1);
      }
    }
  }

  const handleSubmitTwo = event => {
    event.preventDefault();
    if (newWord && newName) {
      setWords([...words, newWord, newWord]);
      setNames([...names, newName, newName]);
      setNewWord(event.target.value);
      setNewName(event.target.value);
      if (addExtraOccurrence && extraOccurrenceCount < 2) {
        setWords([...words, newWord]);
        setNames([...names, newName]);
        setExtraOccurrenceCount(extraOccurrenceCount + 1);
      }
    }
  }

  const handleUndo = () => {
    setWords(words.slice(0, -1));
    setNames(names.slice(0, -1));
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
      <label>Jugador
          <select value={newName} onChange={handleNameChange}>
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
        <label>Votado
        <select value={newWord} onChange={handleWordChange}>
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
        <input type="checkbox" checked={addExtraOccurrence} onChange={toggleExtraOccurrence} disabled={extraOccurrenceCount >= 2}/>
        Espontánea
        </label>
      </div>
      
      <div>
        <h2>Words:</h2>
        {sortedWords.map((word, index) => (
          <div
            key={word}
            style={{ color: index < 4 || wordCounts[word] === fourthWordCount ? 'red' : 'black' }}
          >
            {word}: {wordCounts[word]}
          </div>
        ))}
      </div>

      <div>
        <h2>Names:</h2>
        {names.map((name, index) => (
          <div key={name}>
            {name}: {names[index]}
            </div>
        ))}
        </div>


    </div>
  );
};


export default ListaJugadores;