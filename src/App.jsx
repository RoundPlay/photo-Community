import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Home } from './pages/home';

import Login from './pages/login';

import Post from './pages/post';

function App() {
  return (
    <>
      <Routes>

        <Route path='/login' element={<Login />} />
        <Route path='/post/:id' element={<Post />} />
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login />} />

      </Routes>
    </>
  );
}

export default App;
