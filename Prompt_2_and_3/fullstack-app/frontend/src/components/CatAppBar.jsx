import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';


// This component renders the app bar for the Cat App.
const CatAppBar = () => {

    // A styled button component for adding a new cat.
    const NewCatButton = styled(Button)({
      backgroundColor: 'rgb(0, 178, 149)',
      '&:hover': {
        backgroundColor: '#02f5cd',
      },
      '&:active': {
        backgroundColor: '#029c82',
      },
    });
  
    // Function to display the new cat form.
    const displayNewCatForm = () => {
      // Get the card list and new cat form elements.
      let cardList = document.getElementById('card-list');
      let catform = document.getElementById('new-cat-form');
  
      // Display the new cat form and hide the card list.
      catform.style.display = 'flex';
      cardList.style.display = 'none';
    };
  
    // Render the app bar.
    return (
      <AppBar component="nav" className="catapp-nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: 'none' }, bgcolor: 'white' }}
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
          <NewCatButton
            variant="contained"
            onClick={displayNewCatForm}
            endIcon={<AddCircleIcon />}
          >
            Name a Cat
          </NewCatButton>
        </Toolbar>
      </AppBar>
    );
  };
  
  // Export the CatAppBar component.
  export default CatAppBar;