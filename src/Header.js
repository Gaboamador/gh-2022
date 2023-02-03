import React from "react";
import './App.css';
import gh from './logo.png';
import {Row, Col, Container} from 'react-bootstrap';

function Header() {
    return (
    <div className="GeneralFont">
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
    </div>
);
}  
export default Header;