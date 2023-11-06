import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css';
import jaivana from '../../img/jaivana_logo.png';
import sumatec from '../../img/Sumatec_logo.png';

export default function Navigationbar() {
  return (
    <div className="Navbar" >
      <Container style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <img src={jaivana} alt = 'jaivana logo' className='logo'></img>
        <img src={sumatec} alt = 'jaivana logo' className='logo logo_movil'></img>
      </Container>
    </div>
  )
}
