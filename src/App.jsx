import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './App.css';

import { Home } from './pages/home';
import Login from './pages/login';
import Post from './pages/post';
import SignUp from './pages/Signup';



function App() {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/post/:id"
          element={<Post />}
        />
        <Route
          path="/"
          element={<Home></Home>}></Route>
        <Route
          path="/signup"
          element={<SignUp />}
        />
      </Routes>
    </>
  );
}

export default App;
