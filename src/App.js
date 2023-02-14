import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header'
/*import Navbar from './Navbar';*/
import Home from './Home';
import ContadorNominaciones from './ContadorNominaciones';
import NominAnteriores from './NominAnteriores';
import ListadoRolesNominaciones from './ListadoRolesNominaciones';
import VotacionesPorJugador from './VotacionesPorJugador';
import VotacionesPorSemana from './VotacionesPorSemana';
import ListadoLideres from './ListadoLideres';
import ListadoEliminados from './ListadoEliminados';
import PlacasPorSemana from './PlacasPorSemana';
import PlacasEnContinuado from './PlacasEnContinuado';

function App() {  
return (
  <div className="GeneralFont">    
    <Router>
      <Header/>
      {/*<Navbar />*/}
      <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route path="/ContadorNominaciones" element={<ContadorNominaciones/>}></Route>
          {/*<Route path="/NominAnteriores" element={<NominAnteriores/>}></Route>*/}
          {/*<Route path="/ListadoRolesNominaciones" element={<ListadoRolesNominaciones/>}></Route>*/}
          <Route path="/VotacionesPorJugador" element={<VotacionesPorJugador/>}></Route>
          <Route path="/VotacionesPorSemana" element={<VotacionesPorSemana/>}></Route>
          <Route path="/ListadoLideres" element={<ListadoLideres/>}></Route>
          <Route path="/ListadoEliminados" element={<ListadoEliminados/>}></Route>
          <Route path="/PlacasPorSemana" element={<PlacasPorSemana/>}></Route>
          <Route path="/PlacasEnContinuado" element={<PlacasEnContinuado/>}></Route>
        </Routes>
    </Router>
  </div>
);
}  
export default App;