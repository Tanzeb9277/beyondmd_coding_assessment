import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import docIcon from './assets/icons8-document-375.png'
import beyondMDLogo from './assets/beyondMD.cc3e2659ac0b245af71b.png'
import HelloBeyondMD from './components/HelloBeyondMD';
import LeftSection from './components/LeftSection';
import Resume from './components/Resume';
import CatsApp from './components/CatApp';

import './App.css'

function App() {



  return (
    <>
      <div className='app-container'>
        <div className="left-section">
          <LeftSection/>
        </div>
        <div className="right-section">
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<HelloBeyondMD/>}/>
              <Route path='/resume' element={<Resume/>}/>
              <Route path='/catApp' element={<CatsApp/>}/>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  )
}

export default App
