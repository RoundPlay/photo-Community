import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Sidebar } from './components/sidebar';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Sidebar></Sidebar>
    </>
  )
}

export default App
