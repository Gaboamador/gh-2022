import React, { useState, useEffect } from 'react';
import './App.css';
import {Button, Row, Col, Container, ListGroup} from 'react-bootstrap';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';

const ModeloNuevo = ({ words: initialWords }) => {

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

    const [newWord1, setNewWord1] = useState(localStorage.getItem('newWord1') || '');
    const [newWord2, setNewWord2] = useState(localStorage.getItem('newWord2') || '');
    const [newWord3, setNewWord3] = useState(localStorage.getItem('newWord3') || '');
    const [newWord4, setNewWord4] = useState(localStorage.getItem('newWord4') || '');
    const [newWord5, setNewWord5] = useState(localStorage.getItem('newWord5') || '');
    const [newWord6, setNewWord6] = useState(localStorage.getItem('newWord6') || '');
    const [newWord7, setNewWord7] = useState(localStorage.getItem('newWord7') || '');
    const [newWord8, setNewWord8] = useState(localStorage.getItem('newWord8') || '');
    const [newWord9, setNewWord9] = useState(localStorage.getItem('newWord9') || '');
    const [newWord10, setNewWord10] = useState(localStorage.getItem('newWord10') || '');
    const [newWord11, setNewWord11] = useState(localStorage.getItem('newWord11') || '');
    const [newWord12, setNewWord12] = useState(localStorage.getItem('newWord12') || '');
    const [newWord13, setNewWord13] = useState(localStorage.getItem('newWord13') || '');
    const [newWord14, setNewWord14] = useState(localStorage.getItem('newWord14') || '');
    const [newWord15, setNewWord15] = useState(localStorage.getItem('newWord15') || '');
    const [newWord16, setNewWord16] = useState(localStorage.getItem('newWord16') || '');
    const [newWord17, setNewWord17] = useState(localStorage.getItem('newWord17') || '');
    const [newWord18, setNewWord18] = useState(localStorage.getItem('newWord18') || '');
    const [newWord19, setNewWord19] = useState(localStorage.getItem('newWord19') || '');
    const [newWord20, setNewWord20] = useState(localStorage.getItem('newWord20') || '');
    const [newWord21, setNewWord21] = useState(localStorage.getItem('newWord21') || '');
    const [newWord22, setNewWord22] = useState(localStorage.getItem('newWord22') || '');
    const [newWord23, setNewWord23] = useState(localStorage.getItem('newWord23') || '');
    const [newWord24, setNewWord24] = useState(localStorage.getItem('newWord24') || '');
    


    const [previousWord1, setPreviousWord1] = useState('');
    const [previousWord2, setPreviousWord2] = useState('');
    const [previousWord3, setPreviousWord3] = useState('');
    const [previousWord4, setPreviousWord4] = useState('');
    const [previousWord5, setPreviousWord5] = useState('');
    const [previousWord6, setPreviousWord6] = useState('');
    const [previousWord7, setPreviousWord7] = useState('');
    const [previousWord8, setPreviousWord8] = useState('');
    const [previousWord9, setPreviousWord9] = useState('');
    const [previousWord10, setPreviousWord10] = useState('');
    const [previousWord11, setPreviousWord11] = useState('');
    const [previousWord12, setPreviousWord12] = useState('');
    const [previousWord13, setPreviousWord13] = useState('');
    const [previousWord14, setPreviousWord14] = useState('');
    const [previousWord15, setPreviousWord15] = useState('');
    const [previousWord16, setPreviousWord16] = useState('');
    const [previousWord17, setPreviousWord17] = useState('');
    const [previousWord18, setPreviousWord18] = useState('');
    const [previousWord19, setPreviousWord19] = useState('');
    const [previousWord20, setPreviousWord20] = useState('');
    const [previousWord21, setPreviousWord21] = useState('');
    const [previousWord22, setPreviousWord22] = useState('');
    const [previousWord23, setPreviousWord23] = useState('');
    const [previousWord24, setPreviousWord24] = useState('');
    




{/*    useEffect(() => {
        localStorage.setItem('words', JSON.stringify(words));
        localStorage.setItem('names', JSON.stringify(names));
        localStorage.setItem('lastClicked', lastClicked);
        localStorage.setItem('extraOccurrenceCount', extraOccurrenceCount);
}, [words, names, lastClicked, extraOccurrenceCount]);
*/}

    const namesOptions = ['Agustín', 'Ariel', 'Camila', 'Daniela', 'Julieta', 'Lucila', 'Marcos', 'Maximiliano', 'Nacho', 'Romina', 'Thiago', 'Walter'];

    useEffect(() => {
      if (newWord1 === "-") {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord1)]);
        setPreviousWord1("");
        return;
      }
    if (newWord1) {
      setWords(currentWords => [...currentWords.filter(word => word !== previousWord1), newWord1]);
      setPreviousWord1(newWord1);
      }
    }, [newWord1]);

    useEffect(() => {
      if (newWord2 === "-") {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord2)]);
        setPreviousWord2("");
        return;
      }
      if (newWord2) {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord2), newWord2, newWord2]);
        setPreviousWord2(newWord2);
      }
    }, [newWord2]);

    useEffect(() => {
      if (newWord3 === "-") {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord3)]);
        setPreviousWord3("");
        return;
      }
      if (newWord3) {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord3), newWord3]);
        setPreviousWord3(newWord3);
      }
    }, [newWord3]);

    useEffect(() => {
      if (newWord4 === "-") {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord4)]);
        setPreviousWord4("");
        return;
      }
      if (newWord4) {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord4), newWord4, newWord4]);
        setPreviousWord4(newWord4);
      }
    }, [newWord4]);

    useEffect(() => {
      if (newWord5 === "-") {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord5)]);
        setPreviousWord5("");
        return;
      }
      if (newWord5) {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord5), newWord5]);
        setPreviousWord5(newWord5);
      }
    }, [newWord5]);

    useEffect(() => {
      if (newWord6 === "-") {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord6)]);
        setPreviousWord6("");
        return;
      }
      if (newWord6) {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord6), newWord6, newWord6]);
        setPreviousWord6(newWord6);
      }
    }, [newWord6]);

    useEffect(() => {
      if (newWord7 === "-") {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord7)]);
        setPreviousWord7("");
        return;
      }
      if (newWord7) {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord7), newWord7]);
        setPreviousWord7(newWord7);
      }
    }, [newWord7]);

    useEffect(() => {
      if (newWord8 === "-") {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord8)]);
        setPreviousWord8("");
        return;
      }
      if (newWord8) {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord8), newWord8, newWord8]);
        setPreviousWord8(newWord8);
      }
    }, [newWord8]);

    useEffect(() => {
      if (newWord9 === "-") {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord9)]);
        setPreviousWord9("");
        return;
      }
      if (newWord9) {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord9), newWord9]);
        setPreviousWord9(newWord9);
      }
    }, [newWord9]);

    useEffect(() => {
      if (newWord10 === "-") {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord10)]);
        setPreviousWord10("");
        return;
      }
      if (newWord10) {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord10), newWord10, newWord10]);
        setPreviousWord10(newWord10);
      }
    }, [newWord10]);

    useEffect(() => {
      if (newWord11 === "-") {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord11)]);
        setPreviousWord11("");
        return;
      }
      if (newWord11) {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord11), newWord11]);
        setPreviousWord11(newWord11);
      }
    }, [newWord11]);

    useEffect(() => {
      if (newWord12 === "-") {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord12)]);
        setPreviousWord12("");
        return;
      }
      if (newWord12) {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord12), newWord12, newWord12]);
        setPreviousWord12(newWord12);
      }
    }, [newWord12]);

    useEffect(() => {
      if (newWord13 === "-") {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord13)]);
        setPreviousWord13("");
        return;
      }
      if (newWord13) {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord13), newWord13]);
        setPreviousWord13(newWord13);
      }
    }, [newWord13]);

    useEffect(() => {
      if (newWord14 === "-") {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord14)]);
        setPreviousWord14("");
        return;
      }
      if (newWord14) {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord14), newWord14, newWord14]);
        setPreviousWord14(newWord14);
      }
    }, [newWord14]);

    useEffect(() => {
      if (newWord15 === "-") {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord15)]);
        setPreviousWord15("");
        return;
      }
      if (newWord15) {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord15), newWord15]);
        setPreviousWord15(newWord15);
      }
    }, [newWord15]);

    useEffect(() => {
      if (newWord16 === "-") {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord16)]);
        setPreviousWord16("");
        return;
      }
      if (newWord16) {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord16), newWord16, newWord16]);
        setPreviousWord16(newWord16);
      }
    }, [newWord16]);

    useEffect(() => {
      if (newWord17 === "-") {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord17)]);
        setPreviousWord17("");
        return;
      }
      if (newWord17) {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord17), newWord17]);
        setPreviousWord17(newWord17);
      }
    }, [newWord17]);

    useEffect(() => {
      if (newWord18 === "-") {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord18)]);
        setPreviousWord18("");
        return;
      }
      if (newWord18) {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord18), newWord18, newWord18]);
        setPreviousWord18(newWord18);
      }
    }, [newWord18]);

    useEffect(() => {
      if (newWord19 === "-") {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord19)]);
        setPreviousWord19("");
        return;
      }
      if (newWord19) {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord19), newWord19]);
        setPreviousWord19(newWord19);
      }
    }, [newWord19]);

    useEffect(() => {
      if (newWord20 === "-") {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord20)]);
        setPreviousWord20("");
        return;
      }
      if (newWord20) {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord20), newWord20, newWord20]);
        setPreviousWord20(newWord20);
      }
    }, [newWord20]);

    useEffect(() => {
      if (newWord21 === "-") {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord21)]);
        setPreviousWord21("");
        return;
      }
      if (newWord21) {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord21), newWord21]);
        setPreviousWord21(newWord21);
      }
    }, [newWord21]);

    useEffect(() => {
      if (newWord22 === "-") {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord22)]);
        setPreviousWord22("");
        return;
      }
      if (newWord22) {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord22), newWord22, newWord22]);
        setPreviousWord22(newWord22);
      }
    }, [newWord22]);
    
    useEffect(() => {
      if (newWord23 === "-") {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord23)]);
        setPreviousWord23("");
        return;
      }
      if (newWord23) {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord23), newWord23]);
        setPreviousWord23(newWord23);
      }
    }, [newWord23]);

    useEffect(() => {
      if (newWord24 === "-") {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord24)]);
        setPreviousWord24("");
        return;
      }
      if (newWord24) {
        setWords(currentWords => [...currentWords.filter(word => word !== previousWord24), newWord24, newWord24]);
        setPreviousWord24(newWord24);
      }
    }, [newWord24]);
    


    const namesCount = countWords(names);
    const wordCounts = countWords(words);
    const sortedWords = Object.keys(wordCounts).sort((a, b) => wordCounts[b] - wordCounts[a]);
    const fourthWordCount = sortedWords.length > 3 ? wordCounts[sortedWords[3]] : 0;
    const sortedNames = Object.keys(namesCount).sort((a, b) => namesCount[b] - namesCount[a]);

      const handleSelectChange = event => {
        setNewName(event.target.value);
        if (newWord) {
          setWords([...words, newWord, ...(addExtraOccurrence && extraOccurrenceCount < 2 ? [newWord] : [])]);
          setNames([...names, newName, ...(addExtraOccurrence && extraOccurrenceCount < 2 ? [newName] : [])]);
          setNewWord('');
          setNewName('');
          namesCount = countWords(names);
          if (addExtraOccurrence && extraOccurrenceCount < 2) {
            setExtraOccurrenceCount(extraOccurrenceCount + 1);
          }
        }
      }

            const handleSelectChange1 = event => {
        setPreviousWord1(newWord1);
        setNewWord1(event.target.value);
        if (newWord1) {
          setWords(currentWords => [...currentWords, newWord1]);
        }
      }
      const handleSelectChange2 = event => {
        setPreviousWord2(newWord2);
        setNewWord2(event.target.value);
        if (newWord2) {
          setWords(currentWords => [...currentWords, newWord2, newWord2]);
        }
      }
      const handleSelectChange3 = event => {
        setPreviousWord3(newWord3);
        setNewWord3(event.target.value);
        if (newWord3) {
          setWords(currentWords => [...currentWords, newWord3]);
        }
      }
      const handleSelectChange4 = event => {
        setPreviousWord4(newWord4);
        setNewWord4(event.target.value);
        if (newWord4) {
          setWords(currentWords => [...currentWords, newWord4, newWord4]);
        }
      }
      const handleSelectChange5 = event => {
        setPreviousWord5(newWord5);
        setNewWord5(event.target.value);
        if (newWord5) {
          setWords(currentWords => [...currentWords, newWord5]);
        }
      }
      const handleSelectChange6 = event => {
        setPreviousWord6(newWord6);
        setNewWord6(event.target.value);
        if (newWord6) {
          setWords(currentWords => [...currentWords, newWord6, newWord6]);
        }
      }
      const handleSelectChange7 = event => {
        setPreviousWord7(newWord7);
        setNewWord7(event.target.value);
        if (newWord7) {
          setWords(currentWords => [...currentWords, newWord7]);
        }
      }
      const handleSelectChange8 = event => {
        setPreviousWord8(newWord8);
        setNewWord8(event.target.value);
        if (newWord8) {
          setWords(currentWords => [...currentWords, newWord8, newWord8]);
        }
      }
      const handleSelectChange9 = event => {
        setPreviousWord9(newWord9);
        setNewWord9(event.target.value);
        if (newWord9) {
          setWords(currentWords => [...currentWords, newWord9]);
        }
      }
      const handleSelectChange10 = event => {
        setPreviousWord10(newWord10);
        setNewWord10(event.target.value);
        if (newWord10) {
          setWords(currentWords => [...currentWords, newWord10, newWord10]);
        }
      }
      const handleSelectChange11 = event => {
        setPreviousWord11(newWord11);
        setNewWord11(event.target.value);
        if (newWord11) {
          setWords(currentWords => [...currentWords, newWord11]);
        }
      }
      const handleSelectChange12 = event => {
        setPreviousWord12(newWord12);
        setNewWord12(event.target.value);
        if (newWord12) {
          setWords(currentWords => [...currentWords, newWord12, newWord12]);
        }
      }
      const handleSelectChange13 = event => {
        setPreviousWord13(newWord13);
        setNewWord13(event.target.value);
        if (newWord13) {
          setWords(currentWords => [...currentWords, newWord13]);
        }
      }
      const handleSelectChange14 = event => {
        setPreviousWord14(newWord14);
        setNewWord14(event.target.value);
        if (newWord14) {
          setWords(currentWords => [...currentWords, newWord14, newWord14]);
        }
      }
      const handleSelectChange15 = event => {
        setPreviousWord15(newWord15);
        setNewWord15(event.target.value);
        if (newWord15) {
          setWords(currentWords => [...currentWords, newWord15]);
        }
      }
      const handleSelectChange16 = event => {
        setPreviousWord16(newWord16);
        setNewWord16(event.target.value);
        if (newWord16) {
          setWords(currentWords => [...currentWords, newWord16, newWord16]);
        }
      }
      const handleSelectChange17 = event => {
        setPreviousWord17(newWord17);
        setNewWord17(event.target.value);
        if (newWord17) {
          setWords(currentWords => [...currentWords, newWord17]);
        }
      }
      const handleSelectChange18 = event => {
        setPreviousWord18(newWord18);
        setNewWord18(event.target.value);
        if (newWord18) {
          setWords(currentWords => [...currentWords, newWord18, newWord18]);
        }
      }
      const handleSelectChange19 = event => {
        setPreviousWord19(newWord19);
        setNewWord19(event.target.value);
        if (newWord19) {
          setWords(currentWords => [...currentWords, newWord19]);
        }
      }
      const handleSelectChange20 = event => {
        setPreviousWord20(newWord20);
        setNewWord20(event.target.value);
        if (newWord20) {
          setWords(currentWords => [...currentWords, newWord20, newWord20]);
        }
      }
      const handleSelectChange21 = event => {
        setPreviousWord21(newWord21);
        setNewWord21(event.target.value);
        if (newWord21) {
          setWords(currentWords => [...currentWords, newWord21]);
        }
      }
      const handleSelectChange22 = event => {
        setPreviousWord22(newWord22);
        setNewWord22(event.target.value);
        if (newWord22) {
          setWords(currentWords => [...currentWords, newWord22, newWord22]);
        }
      }
      const handleSelectChange23 = event => {
        setPreviousWord23(newWord23);
        setNewWord23(event.target.value);
        if (newWord23) {
          setWords(currentWords => [...currentWords, newWord23]);
        }
      }
      const handleSelectChange24 = event => {
        setPreviousWord24(newWord24);
        setNewWord24(event.target.value);
        if (newWord24) {
          setWords(currentWords => [...currentWords, newWord24, newWord24]);
        }
      }


      const handleWordSelectChange = (event, number) => {
        setNewWord(event.target.value);
        if (newWord) {
          setWords([...words, ...Array(number).fill(newWord)]);
        }
      }
    

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
localStorage.removeItem('newWord1');
localStorage.removeItem('newWord2');
localStorage.removeItem('newWord3');
localStorage.removeItem('newWord4');
localStorage.removeItem('newWord5');
localStorage.removeItem('newWord6');
localStorage.removeItem('newWord7');
localStorage.removeItem('newWord8');
localStorage.removeItem('newWord9');
localStorage.removeItem('newWord10');
localStorage.removeItem('newWord11');
localStorage.removeItem('newWord12');
localStorage.removeItem('newWord13');
localStorage.removeItem('newWord14');
localStorage.removeItem('newWord15');
localStorage.removeItem('newWord16');
localStorage.removeItem('newWord17');
localStorage.removeItem('newWord18');
localStorage.removeItem('newWord19');
localStorage.removeItem('newWord20');
localStorage.removeItem('newWord21');
localStorage.removeItem('newWord22');
window.location.reload();
    localStorage.removeItem("words");
    localStorage.removeItem("names");
    localStorage.removeItem("lastClicked");
    localStorage.removeItem("extraOccurrenceCount");

    setPreviousWord1('');
    setPreviousWord2('');
    setPreviousWord3('');
    setPreviousWord4('');
    setPreviousWord5('');
    setPreviousWord6('');
    setPreviousWord7('');
    setPreviousWord8('');
    setPreviousWord9('');
    setPreviousWord10('');
    setPreviousWord11('');
    setPreviousWord12('');
    setPreviousWord13('');
    setPreviousWord14('');
    setPreviousWord15('');
    setPreviousWord16('');
    setPreviousWord17('');
    setPreviousWord18('');
    setPreviousWord19('');
    setPreviousWord20('');
    setPreviousWord21('');
    setPreviousWord22('');

    setNewWord1('-');
