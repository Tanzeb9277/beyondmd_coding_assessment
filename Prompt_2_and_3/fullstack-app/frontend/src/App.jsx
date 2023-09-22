import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import docIcon from './assets/icons8-document-375.png'
import beyondMDLogo from './assets/beyondMD.cc3e2659ac0b245af71b.png'
import HelloBeyondMD from './components/HelloBeyondMD';
import Resume from './components/Resume';

import './App.css'

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get('http://localhost:8000/app/cats')
      .then((response) => {
        setIsLoading(false);
        console.log(response.data);
        setData(response.data)
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);


  function formatDate(postDate){
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let d = new Date(postDate);
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return(month + " " + date + " " + year)
  } 


  return (
    <>
      <div className='app-container'>
        <div className="left-section">
          <div className='sticky'>
            <div className="logo">
              <img src={beyondMDLogo} alt=""  />
            </div>
            <div className="header">
              <h1>Hi! 👋</h1>
              <h4>Welcome to BeyondMD Coding assessment 2023</h4>
            </div>
            <div className="section-selector">
              <h3>Lets start using The Cat App</h3>
              <div className="nav-menu">
              <div className="nav-item">
                <div className="nav-icon hello">
                  <img src='https://img.icons8.com/?size=200&id=dlN23b953qvQ&format=png' alt=""  />
                </div>
                <a href="/"><button>Hello BeyonMD</button></a>
              </div>
              <div className="nav-item">
                <div className="nav-icon resume">
                  <img src={docIcon} alt=""  />
                </div>
                <a href="/resume"><button>Resume</button></a>
              </div>
              <div className="nav-item">
                <div className="nav-icon app">
                  <img src="https://img.icons8.com/?size=200&id=GEAs8ke5mB3W&format=png" alt=""  />
                </div>
                <a href=""><button>Name a Cat</button></a>
              </div>
              
            </div>
          </div>
          </div>
          
        </div>
        <div className="right-section">
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<HelloBeyondMD/>}/>
              <Route path='/resume' element={<Resume/>}/>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  )
}

export default App
