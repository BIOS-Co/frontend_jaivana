import './App.css';
import React from 'react';

/* COMPONENTS */
import Lobby from './Router/Lobby/Lobby';
import Price from './Router/Price/Price';
import Products from './Router/Products/Products';
import { Navigate,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path = '' element={<Navigate to='/Lobby'></Navigate>}></Route>
        <Route path = '/Lobby/*' element={<Lobby></Lobby>}></Route>
        <Route path = '/Price/*' element={<Price></Price>}></Route>
        <Route path = '/Products/*' element={<Products></Products>}></Route>
        <Route path = '*' element={<Navigate to='/Lobby'></Navigate>}></Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
