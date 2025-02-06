import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Home } from './pages/home';

import Login from './pages/login';
import MainPage from './pages/MainPage';
import Post from './pages/post';

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
        {/* <Route
          path="/"
          element={<MainPage />}
        /> */}
        <Route
          path="/"
          element={<Home></Home>}></Route>
      </Routes>
    </>
  );
}

export default App;
