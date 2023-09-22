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

const CatCard = ({ name, date_named, image_url, pk, handleEdit, handleDelete }) =>{
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
          Named on: {date_named}
        </Typography>
      </CardContent>
      <CardActions className='card-actions' >
        <Button size="small" variant='contained' data-pk={pk} endIcon={<EditIcon/>} onClick={handleEdit}>Edit</Button>
        <Button size="small" variant='contained' data-pk={pk} startIcon={<DeleteIcon/>} onClick={handleDelete}>Delete</Button>
      </CardActions>
    </Card>
  );
}

export default CatCard;