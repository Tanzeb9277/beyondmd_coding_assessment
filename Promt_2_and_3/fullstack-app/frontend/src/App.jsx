import { useState, useEffect } from 'react'
import axios from "axios";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CatCard from './components/CatCard';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get('http://localhost:8000/app/test/')
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
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let d = new Date(postDate);
    let day = days[d.getDay()];
    let hr = d.getHours();
    let min = d.getMinutes();
    if (min < 10) {
        min = "0" + min;
    }
    let ampm = "am";
    if( hr > 12 ) {
        hr -= 12;
        ampm = "pm";
    }
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return(month + " " + date + " " + year)
  } 


  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">

        <Button variant='contained' endIcon={<AddIcon />} onClick={() => setCount((count) => count + 1)}>Count is {count}</Button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      {isLoading ? <div> <h1>Don't worry I'm sure it'll load soon...</h1>
      <img src='https://media1.giphy.com/media/Qt1jk5Q49C3h5CrlBe/giphy.gif?cid=ecf05e47yhx0zneh0tk43v768anrf00rjm4gfl5rga8j6fbc&rid=giphy.gif&ct=g'></img>
      </div> : data.map((cat) => {
            
            return<CatCard
              name={cat.fields.name}
              date_named={formatDate(cat.fields.date_named)}
              image_url={cat.fields.image_url}
            />;
            
          })}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
