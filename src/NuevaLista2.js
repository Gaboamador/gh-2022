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

export const NuevaLista2 = ({ words: initialWords }) => {
  const [words, setWords] = useState(initialWords);
  const [names, setNames] = useState([]);
  const [newWord, setNewWord] = useState('');
  const [newName, setNewName] = useState('');
  const [addExtraOccurrence, setAddExtraOccurrence] = useState(false);
  const [extraOccurrenceCount, setExtraOccurrenceCount] = useState(0);
  const [nameCounts, setNameCounts] = useState({});
  const [word, setWord] = useState('');
  const [name, setName] = useState('');

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

const handleAddWord = (event) => {
    event.preventDefault();
    setWords([...words, word]);
    setNames([...names, name]);
  };

return (
  <div>
    <div style={{justifyContent: 'space-between' }}>
    <form onSubmit={handleAddWord}>
    <select value={newWord} onChange={handleWordChange}>
            {wordsOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        <label htmlFor="name">
          Name:
          <select id="name" value={name} onChange={(event) => setName(event.target.value)}>
            <option value="Alice">Alice</option>
            <option value="Bob">Bob</option>
            <option value="Charlie">Charlie</option>
            <option value="Dave">Dave</option>
            <option value="Eve">Eve</option>
            <option value="Frank">Frank</option>
            <option value="Grace">Grace</option>
            <option value="Heidi">Heidi</option>
            <option value="Igor">Igor</option>
            <option value="Jenny">Jenny</option>
            <option value="Kendrick">Kendrick</option>
            <option value="Laura">Laura</option>
            <option value="Mallory">Mallory</option>
          </select>
        </label>
        <Button type="submit" className="btn btn-primary">Primer Lugar</Button>
      </form>
      <form onSubmit={handleSubmitOne}>
        <label>
          Enter a new word:
          <select value={newWord} onChange={handleWordChange}>
            {wordsOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          Enter your name:
          <select value={newName} onChange={handleNameChange}>
            {namesOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <button type="submit" style={{ backgroundColor: 'lightgreen', borderRadius: '50%' }}>Add one occurrence</button>
      </form>
      <form onSubmit={handleSubmitTwo}>
        <button type="submit" style={{ backgroundColor: 'pink', borderRadius: '50%' }}>Add two occurrences</button>
      </form>
      <button onClick={handleUndo} style={{ backgroundColor: 'lightblue', borderRadius: '50%' }}>Undo</button>
    </div>
    <div>
      <label>
        <input type="checkbox" checked={addExtraOccurrence} onChange={toggleExtraOccurrence} disabled={extraOccurrenceCount >= 2} />
        Add extra occurrence
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

export default NuevaLista2;