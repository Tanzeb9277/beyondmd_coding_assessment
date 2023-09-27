import * as React from 'react';
import {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import axios from "axios";

import './CatForm.css'

const NewCatForm = ({ handleRefresh }) => {

  // State variables to store the new cat's name and image.
  const [newCatName, setNewCatName] = useState('');
  const [newCatImage, setNewCatImage] = useState([]);

  // Function to handle the new cat's name change.
  const handleNameChange = (event) => {
    setNewCatName(event.target.value);
  };

  // Effect hook to fetch a new cat image on component mount.
  useEffect(() => {
    getNewCatImage();
  }, []);

  // Function to fetch a new cat image from the free API.
  const getNewCatImage = () => {
    axios.get('https://api.thecatapi.com/v1/images/search')
      .then((response) => {
        console.log(response.data[0].url);
        setNewCatImage(response.data[0].url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to display an alert if the new cat's name is empty.
  const displayAlert = () => {
    let alert = document.getElementById('input-alert');
    alert.style.display = 'flex';
  };

  // Function to create a new cat with the given name and image URL.
  const createNamedCat = (e) => {
    e.preventDefault();

    if (newCatName !== '') {
      axios.post(`http://localhost:8000/app/addCats/`, {
        name: newCatName,
        image_url: newCatImage,
      })
        .then(() => {
          // Clear the new cat name input field.
          setNewCatName('');

          // Close the new cat form.
          closeNewCatForm();

          // Fetch a new cat image.
          getNewCatImage();

          // After a short delay, refresh the cat list.
          setTimeout(() => {
            handleRefresh();
          }, 250);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // Display an alert if the new cat's name is empty.
      displayAlert();
    }
  };

  // Function to close the new cat form.
  const closeNewCatForm = () => {
    let cardList = document.getElementById('card-list');
    let catform = document.getElementById('new-cat-form');
    catform.style.display = 'none';
    cardList.style.display = 'block';
  };

  // Render the CatCard component.
  return (
    <div className="cat-form-container" id="new-cat-form">
      <Card className="cat-form" sx={{
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
          <TextField
            fullWidth
            label="New Cat Name"
            id="fullWidth"
            value={newCatName}
            onChange={handleNameChange}
          />
          <Alert id="input-alert" severity="error">
            Name can't be empty!
          </Alert>
        </CardContent>
        <CardActions className="card-actions">
          <Button
            size="small"
            variant="contained"
            endIcon={<SendIcon />}
            onClick={createNamedCat}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

// Export the NewCatForm component.
export default NewCatForm;