setNewWord2('-');
setNewWord3('-');
setNewWord4('-');
setNewWord5('-');
setNewWord6('-');
setNewWord7('-');
setNewWord8('-');
setNewWord9('-');
setNewWord10('-');
setNewWord11('-');
setNewWord12('-');
setNewWord13('-');
setNewWord14('-');
setNewWord15('-');
setNewWord16('-');
setNewWord17('-');
setNewWord18('-');
setNewWord19('-');
setNewWord20('-');
setNewWord21('-');
setNewWord22('-');

    



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
      <Col xs={4}>
        <Form.Label>Jugador</Form.Label>
      </Col>
      <Col xs={4}>
        <Form.Label>Primer Lugar</Form.Label>
      </Col>
      <Col xs={4}>
        <Form.Label>Segundo Lugar</Form.Label>
      </Col>
    </Row>

    <Row> 
      <Col xs={4}>
        <Form.Label>Agustín</Form.Label>
      </Col>   
      <Col xs={4}>
        <Form.Control as="select" defaultvalue={newWord2} onChange={handleSelectChange2}>
          <option value="-">-</option>
          {namesOptions.map((name, i) => (
          <option key={i}>{name}</option>
          ))}
        </Form.Control>
      </Col>
      <Col xs={4}>
        <Form.Control as="select" defaultvalue={newWord1} onChange={handleSelectChange1}>
          <option value="-">-</option>
          {namesOptions.map((name, i) => (
          <option key={i}>{name}</option>
          ))}
        </Form.Control>
      </Col>
    </Row>

    <Row>
      <Col xs={4}>
        <Form.Label>Ariel</Form.Label>
      </Col>  
      <Col xs={4}>
        <Form.Control as="select" defaultvalue={newWord4} onChange={handleSelectChange4}>
        <option value="-">-</option>
          {namesOptions.map((name, i) => (
          <option key={i}>{name}</option>
          ))}
        </Form.Control>
      </Col>
      <Col xs={4}>
        <Form.Control as="select" defaultvalue={newWord3} onChange={handleSelectChange3}>
        <option value="-">-</option>
          {namesOptions.map((name, i) => (
          <option key={i}>{name}</option>
          ))}
        </Form.Control>
      </Col>
    </Row>

    <Row>
      <Col xs={4}>
        <Form.Label>Camila</Form.Label>
      </Col>  
      <Col xs={4}>
        <Form.Control as="select" defaultvalue={newWord6} onChange={handleSelectChange6}>
        <option value="-">-</option>
          {namesOptions.map((name, i) => (
          <option key={i}>{name}</option>
          ))}
        </Form.Control>
      </Col>
      <Col xs={4}>
        <Form.Control as="select" defaultvalue={newWord5} onChange={handleSelectChange5}>
        <option value="-">-</option>
          {namesOptions.map((name, i) => (
          <option key={i}>{name}</option>
          ))}
        </Form.Control>
      </Col>
    </Row>

    <Row>
      <Col xs={4}>
        <Form.Label>Daniela</Form.Label>
      </Col>  
      <Col xs={4}>
        <Form.Control as="select" defaultvalue={newWord8} onChange={handleSelectChange8}>
        <option value="-">-</option>
          {namesOptions.map((name, i) => (
          <option key={i}>{name}</option>
          ))}
        </Form.Control>
      </Col>
      <Col xs={4}>
        <Form.Control as="select" defaultvalue={newWord7} onChange={handleSelectChange7}>
        <option value="-">-</option>
          {namesOptions.map((name, i) => (
          <option key={i}>{name}</option>
          ))}
        </Form.Control>
      </Col>
    </Row>

    <Row>
      <Col xs={4}>
        <Form.Label>Julieta</Form.Label>
      </Col>  
      <Col xs={4}>
        <Form.Control as="select" defaultvalue={newWord10} onChange={handleSelectChange10}>
        <option value="-">-</option>
          {namesOptions.map((name, i) => (
          <option key={i}>{name}</option>
          ))}
        </Form.Control>
      </Col>
      <Col xs={4}>
        <Form.Control as="select" defaultvalue={newWord9} onChange={handleSelectChange9}>
        <option value="-">-</option>
          {namesOptions.map((name, i) => (
          <option key={i}>{name}</option>
          ))}
        </Form.Control>
      </Col>
    </Row>

    <Row>
      <Col xs={4}>
        <Form.Label>Lucila</Form.Label>
      </Col>  
      <Col xs={4}>
        <Form.Control as="select" defaultvalue={newWord12} onChange={handleSelectChange12}>
        <option value="-">-</option>
          {namesOptions.map((name, i) => (
          <option key={i}>{name}</option>
          ))}
        </Form.Control>
      </Col>
      <Col xs={4}>
        <Form.Control as="select" defaultvalue={newWord11} onChange={handleSelectChange11}>
        <option value="-">-</option>
          {namesOptions.map((name, i) => (
          <option key={i}>{name}</option>
          ))}
        </Form.Control>
      </Col>
    </Row>

    <Row>
      <Col xs={4}>
        <Form.Label>Marcos</Form.Label>
      </Col>  
      <Col xs={4}>
        <Form.Control as="select" defaultvalue={newWord14} onChange={handleSelectChange14}>
        <option value="-">-</option>
          {namesOptions.map((name, i) => (
          <option key={i}>{name}</option>
          ))}
        </Form.Control>
      </Col>
      <Col xs={4}>
        <Form.Control as="select" defaultvalue={newWord13} onChange={handleSelectChange13}>
        <option value="-">-</option>
          {namesOptions.map((name, i) => (
          <option key={i}>{name}</option>
          ))}
        </Form.Control>
      </Col>
    </Row>

    <Row>
      <Col xs={4}>
        <Form.Label>Maximiliano</Form.Label>
      </Col>  
      <Col xs={4}>
        <Form.Control as="select" defaultvalue={newWord16} onChange={handleSelectChange16}>
        <option value="-">-</option>
          {namesOptions.map((name, i) => (
          <option key={i}>{name}</option>
          ))}
        </Form.Control>
      </Col>
      <Col xs={4}>
        <Form.Control as="select" defaultvalue={newWord15} onChange={handleSelectChange15}>
        <option value="-">-</option>
          {namesOptions.map((name, i) => (
          <option key={i}>{name}</option>
          ))}
        </Form.Control>
      </Col>
    </Row>

    <Row>
      <Col xs={4}>
        <Form.Label>Nacho</Form.Label>
      </Col>  
      <Col xs={4}>
        <Form.Control as="select" defaultvalue={newWord18} onChange={handleSelectChange18}>
        <option value="-">-</option>
          {namesOptions.map((name, i) => (
          <option key={i}>{name}</option>
          ))}
        </Form.Control>
      </Col>
      <Col xs={4}>
        <Form.Control as="select" defaultvalue={newWord17} onChange={handleSelectChange17}>
        <option value="-">-</option>
          {namesOptions.map((name, i) => (
          <option key={i}>{name}</option>
          ))}
        </Form.Control>
      </Col>
    </Row>

    <Row>
      <Col xs={4}>
        <Form.Label>Romina</Form.Label>
      </Col>  
      <Col xs={4}>
        <Form.Control as="select" defaultvalue={newWord20} onChange={handleSelectChange20}>
        <option value="-">-</option>
          {namesOptions.map((name, i) => (
          <option key={i}>{name}</option>
          ))}
        </Form.Control>
      </Col>
      <Col xs={4}>
        <Form.Control as="select" defaultvalue={newWord19} onChange={handleSelectChange19}>
        <option value="-">-</option>
          {namesOptions.map((name, i) => (
          <option key={i}>{name}</option>
          ))}
        </Form.Control>
      </Col>
    </Row>

    <Row>
      <Col xs={4}>
        <Form.Label>Thiago</Form.Label>
      </Col>  
      <Col xs={4}>
        <Form.Control as="select" defaultvalue={newWord22} onChange={handleSelectChange22}>
        <option value="-">-</option>
          {namesOptions.map((name, i) => (
          <option key={i}>{name}</option>
          ))}
        </Form.Control>
      </Col>
      <Col xs={4}>
        <Form.Control as="select" defaultvalue={newWord21} onChange={handleSelectChange21}>
        <option value="-">-</option>
          {namesOptions.map((name, i) => (
          <option key={i}>{name}</option>
          ))}
        </Form.Control>
      </Col>
    </Row>

    <Row>
      <Col xs={4}>
        <Form.Label>Walter</Form.Label>
      </Col>  
      <Col xs={4}>
        <Form.Control as="select" defaultvalue={newWord24} onChange={handleSelectChange24}>
        <option value="-">-</option>
          {namesOptions.map((name, i) => (
          <option key={i}>{name}</option>
          ))}
        </Form.Control>
      </Col>
      <Col xs={4}>
        <Form.Control as="select" defaultvalue={newWord23} onChange={handleSelectChange23}>
        <option value="-">-</option>
          {namesOptions.map((name, i) => (
          <option key={i}>{name}</option>
          ))}
        </Form.Control>
      </Col>
    </Row>

</Container>

<Container> {/*ACÁ EL DETALLE CON LA PLACA DE NOMINADOS Y FUERA DE PLACA*/}
    <Row>
      <Col xs={12}>
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

export default ModeloNuevo;