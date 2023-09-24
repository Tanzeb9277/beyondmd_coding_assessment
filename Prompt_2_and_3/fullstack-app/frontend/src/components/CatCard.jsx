import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

import './CatCard.css'

// This is the CatCard component. It takes the following props:
// - name: The cat's name.
// - date_named: The date the cat was named.
// - image_url: The URL of the cat's image.
// - pk: The primary key of the cat in the database.
// - handleEdit: A function to handle editing the cat.
// - handleDelete: A function to handle deleting the cat.
const CatCard = ({ name, date_named, image_url, pk, handleEdit, handleDelete }) =>{

   // Add validation to the props
   if (!name || !date_named || !image_url) {
    throw new Error('Invalid props passed to CatCard component');
  }

  function formatDate(postDate){
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let d = new Date(postDate);
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return(month + " " + date + " " + year)
  }
  
  // Render the CatCard component.
  return (
    <Card className='cat-card' sx={{
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
        <Typography gutterBottom variant="h5" component="div">
          Name: {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Named on: {formatDate(date_named)}
        </Typography>
      </CardContent>
      <CardActions className='card-actions' >

        <Button size="small" 
        variant='contained' 
        data-pk={pk} 
        data-name={name} 
        data-image={image_url}   
        endIcon={<EditIcon/>} 
        onClick={handleEdit}>
          Edit
        </Button>

        <Button size="small" variant='contained' 
        data-pk={pk}
        startIcon={<DeleteIcon/>} 
        onClick={handleDelete}>
          Delete
        </Button>
        
      </CardActions>
    </Card>
  );
}

// Export the CatCard component.
export default CatCard;