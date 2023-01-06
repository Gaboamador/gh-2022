import React from 'react';

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

const ContarPalabras = () => {
  const words = ['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog'];
  const wordCounts = countWords(words);
  return (
    <div>
      {Object.keys(wordCounts).map(word => (
        <div key={word}>
          {word}: {wordCounts[word]}
        </div>
      ))}
    </div>
  );
};
