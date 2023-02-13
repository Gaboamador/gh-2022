import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header'
import Navbar from './Navbar';
import Home from './Home';
import ContadorNominaciones from './ContadorNominaciones';
import NominAnteriores from './NominAnteriores';
import ListadoRolesNominaciones from './ListadoRolesNominaciones';

function App() {  
return (
  <div className="GeneralFont">
    <Header/>
    <Router>
      <Navbar />
      <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route path="/ContadorNominaciones" element={<ContadorNominaciones/>}></Route>
          <Route path="/NominAnteriores" element={<NominAnteriores/>}></Route>
          <Route path="/ListadoRolesNominaciones" element={<ListadoRolesNominaciones/>}></Route>
        </Routes>
    </Router>
  </div>
);
}  
export default App;