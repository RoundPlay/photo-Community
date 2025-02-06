import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import MainPage from './pages/MainPage';
import Post from './pages/post';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<MainPage />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/post/:id"
          element={<Post />}
        />
      </Routes>
    </>
  );
}

export default App;
