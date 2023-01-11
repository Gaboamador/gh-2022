import gh from './logo.png';
import './App.css';
import ContadorFinal from './ContadorFinal';
import {Row, Col, Container} from 'react-bootstrap';

function App() {  
  return (  

<div>
  <header className="App-header">
    <Container>
      <Row className="d-flex align-items-center justify-content-center">
        <Col xs={1} className="mx-auto align-items-right">
          <img src={gh} alt={""} width="40px" height="40px"/>
        </Col>
        <Col xs={10}>
          <div class="col10-class">
            <h3 class="title-word-class">
              <span class="title-word">GRAN</span>&nbsp;&nbsp;
              <span class="title-word second-word">HERMANO</span>
            </h3>
          </div>
        </Col>
      </Row>
    </Container>
  </header>
  
  <div> {/*CONTENEDOR CON LA APLICACIÓN*/}
    <Container>
      <Row>
        <Col><ContadorFinal words={[]} /></Col>
      </Row>
    </Container>
  </div>

</div>  
  );  
}  
export default App;  

