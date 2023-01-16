import gh from './logo.png';
import './App.css';
import ContadorFinal from './ContadorFinal';
import ModeloNuevo from './ModeloNuevo';
import {Row, Col, Container} from 'react-bootstrap';

function App() {  
  
/*LÍNEA DIVISORIA PARA DIFERENCIAR LOS DOS ELEMENTOS*/
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
/*LÍNEA DIVISORIA PARA DIFERENCIAR LOS DOS ELEMENTOS*/

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
    <Container> {/*LÍNEA DIVISORIA PARA DIFERENCIAR LOS DOS ELEMENTOS*/}
    <ColoredLine color= "RED" />
    </Container> {/*LÍNEA DIVISORIA PARA DIFERENCIAR LOS DOS ELEMENTOS*/}
    <Container>
      <Row>
        <Col><ModeloNuevo words={[]}/></Col>
      </Row>
    </Container>
  </div>

</div>  
  );  
}  
export default App;  

