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

export const NuevaLista = ({ words: initialWords }) => {
  const [words, setWords] = useState(initialWords);
  const [names, setNames] = useState([]);
  const [newWord, setNewWord] = useState('');
  const [newName, setNewName] = useState('');
  const [addExtraOccurrence, setAddExtraOccurrence] = useState(false);
  const [extraOccurrenceCount, setExtraOccurrenceCount] = useState(0);
  const [nameCounts, setNameCounts] = useState({});

  const wordsOptions = ['word1', 'word2', 'word3', 'word4', 'word5', 'word6', 'word7', 'word8', 'word9', 'word10', 'word11', 'word12', 'word13'];
  const namesOptions = ['name1', 'name2', 'name3', 'name4', 'name5', 'name6', 'name7', 'name8', 'name9', 'name10', 'name11', 'name12', 'name13'];

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
      if (addExtraOccurrence && extraOccurrenceCount < 2) {
        setWords([...words, newWord]);
        setNames([...names, newName]);
        setExtraOccurrenceCount(extraOccurrenceCount + 1);
      }
      if (nameCounts[newName]) {
        setNameCounts({ ...nameCounts, [newName]: nameCounts[newName] + 1 });
      } else {
        setNameCounts({ ...nameCounts, [newName]: 1 });
      }
    }
  }

  const handleSubmitTwo = event => {
    event.preventDefault();
    if (newWord && newName) {
      setWords([...words, newWord, newWord]);
      setNames([...names, newName, newName]);
      if (addExtraOccurrence && extraOccurrenceCount < 2) {
        setWords([...words, newWord]);
        setNames([...names, newName]);
        setExtraOccurrenceCount(extraOccurrenceCount + 1);
      }
      if (nameCounts[newName]) {
        setNameCounts({ ...nameCounts, [newName]: nameCounts[newName] + 1 });
      } else {
        setNameCounts({ ...nameCounts, [newName]: 1 });
      }
    }
}

const handleUndo = () => {
  setWords(words.slice(0, -1));
  setNames(names.slice(0, -1));
  if (nameCounts[newName]) {
    setNameCounts({ ...nameCounts, [newName]: nameCounts[newName] - 1 });
  }
  if (addExtraOccurrence) {
    setExtraOccurrenceCount(extraOccurrenceCount - 1);
  }
}

const toggleExtraOccurrence = () => {
  setAddExtraOccurrence(!addExtraOccurrence);
  setExtraOccurrenceCount(0);
}

const wordCounts = countWords(words);
const sortedWords = Object.keys(wordCounts).sort((a, b) => wordCounts[b] - wordCounts[a]);
const fourthWordCount = sortedWords[3] ? wordCounts[sortedWords[3]] : 0;

return (
  <div>
    <div style={{justifyContent: 'space-between' }}>
      <form onSubmit={handleSubmitTwo}>
      <label>
          Jugador
          <select value={newName} onChange={handleNameChange}>
            {namesOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          Voto
          <select value={newWord} onChange={handleWordChange}>
            {wordsOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <Button type="submit" className="btn btn-primary">Primer Lugar</Button>
      </form>
      <form onSubmit={handleSubmitOne}>
      <Button type="submit" className="btn btn-secondary">Segundo Lugar</Button>
      </form>
      <Button onClick={handleUndo} className="btn btn-light">Deshacer</Button>
    </div>
    <div>
      <label>
        <input type="checkbox" checked={addExtraOccurrence} onChange={toggleExtraOccurrence} disabled={extraOccurrenceCount >= 2} />
        Espontánea
      </label>
    </div>
    <div>
    <h2>Placa Nominados</h2>
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
      <h2>Votos Jugadores</h2>
        <table>
          <tbody>
            {sortedWords.map((word, index) => (
              <tr key={word}>
                <td>{names[index]}</td>
                <td>{word}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NuevaLista;