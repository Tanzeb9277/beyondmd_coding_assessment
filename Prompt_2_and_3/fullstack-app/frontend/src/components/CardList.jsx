import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import NewCatForm from './NewCatForm';
import EditCatForm from './EditCatForm';
import CatCard from './CatCard';


// This component renders a list of cat cards.
const CardList = () => {

    // State variables to store the list of cats and whether or not the data is loading.
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editCatName, setEditCatName] = useState("")
    const [editCatPk, setEditCatPk] = useState("")
    const [editCatImage, setEditCatImage] = useState("")
  
    // Effect hook to fetch the list of cats on component mount.
    useEffect(() => {
      // Set the loading state to true.
      setIsLoading(true);
  
      // Fetch the list of cats.
      getCats();
    }, []);
  
    // Function to fetch the list of cats from the API.
    const getCats = () => {
      // Set the loading state to true.
      setIsLoading(true);
  
      // Make an HTTP GET request to the cats endpoint.
      axios.get('http://localhost:8000/app/cats/')
        .then((response) => {
          // Set the loading state to false.
          setIsLoading(false);
  
          // Store the list of cats in the state variable.
          setData(response.data);
        })
        .catch((error) => {
          // Log the error to the console.
          console.log(error);
        });
    };
  

  
    // Function to delete a cat.
    const deleteCat = (e) => {
      // Prevent the default form submission behavior.
      e.preventDefault();
  
      // Get the primary key of the cat to delete.
      const pk = e.target.getAttribute('data-pk');
  
      // Make an HTTP DELETE request to the delete cat endpoint, passing in the cat's primary key.
      axios.delete(`http://localhost:8000/app/deleteCat/${pk}/`);
  
      // After a short delay, fetch the list of cats again to refresh the UI.
      setTimeout(() => {
        getCats();
      }, 250);
    };

    const displayEditCatForm = (e) =>{

      let pk = e.target.getAttribute('data-pk');
      let name = e.target.getAttribute('data-name');
      let image = e.target.getAttribute('data-image');
      console.log(pk, name, image)
      setEditCatImage(image)
      setEditCatName(name)
      setEditCatPk(pk)
      let cardList = document.getElementById('card-list');
      let catform = document.getElementById('edit-cat-form');
  
      // Display the new cat form and hide the card list.
      catform.style.display = 'flex';
      cardList.style.display = 'none';
  
    }

  
    // Render the list of cat cards.
    return (
      <>
      <NewCatForm handleRefresh={getCats} />
      <EditCatForm handleRefresh={getCats} pk={editCatPk} name={editCatName} image_url={editCatImage}/>
      <div className="card-list" id="card-list">
        {isLoading ? (
          <div className='loading-container'>
            <CircularProgress/>
          </div>
        ) : (
          data.map((cat) => {
            return (
              <CatCard
                key={cat.pk}
                name={cat.fields.name}
                date_named={cat.fields.date_named}
                image_url={cat.fields.image_url}
                pk={cat.pk}
                handleDelete={deleteCat}
                handleEdit={displayEditCatForm}
              />
            );
          })
        )}
      </div>
      </>
    );
  };
  
  export default CardList;