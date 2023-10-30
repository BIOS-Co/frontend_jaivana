import React from 'react'
import './Lobby.css'
import Navigationbar from '../../Components/Navbar/Navbar'
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Imagen_1 from '../../img/Fondo_1.jpg';
import Imagen_2 from '../../img/Fondo_2.jpg';
import Imagen_3 from '../../img/Fondo_3.jpg';
import Fondo from '../../img/Background_2.jpg';

export default function Lobby() {


  return (
    <div className='body'>
        
        <div className='carouselBody' style={{backgroundImage: `url(${Fondo})`,backgroundSize:'cover'}}>
            
        </div>
        
    </div>
  )
}
