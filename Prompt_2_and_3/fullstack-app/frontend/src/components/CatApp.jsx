import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from "axios";
import CatCard from './CatCard';
import NewCatForm from './NewCatForm';

import './CatApp.css'

const NewCatButton = styled(Button)({
  backgroundColor: 'rgb(0, 178, 149)',
  '&:hover': {
    backgroundColor: '#02f5cd',
  },
  '&:active': {
    backgroundColor: '#029c82',
  }
});


function CatsApp(){
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formValue, setFormValue] = useState("");


    function formatDate(postDate){
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let d = new Date(postDate);
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        return(month + " " + date + " " + year)
      } 

  useEffect(() => {
    setIsLoading(true);
    getCats();


  }, []);




  const getCats = () =>{
    setIsLoading(true);
    axios.get('http://localhost:8000/app/cats/')
      .then((response) => {
        setIsLoading(false);
        console.log(response.data);
        setData(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const displayNewCatForm = () =>{
    let cardList = document.getElementById('card-list')
    let catform = document.getElementById('new-cat-form')
    catform.style.display = "flex"
    cardList.style.display = "none"
  }

  const createNamedCat = (e) =>{
    e.preventDefault();
    axios.post(`http://localhost:8000/app/addCats/`, {name: formValue, image_url: newCatImage})
    setTimeout(() => {
      getTeachers();
    }, 100);
    
  }

  const editCat = (e) =>{
    e.preventDefault();
    let pk = e.target.getAttribute("data-pk")
    axios.put(`http://localhost:8000/app/updateCat/${pk}/`, {name: "Jorge", image_url: "https://cdn2.thecatapi.com/images/MTk0NjI2Mg.jpg"})
    setTimeout(() => {
      getCats();
    }, 100);
  }
  const deleteCat = (e) =>{
    e.preventDefault();
    let pk = e.target.getAttribute("data-pk")
    axios.delete(`http://localhost:8000/app/deleteCat/${pk}/`);
    setTimeout(() => {
      getCats();
    }, 250);
  }


  return(
    <div className='catapp-container'>
        <AppBar component="nav" className='catapp-nav'>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: 'none' }, bgcolor: "white" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Cat App
          </Typography>
          <NewCatButton  variant="contained" onClick={displayNewCatForm}  endIcon={<AddCircleIcon />}>
          Name a Cat
        </NewCatButton>
        </Toolbar>
        
      </AppBar>
      <NewCatForm
          handleRefresh={getCats}
        />
      <div className="card-list" id='card-list'>   

        

        {isLoading ? <div> <h1>Don't worry I'm sure it'll load soon...</h1>
        <img src='https://media1.giphy.com/media/Qt1jk5Q49C3h5CrlBe/giphy.gif?cid=ecf05e47yhx0zneh0tk43v768anrf00rjm4gfl5rga8j6fbc&rid=giphy.gif&ct=g'>
            </img></div> : data.map((cat) => {
            
            return<CatCard
              name={cat.fields.name}
              date_named={cat.fields.date_named}
              image_url={cat.fields.image_url}
              pk={cat.pk}
              handleDelete={deleteCat}
              handleEdit={editCat}
            />;
            
          })}
          </div>
    </div>
  )
}


export default CatsApp;