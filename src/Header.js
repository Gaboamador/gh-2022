/*import React from "react";*/
import React, { useState, useEffect } from "react";
import './App.css';
import gh from './logo.png';
import {Row, Col} from 'react-bootstrap';
import {BsFillHouseFill} from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { navlist } from "./navMenu";
import {AiOutlineRight, AiOutlineDown} from 'react-icons/ai';

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
  
  /*comienzo intento sidebar menu*/  

  const SidebarItem = ({ item, activeSubmenus, toggleSubmenu, closeSidebar, collapseAllSubmenus }) => {
    const isActive = activeSubmenus.includes(item);
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const hasComponent = item.component;
  
    if (hasComponent) { // If item has a component, render a Link
      return (
        <li>
          <Link
            to={item.link}
            className="submenu-arrow"
            onClick={() => {
              closeSidebar();
              collapseAllSubmenus();
            }}
          >
            {item.desc}
          </Link>
        </li>
      );
    }
    return (
      <li>
        <div className={`submenu-arrow ${isActive ? 'open' : ''}`} onClick={() => toggleSubmenu(item)}>
    {item.desc}
    {hasSubmenu && isActive && (<AiOutlineDown/>)}
    {hasSubmenu && !isActive && <AiOutlineRight/>}
  </div>
        {hasSubmenu && isActive && (
          <ul className="nested-submenu">
            {item.submenu.map((subItem, subIndex) => (
              <li key={subIndex}>
                {subItem.link || subItem.component ? (
                  <Link
                    to={subItem.link}
                    className="navLink"
                    onClick={() => {
                      closeSidebar();
                      collapseAllSubmenus();
                    }}
                  >
                    {subItem.desc}
                  </Link>
                ) : (
                  <SidebarItem
                    item={subItem}
                    activeSubmenus={activeSubmenus}
                    toggleSubmenu={toggleSubmenu}
                    closeSidebar={closeSidebar}
                    collapseAllSubmenus={collapseAllSubmenus}
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };


  const [sidebarOpen, setSidebarOpen] = useState(false);
    
    const [navlistState, setNavlistState] = useState(navlist);
  const [activeSubmenus, setActiveSubmenus] = useState([]);


    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
          // cierra todos los submenús:
          const updatedNavlist = [...navlistState];
          updatedNavlist[0].submenuOpen = false;
          updatedNavlist[1].submenuOpen = false;
          updatedNavlist[2].submenuOpen = false;
          updatedNavlist[3].submenuOpen = false;
          setNavlistState(updatedNavlist);
      }
    


    const collapseAllSubmenus = () => {
      setActiveSubmenus([]);
      // Collapse all submenus logic
    };

    // Define the toggleSubmenu and toggleSubmenu2 functions
    const toggleSubmenu = (item) => {
      if (activeSubmenus.includes(item)) {
        setActiveSubmenus(activeSubmenus.filter(submenu => submenu !== item));
      } else {
        setActiveSubmenus([...activeSubmenus, item]);
      }
    };

    const closeSidebar = () => {
      setSidebarOpen(false);
    };
  /*fin intento sidebar menu*/
    
    return (

  <header id="header" className={`header ${sticky ? "header--sticky" : ""}`}>
  
  <div className={`navMenu ${sidebarOpen ? 'active' : ''}`}>
<ul className="sidebar">
        {navlist.map((item, index) => (
          <SidebarItem
            key={index}
            item={item}
            activeSubmenus={activeSubmenus}
            toggleSubmenu={toggleSubmenu}
            closeSidebar={closeSidebar}
            collapseAllSubmenus={collapseAllSubmenus}
          />
        ))}
      </ul>
    </div>
    

    <div className={`openbtn ${sidebarOpen ? 'active' : ''}`} onClick={toggleSidebar}>
    {/* &#9776;  */}
    {sidebarOpen ? '✖' : '☰'}
    </div>

    <div className="d-flex justify-content-between align-items-center w-100">
    <div className="d-flex align-items-center">
        <h3 className="title-word-class">
          <span className="title-word">GRAN</span>
          <span> </span>
          <span className="title-word second-word">HERMANO</span>
        </h3>
        </div>
        <div className="ml-auto">
        {/* <Link to="/"> */}
        <img src={gh} alt={""} width="40px" height="40px" style={{marginRight:10}}/>
        {/* </Link> */}
        </div>
        {/* <Link to="/">
          <BsFillHouseFill size={32} className="homeIcon" style={{marginLeft:10}}/>
        </Link> */}
      
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