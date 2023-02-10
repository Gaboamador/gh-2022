/*import React from "react";*/
import React, { useState, useEffect } from "react";
import './App.css';
import gh from './logo.png';
import {Row, Col, Container} from 'react-bootstrap';


const Header = () => {
    const [sticky, setSticky] = useState(false);
  
    useEffect(() => {
      const header = document.getElementById("header");
      const handleScroll = () => {
        if (window.pageYOffset > header.offsetTop) {
          setSticky(true);
        } else {
          setSticky(false);
        }
      };
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
    
    return (
<div className="GeneralFont">
        <header id="header"
        className={`header ${sticky ? "header--sticky" : ""}`}>
            <Container>
                <Row className="d-flex align-items-center justify-content-center">
                    <Col xs={1} className="mx-auto align-items-right">
                        <img src={gh} alt={""} width="40px" height="40px" className="App-logo"/>
                    </Col>
                    <Col xs={10}>
                        <div class="col10-class">
                            <h3 class="title-word-class">
                            <span class="title-word">GRAN</span>
                            <span class="title-word second-word">HERMANO</span>
                            </h3>
                        </div>
                    </Col>
                </Row>
            </Container>
        </header>
    </div>
    );
  };
  
/*function Header() {
    return (
    <div className="GeneralFont">
        <header id="header"
        className={`header ${sticky ? "header--sticky" : ""}`}>
            <Container>
                <Row className="d-flex align-items-center justify-content-center">
                    <Col xs={1} className="mx-auto align-items-right">
                        <img src={gh} alt={""} width="40px" height="40px" className="App-logo"/>
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
} */ 
export default Header;