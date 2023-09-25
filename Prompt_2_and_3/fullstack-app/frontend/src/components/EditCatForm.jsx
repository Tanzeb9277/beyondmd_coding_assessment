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

import './CarForm.css'

// This is the CatCard component. It takes the following props:
// - name: The cat's name.
// - date_named: The date the cat was named.
// - image_url: The URL of the cat's image.
// - pk: The primary key of the cat in the database.
// - handleEdit: A function to handle editing the cat.
// - handleDelete: A function to handle deleting the cat.
const EditCatForm = ({ handleRefresh, pk, name, image_url }) => {


  const [newCatName, setNewCatName] = useState("");



  // Function to handle the new cat's name change.
  const handleNameChange = (event) => {
    setNewCatName(event.target.value);
  };



  // Function to display an alert if the new cat's name is empty.
  const displayAlert = () => {
    console.log('no name')
    let alert = document.getElementById('edit-name-alert');
    alert.style.display = 'flex';
  };

  // Function to create a new cat with the given name and image URL.
  const editNamedCat = (e) => {
    e.preventDefault();

    if (newCatName !== "") {
        axios.put(`http://localhost:8000/app/updateCat/${pk}/`, {
            name: newCatName,
            image_url: image_url,
          })
        .then(() => {

          // Clear the new cat name input field.
          setNewCatName('');

          // Close the new cat form.
          closeNewCatForm();

          
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
    let catform = document.getElementById('edit-cat-form');
    catform.style.display = 'none';
    cardList.style.display = 'block';
    // After a short delay, refresh the cat list.
    setTimeout(() => {
        handleRefresh();
      }, 350);
  };

  // Render the CatCard component.
  return (
    <div className="cat-form-container" id="edit-cat-form">
      <Card className="cat-form" sx={{
        maxWidth: 400,
        margin: "0 auto",
        padding: "0.1em",
      }}>
        <CardMedia
          sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
          component="img"
          height="250"
          image={image_url}
        />
        <CardContent>
          <TextField
            fullWidth
            label="Edit Cat Name"
            id="fullWidth"
            value={newCatName}
            onChange={handleNameChange}
          />
          <Alert id="edit-name-alert" className="input-alert" severity="error">
            Name can't be empty!
          </Alert>
        </CardContent>
        <CardActions className="card-actions">
          <Button
            size="small"
            variant="contained"
            endIcon={<SendIcon />}
            onClick={editNamedCat}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

// Export the NewCatForm component.
export default EditCatForm;