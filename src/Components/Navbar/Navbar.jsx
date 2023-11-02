import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css';

export default function Navigationbar() {
  return (
    <Navbar expand="lg" id='nav_bar' className="bg-body-tertiary" style={{position:'absolute','width':'100%',opacity:0.6}}>
      <Container>
        <Navbar.Brand style={{cursor:'pointer'}} className='titleNav' href="#/Lobby">JAIVANÁ - SUMATEC</Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" style={{display:'flex',alignItems:'center',justifyContent:'center','width':'300px'}}>
            <NavDropdown style={{width:'300px !important'}} className='font_' title="Paginas" id="basic-nav-dropdown">
              <NavDropdown.Item className='font_' href="https://www.sumatec.co/">Sumatec</NavDropdown.Item>
              <NavDropdown.Item className='font_' href="https://www.jaivanaweb.co/">Jaivaná</NavDropdown.Item>
              <NavDropdown.Item className='font_' href="https://www.bios.co/">Bios co.</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse> */}
      </Container>
    </Navbar>
  )
}
