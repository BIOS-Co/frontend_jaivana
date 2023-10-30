import React from 'react'
import './Lobby.css'
import Navigationbar from '../../Components/Navbar/Navbar'
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Imagen_1 from '../../img/Fondo_1.jpg';
import Imagen_2 from '../../img/Fondo_2.jpg';
import Imagen_3 from '../../img/Fondo_3.jpg';
import Fondo from '../../img/Background_1.jpg';
import '../../index.css';
import {useNavigate} from 'react-router-dom';

export default function Lobby() {

  
  /* NAVIGATE */

  const navigate=useNavigate();


  const redirect=(type)=>{

    if(type == 'products'){

      navigate('/Products')

    }else{
      navigate('/Price')
    }

  }


  return (
    <div className='body'>
        <Navigationbar ></Navigationbar>
        <div className='carouselBody font' style={{backgroundImage: `url(${Fondo})`,backgroundSize:'cover'}}>
            <p className='font title ' id='dropdown-basic'>¿Que deseas realizar?</p>
            <p className='font description'>Selecciona una de las dos opciones para hacer inferencia, en el cual puedes encontrar nuestro sistema de recomendación de productos o fijación de precios</p>
            <div className='cardsContainer'>
                <div className='card' style={{backgroundImage: `url(${Imagen_3})`,backgroundSize:'cover',opacity:0.4}}>
                    <button onClick={()=>redirect('products')} className='textCard' style={{position:'relative',bottom:'12px'}}>Recomendación de productos</button>
                </div>
                <div className='card' style={{backgroundImage: `url(${Imagen_2})`,backgroundSize:'cover',opacity:0.4}}>
                    <button onClick={()=>redirect('price')} className='textCard' style={{position:'relative',bottom:'12px'}}>Fijado de precios</button>
                </div>
            </div>
        </div>
        
    </div>
  )
}