import React, { useState } from 'react';

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

const ListaJugadores = ({ words: initialWords }) => {
  const [words, setWords] = useState(initialWords);
  const [newWord, setNewWord] = useState('Agustín');

  const handleChange = event => {
    setNewWord(event.target.value);
  }

  const handleSubmit = event => {
    event.preventDefault();
    setWords([...words, newWord]);
    setNewWord('Agustín');
  }

  const wordCounts = countWords(words);
  const sortedWords = Object.keys(wordCounts).sort((a, b) => wordCounts[b] - wordCounts[a]);
  const fourthWordCount = sortedWords.length > 3 ? wordCounts[sortedWords[3]] : 0;

  return (
    <div>
      {/*FORMULARIO PRIMER LUGAR - 2 VOTOS*/}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Confirmar Voto</button>
      </form>

      {/*FORMULARIO SEGUNDO LUGAR - 1 VOTO*/}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Confirmar Voto</button>
      </form>

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

    </div>
  );
};

export default ListaJugadores;