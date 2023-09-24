import * as React from 'react';
import {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import axios from "axios";

import './CarForm.css'

const NewCatForm = ({handleRefresh}) =>{

  const [newCatName, setNewCatName] = useState("")
  const [newCatImage, setNewCatImage] = useState([]);
  const handleNameChange = (event) => {
    setNewCatName(event.target.value);
  };

  useEffect(() => {
    getNewCatImage();
  }, [])

  const getNewCatImage = () =>{
    axios.get('https://api.thecatapi.com/v1/images/search')
      .then((response) => {
        console.log(response.data[0].url)
        setNewCatImage(response.data[0].url)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const createNamedCat = (e) =>{
    e.preventDefault();
    axios.post(`http://localhost:8000/app/addCats/`, {name: newCatName, image_url: newCatImage})
    setNewCatName("")
    closeNewCatForm();
    getNewCatImage();
    setTimeout(() => {
        handleRefresh();
      }, 250);
  }

  const closeNewCatForm = () =>{
    let cardList = document.getElementById('card-list')
    let catform = document.getElementById('new-cat-form')
    catform.style.display = "none"
    cardList.style.display = "block"
  }

  // Render the CatCard component.
  return (
    <div className="cat-form-container" id='new-cat-form'>
      
      <Card className='cat-form' sx={{
        maxWidth: 400,
        margin: "0 auto",
        padding: "0.1em",
      }}>
        <CardMedia 
          sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
          component="img"
          height="250"
          image={newCatImage}
        />
        <CardContent>
          <TextField fullWidth label="New Cat Name" id="fullWidth" value={newCatName} onChange={handleNameChange} />
        </CardContent>
        <CardActions className='card-actions' >
          <Button size="small" variant='contained' endIcon={<SendIcon/>} onClick={createNamedCat}>Submit</Button>
        </CardActions>
      </Card>
    </div>
  );
}

// Export the NewCatForm component.
export default NewCatForm;