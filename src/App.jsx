import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/sidebar';
import Login from './pages/login';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Sidebar />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
      </Routes>
    </>
  );
}

export default App;
