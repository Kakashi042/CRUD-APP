import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Create from './components/Create'
import Read from './components/Read'
import Update from './components/Update'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Create />}/>
          <Route exact path='/read' element={<Read />}/>
          <Route exact path='/edit/:id' element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
