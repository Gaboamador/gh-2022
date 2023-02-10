import React from "react";
import './App.css';
import ContadorNominaciones from './ContadorNominaciones';
import Header from './Header'


import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NominAnteriores from './NominAnteriores';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {  
return (
<div className="GeneralFont">
  <Header/>
  {/*<ContadorNominaciones/> */}

  {/* ACÁ VA TODO LO QUE SE VE EN LA PANTALLA PRINCIPAL */}
<div><p>PRUEBA</p></div>

{/* ACÁ VA TODO LO QUE SE VE EN LA PANTALLA PRINCIPAL */}
    <Router >
  <Navbar />
    <Routes>
      <Route path="/gh-2022" element={<Home />}></Route>
      <Route path="/ContadorNominaciones" element={<ContadorNominaciones />}></Route>
      <Route path="/NominAnteriores" element={<NominAnteriores />}></Route>
    </Routes>
</Router>
    
    
    
    
    
    
    
</div>
);
}  
export default App;