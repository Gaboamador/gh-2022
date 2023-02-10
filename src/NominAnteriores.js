import React, { useState, useEffect } from 'react';
import './App.css';
import {Button, Row, Col, Container, ListGroup, Table, FormCheck, FormSelect} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const participantes = ['Agustín', 'Alexis', 'Ariel', 'Camila', 'Constanza', 'Daniela', 'Juan', 'Juliana', 'Julieta', 'Lucila', 'Marcos', 'María Laura', 'Martina', 'Maximiliano', 'Mora', 'Nacho', 'Romina', 'Thiago', 'Tomás', 'Walter'];

const NominAnteriores = () => {
const [selectedOption, setSelectedOption] = useState(0);
const [selectedName, setSelectedName] = useState(participantes[0]);
const [data, setData] = useState([
/*SEMANA 1*/
[
['Agustín', 'María Laura', 'Juan'],
['Alexis', 'Walter', 'Agustín'],
['Ariel', 'No estaba'],
['Camila', 'No estaba'],
['Constanza', 'Nacho', 'Juan'],
['Daniela', 'Tomás', 'Walter'],
['Juan', 'Marcos', 'Agustín'],
['Juliana', 'Marcos', 'Agustín'],
['Julieta', 'Juan', 'Tomás'],
['Lucila', 'Tomás', 'Agustín'],
['Marcos', 'Tomás', 'Nacho'],
['María Laura', 'Walter', 'Tomás'],
['Martina', 'Lucila', 'Marcos'],
['Maximiliano', 'Walter', 'Romina'],
['Mora', 'Agustín', 'Walter'],
['Nacho', 'Walter', 'Marcos'],
['Romina', 'Tomás', 'Nacho'],
['Thiago', 'Walter', 'Agustín'],
['Tomás', 'Constanza', 'Marcos'],
['Walter', 'Tomás', 'Juan'],
],
/*SEMANA 2*/
[
['Agustín', 'Juan', 'Mora'],
['Alexis', 'Nacho', 'Martina'],
['Ariel', 'No estaba'],
['Camila', 'No estaba'],
['Constanza', 'Nacho', 'Walter'],
['Daniela', 'Juan', 'Walter'],
['Juan', 'Constanza', 'Alexis'],
['Juliana', 'Martina', 'Juan'],
['Julieta', 'Martina', 'Juan'],
['Lucila', 'Nacho', 'Walter'],
['Marcos', 'Nacho', 'Juan'],
['María Laura', 'Juan', 'Walter'],
['Martina', 'Alexis', 'Constanza'],
['Maximiliano', 'Martina', 'Nacho'],
['Mora', 'Nacho', 'Alexis'],
['Nacho', 'Alexis', 'Constanza'],
['Romina', 'Martina', 'Nacho'],
['Thiago', 'Martina', 'Juan'],
['Tomás', '1° eliminado'],
['Walter', 'Juan', 'Nacho'],
],
/*SEMANA 3*/
[
['Agustín', 'Mora', 'Daniela'],
['Alexis', 'Daniela', 'Mora'],
['Ariel', 'No estaba'],
['Camila', 'No estaba'],
['Constanza', 'Lucila', 'Mora'],
['Daniela', 'Walter', 'Agustín'],
['Juan', 'Agustín', 'Mora'],
['Juliana', 'Daniela', 'Juan'],
['Julieta', 'Juan', 'Agustín'],
['Lucila', 'Marcos', 'Agustín'],
['Marcos', 'Juan', 'Nacho'],
['María Laura', 'Agustín', 'Walter'],
['Martina', '2° eliminada'],
['Maximiliano', 'Agustín', 'Daniela'],
['Mora', 'Agustín', 'Walter'],
['Nacho', 'Agustín', 'Daniela'],
['Romina', 'Agustín', 'Nacho'],
['Thiago', 'Agustín', 'Walter'],
['Tomás', '1° eliminado'],
['Walter', 'Agustín', 'Lucila'],
],
/*SEMANA 4*/
[
['Agustín', 'Daniela', 'María Laura'],
['Alexis', 'Daniela', 'Nacho'],
['Ariel', 'No estaba'],
['Camila', 'No estaba'],
['Constanza', 'Marcos', 'Agustín'],
['Daniela', 'Nacho', 'Juan'],
['Juan', 'Julieta', 'Constanza'],
['Juliana', 'Julieta', 'Constanza'],
['Julieta', 'Juan', 'Nacho'],
['Lucila', 'Julieta', 'Constanza'],
['Marcos', 'María Laura', 'Juan'],
['María Laura', 'Constanza', 'Julieta'],
['Martina', '2° eliminada'],
['Maximiliano', 'Daniela', 'Agustín'],
['Mora', '3° eliminada'],
['Nacho', 'Daniela', 'Julieta'],
['Romina', 'Agustín', 'Nacho'],
['Thiago', 'Juan', 'Agustín'],
['Tomás', '1° eliminado'],
['Walter', 'Juan', 'María Laura'],
],
/*SEMANA 5*/
[
['Agustín', 'María Laura', 'Lucila'],
['Alexis', 'Constanza', 'María Laura'],
['Ariel', 'No estaba'],
['Camila', 'No estaba'],
['Constanza', 'Lucila', 'María Laura'],
['Daniela', 'Maximiliano', 'Juliana'],
['Juan', '4° eliminado'],
['Juliana', 'Romina', 'Julieta'],
['Julieta', 'Lucila', 'María Laura'],
['Lucila', 'Walter', 'Marcos'],
['Marcos', 'Lucila', 'María Laura'],
['María Laura', 'Marcos', 'Walter'],
['Martina', '2° eliminada'],
['Maximiliano', 'Julieta', 'María Laura'],
['Mora', '3° eliminada'],
['Nacho', 'Romina', 'Walter'],
['Romina', 'Juliana', 'Maximiliano'],
['Thiago', 'Juliana', 'Lucila'],
['Tomás', '1° eliminado'],
['Walter', 'Lucila', 'María Laura'],
],
/*SEMANA 6*/
[
['Agustín', 'Romina', 'Julieta'],
['Alexis', 'Romina', '2° voto anulado'],
['Ariel', 'No estaba'],
['Camila', 'No estaba'],
['Constanza', 'Agustín', '2° voto anulado'],
['Daniela', 'Nacho', 'María Laura'],
['Juan', '4° eliminado'],
['Juliana', 'Nacho', 'Walter'],
['Julieta', 'Juliana', 'María Laura'],
['Lucila', '5° eliminada'],
['Marcos', 'Nacho', 'María Laura'],
['María Laura', 'Constanza', 'Juliana'],
['Martina', '2° eliminada'],
['Maximiliano', 'Walter', 'Agustín'],
['Mora', '3° eliminada'],
['Nacho', 'Marcos', 'Juliana'],
['Romina', 'Juliana', 'Agustín'],
['Thiago', 'María Laura', 'Juliana'],
['Tomás', '1° eliminado'],
['Walter', 'Juliana', 'Nacho'],
],  
/*SEMANA 7*/
[
['Agustín', 'Daniela', 'María Laura'],
['Alexis', 'Nacho', 'María Laura'],
['Ariel', 'No estaba'],
['Camila', 'No estaba'],
['Constanza', 'Nacho', 'María Laura'],
['Daniela', 'Nacho', 'Walter'],
['Juan', '4° eliminado'],
['Juliana', '6° eliminada'],
['Julieta', 'Nacho', 'Maximiliano'],
['Lucila', '5° eliminada'],
['Marcos', 'María Laura', 'Nacho'],
['María Laura', 'Constanza', 'Daniela'],
['Martina', '2° eliminada'],
['Maximiliano', 'Romina', 'Walter'],
['Mora', '3° eliminada'],
['Nacho', 'Constanza', 'Daniela'],
['Romina', 'Agustín', 'Nacho'],
['Thiago', 'Walter', 'Maximiliano'],
['Tomás', '1° eliminado'],
['Walter', 'Daniela', 'Constanza'],
],
/*SEMANA 8*/
[
['Agustín', 'Romina', 'Nacho'],
['Alexis', 'Julieta', 'Marcos'],
['Ariel', 'No estaba'],
['Camila', 'No estaba'],
['Constanza', 'Marcos', 'Julieta'],
['Daniela', 'Maximiliano', 'Agustín'],
['Juan', '4° eliminado'],
['Juliana', '6° eliminada'],
['Julieta', 'Maximiliano', 'Agustín'],
['Lucila', '5° eliminada'],
['Marcos', 'Nacho', 'Daniela'],
['María Laura', '7° eliminada'],
['Martina', '2° eliminada'],
['Maximiliano', 'Romina', 'Walter'],
['Mora', '3° eliminada'],
['Nacho', 'Romina', 'Constanza'],
['Romina', 'Agustín', 'Maximiliano'],
['Thiago', 'Romina', 'Walter'],
['Tomás', '1° eliminado'],
['Walter', 'Maximiliano', 'Agustín'],
],
/*SEMANA 9*/
[
['Agustín', 'Romina', 'Nacho'],
['Alexis', 'Julieta', 'Marcos'],
['Ariel', 'No estaba'],
['Camila', 'No estaba'],
['Constanza', 'Marcos', 'Julieta'],
['Daniela', 'Maximiliano', 'Agustín'],
['Juan', '4° eliminado'],
['Juliana', '6° eliminada'],
['Julieta', 'Maximiliano', 'Agustín'],
['Lucila', '5° eliminada'],
['Marcos', 'Nacho', 'Daniela'],
['María Laura', '7° eliminada'],
['Martina', '2° eliminada'],
['Maximiliano', 'Romina', 'Walter'],
['Mora', '3° eliminada'],
['Nacho', 'Romina', 'Constanza'],
['Romina', 'Agustín', 'Maximiliano'],
['Thiago', 'Romina', 'Walter'],
['Tomás', '1° eliminado'],
['Walter', 'Maximiliano', 'Agustín'],
],
/*SEMANA 10*/
[
['Agustín', '8° eliminado'],
['Alexis', 'Juliana'],
['Ariel', 'No vota'],
['Camila', 'No vota'],
['Constanza', 'Voto anulado'],
['Daniela', '9° eliminada'],
['Juan', '4° eliminado'],
['Juliana', '6° eliminada'],
['Julieta', 'Daniela'],
['Lucila', '5° eliminada'],
['Marcos', 'Agustín'],
['María Laura', '7° eliminada'],
['Martina', '2° eliminada'],
['Maximiliano', 'Juliana'],
['Mora', '3° eliminada'],
['Nacho', 'María Laura'],
['Romina', 'Daniela'],
['Thiago', 'Daniela'],
['Tomás', '1° eliminado'],
['Walter', 'María Laura'],
],
/*SEMANA 11*/
[
['Agustín', 'Daniela', 'Alexis'],
['Alexis', 'Daniela', 'Agustín'],
['Ariel', 'Walter', 'Nacho'],
['Camila', 'Voto anulado'],
['Constanza', 'Walter', 'Daniela'],
['Daniela', 'Constanza', 'Thiago'],
['Juan', '4° eliminado'],
['Juliana', '1° expulsada'],
['Julieta', 'Constanza', 'Agustín'],
['Lucila', 'Alexis', 'Ariel'],
['Marcos', 'Nacho', 'Ariel'],
['María Laura', '7° eliminada'],
['Martina', '2° eliminada'],
['Maximiliano', 'Daniela', 'Walter'],
['Mora', '3° eliminada'],
['Nacho', 'Constanza', 'Ariel'],
['Romina', 'Agustín', 'Constanza'],
['Thiago', 'Constanza', 'Alexis'],
['Tomás', '1° eliminado'],
['Walter', 'Ariel', 'Constanza'],
],
/*SEMANA 12*/
[
['Agustín', 'Alexis', 'Lucila'],
['Alexis', 'Daniela', 'Camila'],
['Ariel', 'Agustín', 'Marcos'],
['Camila', 'Lucila', 'Agustín'],
['Constanza', '10° eliminada'],
['Daniela', 'Alexis', 'Maximiliano'],
['Juan', '4° eliminado'],
['Juliana', '1° expulsada'],
['Julieta', 'Agustín', 'Alexis'],
['Lucila', 'Maximiliano', 'Alexis'],
['Marcos', 'Lucila', 'Ariel'],
['María Laura', '7° eliminada'],
['Martina', '2° eliminada'],
['Maximiliano', 'Daniela', 'Ariel'],
['Mora', '3° eliminada'],
['Nacho', 'Camila', 'Agustín'],
['Romina', 'Agustín', 'Ariel'],
['Thiago', 'Alexis', 'Ariel'],
['Tomás', '1° eliminado'],
['Walter', 'Ariel', 'Alexis'],
],
/*SEMANA 13*/
[
['Agustín', 'Camila', 'Thiago'],
['Alexis', '11° eliminado'],
['Ariel', 'Nacho', 'Walter'],
['Camila', 'Thiago', 'Nacho'],
['Constanza', '10° eliminada'],
['Daniela', 'Agustín', 'Thiago'],
['Juan', '4° eliminado'],
['Juliana', '1° expulsada'],
['Julieta', 'Camila', 'Thiago'],
['Lucila', 'Thiago', 'Camila'],
['Marcos', 'Lucila', 'Ariel'],
['María Laura', '7° eliminada'],
['Martina', '2° eliminada'],
['Maximiliano', 'Walter', 'Agustín'],
['Mora', '3° eliminada'],
['Nacho', 'Camila', 'Marcos'],
['Romina', 'Agustín', 'Nacho'],
['Thiago', 'Camila', 'Ariel'],
['Tomás', '1° eliminado'],
['Walter', 'Ariel', 'Thiago'],
],
/*SEMANA 14*/
[
['Agustín', 'Ariel', 'Maximiliano'],
['Alexis', '11° eliminado'],
['Ariel', 'Julieta', 'Romina'],
['Camila', 'Lucila', 'Agustín'],
['Constanza', '10° eliminada'],
['Daniela', 'Maximiliano', 'Ariel'],
['Juan', '4° eliminado'],
['Juliana', '1° expulsada'],
['Julieta', 'Maximiliano', 'Ariel'],
['Lucila', 'Ariel', 'Maximiliano'],
['Marcos', 'Nacho', 'Ariel'],
['María Laura', '7° eliminada'],
['Martina', '2° eliminada'],
['Maximiliano', 'Daniela', 'Ariel'],
['Mora', '3° eliminada'],
['Nacho', 'Ariel', 'Agustín'],
['Romina', 'Nacho', 'Agustín'],
['Thiago', '12° eliminado'],
['Tomás', '1° eliminado'],
['Walter', 'Ariel', 'Maximiliano'],
],
/*SEMANA 15*/
[
['Agustín', 'Daniela', 'Julieta'],
['Alexis', '11° eliminado'],
['Ariel', 'Walter', 'Julieta'],
['Camila', 'Lucila', 'Nacho'],
['Constanza', '10° eliminada'],
['Daniela', 'Agustín', 'Ariel'],
['Juan', '4° eliminado'],
['Juliana', '1° expulsada'],
['Julieta', 'Agustín', 'Ariel'],
['Lucila', 'Camila', 'Ariel'],
['Marcos', 'Lucila', 'Ariel'],
['María Laura', '7° eliminada'],
['Martina', '2° eliminada'],
['Maximiliano', '13° eliminado'],
['Mora', '3° eliminada'],
['Nacho', 'Daniela', 'Camila'],
['Romina', 'Nacho', 'Agustín'],
['Thiago', '12° eliminado'],
['Tomás', '1° eliminado'],
['Walter', 'Ariel', 'Lucila'],
],
/*SEMANA 16*/
[
['Agustín', '14° eliminado'],
['Alexis', '11° eliminado'],
['Ariel', 'Julieta', 'Romina'],
['Camila', 'Nacho', 'Lucila'],
['Constanza', '10° eliminada'],
['Daniela', 'Ariel', 'Walter'],
['Juan', '4° eliminado'],
['Juliana', '1° expulsada'],
['Julieta', 'Ariel', 'Walter'],
['Lucila', 'Walter', 'Daniela'],
['Marcos', 'Nacho', 'Ariel'],
['María Laura', '7° eliminada'],
['Martina', '2° eliminada'],
['Maximiliano', '13° eliminado'],
['Mora', '3° eliminada'],
['Nacho', 'Marcos', 'Julieta'],
['Romina', 'Nacho', 'Ariel'],
['Thiago', '12° eliminado'],
['Tomás', '1° eliminado'],
['Walter', 'Ariel', 'Marcos'],
],        
]);

const [results, setResults] = useState([]);

    const options = data.map((_, index) => (
      <option key={index} value={index}>
        Semana {index + 1}
      </option>
    ));
    
    const Footer = ({ data }) => {
        let hasStar = false;
        data.forEach(weekData => {
          weekData.forEach(row => {
            if (row.includes("(e)")) {
              hasStar = true;
            }
          });
        });
        return hasStar ? <p>(e) Espontánea</p> : null;
      };

     const handleChange = (event) => {
  const selectedName = event.target.value;
  let results = [];
  data.forEach((week, index) => {
    week.forEach((vote) => {
      if (vote[0] === selectedName) {
        results.push({
          week: index + 1,
          vote: vote.slice(1),
        });
      }
    });
  });
  setResults(results);
  setSelectedName(selectedName);
};

useEffect(() => {
  setSelectedName(participantes[0]);
  handleChange({ target: { value: participantes[0] } });
}, []);

const dataPlaca = [
{week: 0,
data: [  
  { role: 'Líder', name: 'Martina', result: '-' },
  { role: 'Nominado', name: 'Walter', result: 'Salvado por el líder' },
  { role: 'Nominado', name: 'Marcos', result: '17,96% (Entre 3)' },
  { role: 'Nominado', name: 'Agustín', result: '40,66% (Entre 2)' },
  { role: 'Nominado', name: 'Tomás', result: 'Eliminado (59,40%)' },
],
},
{
  week: 1,
  data: [
  { role: 'Líder', name: 'Maximiliano', result: '-' },
  { role: 'Nominado', name: 'Walter', result: 'Salvado por el líder' },
  { role: 'Nominado', name: 'Nacho', result: '3,03%' },
  { role: 'Nominado', name: 'Juan', result: '39,55%' },
  { role: 'Nominado', name: 'Martina', result: 'Eliminado (57,42%)' },
],
},
{
  week: 2,
  data: [
  { role: 'Líder', name: 'Romina', result: '-' },
  { role: 'Nominado', name: 'Daniela', result: 'Salvado por el líder' },
  { role: 'Nominado', name: 'Walter', result: '6,72% (Entre 4)' },
  { role: 'Nominado', name: 'Agustín', result: '9,93% (Entre 3)' },
  { role: 'Nominado', name: 'Juan', result: '39,93% (Entre 2)' },
  { role: 'Nominado', name: 'Mora', result: 'Eliminado (60,07%)' },
],
},
{
  week: 3,
  data: [
  { role: 'Líder', name: 'Lucila', result: '-' },
  { role: 'Nominado', name: 'Agustín', result: '0,78% (Entre 5)' },
  { role: 'Nominado', name: 'Nacho', result: '3,27% (Entre 4)' },
  { role: 'Nominado', name: 'Daniela', result: '6,53% (Entre 3)' },
  { role: 'Nominado', name: 'Walter', result: '11,86% (Entre 2)' },
  { role: 'Nominado', name: 'Juan', result: 'Eliminado (88,14%)' },
],
},
{
  week: 4,
  data: [
  { role: 'Líder', name: 'Alexis', result: '-' },
  { role: 'Líder', name: 'Nacho', result: '-' },
  { role: 'Nominado', name: 'María Laura', result: 'Salvado por el líder' },
  { role: 'Nominado', name: 'Walter', result: '4,45% (Entre 3)' },
  { role: 'Nominado', name: 'Juliana', result: '34,62% (Entre 2)' },
  { role: 'Nominado', name: 'Lucila', result: 'Eliminado (65,38%)' },
],
},
{
  week: 5,
  data: [
  { role: 'Líder', name: 'Thiago', result: '-' },
  { role: 'Nominado', name: 'Romina', result: 'Salvado por el líder' },
  { role: 'Nominado', name: 'Agustín', result: '5,70% (Entre 4)' },
  { role: 'Nominado', name: 'Nacho', result: '8,86% (Entre 3)' },
  { role: 'Nominado', name: 'María Laura', result: '42,33% (Entre 2)' },
  { role: 'Nominado', name: 'Juliana', result: 'Eliminado (57,67%)' },
],
},
{
  week: 6,
  data: [
  { role: 'Líder', name: 'Romina', result: '-' },
  { role: 'Nominado', name: 'Constanza', result: 'Salvado por el líder' },
  { role: 'Nominado', name: 'Walter', result: '3,17% (Entre 4)' },
  { role: 'Nominado', name: 'Nacho', result: '24,01% (Entre 3)' },
  { role: 'Nominado', name: 'Daniela', result: '47,20% (Entre 2)' },
  { role: 'Nominado', name: 'María Laura', result: 'Eliminado (52,80%)' },
],
},
{
  week: 7,
  data: [
  { role: 'Líder', name: 'Thiago', result: '-' },
  { role: 'Nominado', name: 'Maximiliano', result: 'Salvado por el líder' },
  { role: 'Nominado', name: 'Marcos', result: '1,08% (Entre 5)' },
  { role: 'Nominado', name: 'Julieta', result: '5,78% (Entre 4)' },
  { role: 'Nominado', name: 'Romina', result: '6,42% (Entre 3)' },
  { role: 'Nominado', name: 'Nacho', result: '23,53% (Entre 2)' },
  { role: 'Nominado', name: 'Agustín', result: 'Eliminado (76,47%)' },
],
},
{
  week: 8,
  data: [
  { role: 'Líder', name: 'Thiago', result: '-' },
  { role: 'Nominado', name: 'Alexis', result: 'Salvado por el líder' },
  { role: 'Nominado', name: 'Romina', result: '7,97% (Entre 3)' },
  { role: 'Nominado', name: 'Julieta', result: '26,71% (Entre 2)' },
  { role: 'Nominado', name: 'Daniela', result: 'Eliminado (73,29%)' },
],
},
{
  week: 9,
  data: [
  { role: 'Líder', name: 'Alexis', result: '-' },
  { role: 'Salvado', name: 'Juliana', result: '3 votos' },
  { role: 'Salvado', name: 'Daniela', result: '40,98% (Entre 8)' },
  { role: 'Salvado', name: 'Agustín', result: '47,15% (Entre 3)' },
  { role: 'Salvado', name: 'Lucila', result: '68,76% (Entre 2)' },
  { role: 'En repechaje', name: 'Mora', result: 'Eliminado (31,24%)' },
  { role: 'En repechaje', name: 'Martina', result: 'Eliminado (7,85%)' },
  { role: 'En repechaje', name: 'Tomás', result: 'Eliminado (5,64%)' },
  { role: 'En repechaje', name: 'Juan', result: 'Eliminado (2,89%)' },
  { role: 'En repechaje', name: 'María Laura', result: 'Eliminado (2,19%)' },
],
},
{
  week: 10,
  data: [
  { role: 'Líder', name: 'Thiago', result: '-' },
  { role: 'Nominado', name: 'Camila', result: '0,72% (Entre 5)' },
  { role: 'Nominado', name: 'Walter', result: '5,55% (Entre 4)' },
  { role: 'Nominado', name: 'Daniela', result: '13,12% (Entre 3)' },
  { role: 'Nominado', name: 'Ariel', result: '32,65% (Entre 2)' },
  { role: 'Nominado', name: 'Constanza', result: 'Eliminado (67,35%)' },
],
},
{
  week: 11,
  data: [
  { role: 'Líder', name: 'Nacho', result: '-' },
  { role: 'Nominado', name: 'Lucila', result: 'Salvado por el líder' },
  { role: 'Nominado', name: 'Agustín', result: '15,80% (Entre 3)' },
  { role: 'Nominado', name: 'Ariel', result: '43,81% (Entre 2)' },
  { role: 'Nominado', name: 'Alexis', result: 'Eliminado (56,19%)' },
],
},
{
  week: 12,
  data: [
  { role: 'Líder', name: 'Maximiliano', result: '-' },
  { role: 'Nominado', name: 'Nacho', result: 'Salvado por el líder' },
  { role: 'Nominado', name: 'Camila', result: '7,82% (Entre 3)' },
  { role: 'Nominado', name: 'Agustín', result: '47,10% (Entre 2)' },
  { role: 'Nominado', name: 'Thiago', result: 'Eliminado (52,90%)' },
],
},
{
  week: 13,
  data: [
  { role: 'Líder', name: 'Marcos', result: '-' },
  { role: 'Nominado', name: 'Agustín', result: 'Salvado por el líder' },
  { role: 'Nominado', name: 'Nacho', result: '15,02% (Entre 3)' },
  { role: 'Nominado', name: 'Ariel', result: '47,98% (Entre 2)' },
  { role: 'Nominado', name: 'Maximiliano', result: 'Eliminado (52,02%)' },
],
},
{
  week: 14,
  data: [
  { role: 'Líder', name: 'Marcos', result: '-' },
  { role: 'Líder', name: 'Romina', result: '-' },
  { role: 'Nominado', name: 'Ariel', result: 'Salvado por el líder' },
  { role: 'Nominado', name: 'Lucila', result: '3,38% (Entre 3)' },
  { role: 'Nominado', name: 'Daniela', result: '49,19% (Entre 2)' },
  { role: 'Nominado', name: 'Agustín', result: 'Eliminado (50,81%)' },
],
},
{
  week: 15,
  data: [
  { role: 'Líder', name: 'Camila', result: '-' },
  { role: 'Nominado', name: 'Walter', result: 'Salvado por el líder' },
  { role: 'Nominado', name: 'Marcos', result: '2% (Entre 4)' },
  { role: 'Nominado', name: 'Nacho', result: '14,63% (Entre 3)' },
  { role: 'Nominado', name: 'Julieta', result: '44,79% (Entre 2)' },
  { role: 'Nominado', name: 'Ariel', result: 'Eliminado (55,21%)' },
],
},  
];

const weekNumber = parseInt(selectedOption) + 1;

const DataTable = ({ week, data }) => {
  return (
    <Table striped bordered hover className="center">
      <thead style={{background:'rgba(40,43,242,0.5)'}}>
        <tr className='encabezadoVotaciones' style={{marginBottom: '10px', backgroundImage: `url(${require('./pictures/HeaderVotaciones.jpg')})`}}>
          <th className='tituloTablaDetalleVotosJugador'>Rol</th>
          <th className='tituloTablaDetalleVotosJugador'>Nombre</th>
          <th className='tituloTablaDetalleVotosJugador'>Resultado</th>
        </tr>
      </thead>
      <tbody style={{background:'rgba(255,255,255,0.6)'}}>
        {data.map((row, index) => (
          <tr key={index}>
            <td className='comboBox'>{row.role}</td>
            <td>{row.name}</td>
            <td>{row.result}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

return (
<div className="content" style={{
marginTop: -10,
backgroundImage: `url(${require('./pictures/FondoPlaca.jpg')})`,
backgroundSize: 'cover',
backgroundRepeat: 'no-repeat',
backgroundPosition: 'center center',
zIndex: -1,
paddingTop: 20,
minHeight: '100vh'
}}>

  <Container style={{marginBottom:10, marginTop:10}}> {/*COMBOBOX PARA SELECCIONAR SEMANA*/}
    <FormSelect value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}
      style={{display:'flex', justifyContent:'center', alignItems:'center', width:'50%', margin:'auto'}}
      className="comboBox">
      {options}
    </FormSelect>
  </Container>

<Container style={{marginBottom:5}}>
  <h6 style={{backgroundImage: `url(${require('./pictures/HeaderVotaciones.jpg')})`}} className="tituloTablasNomAnteriores">PLACA NOMINACIONES {weekNumber}° SEMANA</h6>
  </Container>
  
  <Container style={{}}> {/*TABLA CON RESULTADOS PLACA DE SEMANA SELECCIONADA*/}
    <Table>
    {dataPlaca.map(w => {
    if (w.week === Number(selectedOption)) {
    return <DataTable data={w.data}/>;
    }
    return null;
    })}
    </Table>
  </Container>
  
  <Container style={{marginBottom:5}}>
  <h6 style={{backgroundImage: `url(${require('./pictures/HeaderVotaciones.jpg')})`}} className="tituloTablasNomAnteriores">DETALLE DE VOTACIONES {weekNumber}° SEMANA</h6>
  </Container>

  <Container> {/*TABLA CON DETALLE DE VOTACIONES DE SEMANA SELECCIONADA*/}
    <Table striped bordered hover className="center">
      <thead>
        <tr className='encabezadoVotaciones' style={{marginBottom: '10px', backgroundImage: `url(${require('./pictures/HeaderVotaciones.jpg')})`}}>
          <th className='tituloTablaDetalleVotosJugador'>Jugador</th>
          <th className='tituloTablaDetalleVotosJugador'>Primer Lugar</th>
          <th className='tituloTablaDetalleVotosJugador'>Segundo Lugar</th>
        </tr>
      </thead>
      <tbody style={{background:'rgba(255,255,255,0.6)'}}>
        {data[selectedOption].map((row, index) => (
        <tr key={index}>
          <td className='comboBox'>{row[0]}</td>
          {row.length === 2 && (
          <td colSpan={2}>{row[1]}</td>
          )}
          {row.length === 3 && (
          <>
          <td>{row[1]}</td>
          <td>{row[2]}</td>
          </>
          )}
        </tr>
        ))}
      </tbody>
    </Table>
    <Footer data={data[selectedOption]}/>
  </Container>

  <Container style={{marginTop: '20px'}}>
<Row>
  <Col xs={1}>
  </Col>
  <Col xs={8} className="lineaDivisoria2" style={{width:'60%'}}>
  </Col>
  <Col xs={1}>
  </Col>
  <Col xs={2} className="lineaDivisoria2" style={{width:'20%'}}>
  </Col>
  </Row>
</Container>

  <Container style={{marginBottom:10, marginTop:10}}> {/*COMBOBOX PARA SELECCIONAR JUGADOR*/}
    <FormSelect onChange={handleChange}
    style={{display:'flex', justifyContent:'center', alignItems:'center', width:'50%', margin:'auto'}}
    className="comboBox">
    {participantes.map((option, index) => (
    <option key={index} value={option}>
    {option}
    </option>
    ))}
    </FormSelect>
  </Container>
    
  <Container style={{marginBottom:5}}>
  <h6 style={{backgroundImage: `url(${require('./pictures/HeaderVotaciones.jpg')})`}} className="tituloTablasNomAnteriores">DETALLE DE VOTACIONES DE {selectedName.toUpperCase()}</h6>
  </Container>

  <Container style={{paddingBottom: 5}}> {/*TABLA CON DETALLE DE VOTACIONES DE JUGADOR SELECCIONADO*/}
    <Table striped bordered hover className="center">
      <thead>
        <tr className='encabezadoVotaciones' style={{backgroundImage: `url(${require('./pictures/HeaderVotaciones.jpg')})`}}>
        <th className='tituloTablaDetalleVotosJugador'>Semana</th>
        <th className='tituloTablaDetalleVotosJugador'>Primer Lugar</th>
        <th className='tituloTablaDetalleVotosJugador'>Segundo Lugar</th>
        </tr>
      </thead>
      <tbody style={{background:'rgba(255,255,255,0.6)'}}>
        {results.map((result, index) => (
        <tr key={index}>
        <td className='comboBox'>{result.week}</td>
        {result.vote.length === 1 && (
        <td colSpan={2}>{result.vote[0]}</td>
        )}
        {result.vote.length === 2 && (
        <>
        <td>{result.vote[0]}</td>
        <td>{result.vote[1]}</td>
        </>
        )}
        </tr>
        ))}
      </tbody>
    </Table>
  </Container>      

</div>
);
};
export default NominAnteriores;