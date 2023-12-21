/*import React from "react";*/
import React, { useState, useEffect } from "react";
import './App.css';
import gh from './logo.png';
import {Row, Col} from 'react-bootstrap';
import {BsFillHouseFill} from 'react-icons/bs';
import { Link } from 'react-router-dom';

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

  <header id="header" className={`header ${sticky ? "header--sticky" : ""}`}>
  <div>
    <Row className="align-items-center justify-content-between">
      <Col className="d-flex align-items-center">
      <Link to="/">
        <img src={gh} alt={""} width="40px" height="40px" style={{marginRight:10}}/>
        </Link>
        <h3 className="title-word-class">
          <span className="title-word">GRAN</span>
          <span> </span>
          <span className="title-word second-word">HERMANO</span>
        </h3>
        <Link to="/">
          <BsFillHouseFill size={32} className="homeIcon" style={{marginLeft:10}}/>
        </Link>
      </Col>
    </Row>
  </div>
</header>

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