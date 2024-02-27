import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalState from "./globalState";
import Header from "./componentes/Header";
import Home from './pages/Home';
import ContadorNominaciones from "./pages/ContadorNominaciones";
import VotacionesPorJugador from './pages/VotacionesPorJugador';
import VotacionesPorSemana from './pages/VotacionesPorSemana';
import ListadoLideres from './pages/ListadoLideres';
import ListadoEliminados from './pages/ListadoEliminados';
import PlacasPorSemana from './pages/PlacasPorSemana';
import PlacasEnContinuado from './pages/PlacasEnContinuado';
import GraficoVotos from './pages/GraficoVotos';

function App() {  
return (
  <div className="GeneralFont">
    <Router>
    <GlobalState>
      <Header/>
      <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route path="/ContadorNominaciones" element={<ContadorNominaciones/>}></Route>
          <Route path="/VotacionesPorJugador" element={<VotacionesPorJugador/>}></Route>
          <Route path="/VotacionesPorSemana" element={<VotacionesPorSemana/>}></Route>
          <Route path="/ListadoLideres" element={<ListadoLideres/>}></Route>
          <Route path="/ListadoEliminados" element={<ListadoEliminados/>}></Route>
          <Route path="/PlacasPorSemana" element={<PlacasPorSemana/>}></Route>
          <Route path="/PlacasEnContinuado" element={<PlacasEnContinuado/>}></Route>
          <Route path="/GraficoVotos" element={<GraficoVotos/>}></Route>
        </Routes>
        </GlobalState>
    </Router>
  </div>
);
}  
export default App;