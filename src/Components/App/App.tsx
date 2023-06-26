import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from '../Main/Main';
import Breed from '../Breed/Breed';
import Search from '../Search/Search';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/:breed' element={<Breed />} />
        <Route path='/search' element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
