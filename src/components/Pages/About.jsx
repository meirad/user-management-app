import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CallIcon from '@mui/icons-material/Call';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { UserContext } from '../../UserContext';
import useCards from '../Cards/UseCards';
import '../../css/About.css';
import Delete from '../Cards/DeleteCard';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

const About = ({ searchInput }) => {
  const { allCards, isLoggedIn, handleFavCard, fetchData } = useCards();
  const [setSelectedCard] = React.useState(null);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

/*   const likedCards = userInfo ? allCards.filter(card => card.likes.includes(userInfo._id)) : []; 
 */  

  const filteredCards = allCards.filter(card =>
    card.title.toLowerCase().includes(searchInput.toLowerCase())
  );


  return (
    <div>
      <h1 style={{ fontSize: '4em', marginLeft: '70px', fontFamily: 'Roboto, sans-serif', fontWeight: 100 }}>Cards</h1>
      <h4 style={{ fontSize: '2em', marginLeft: '70px', fontFamily: 'Roboto, sans-serif', fontWeight: 100 }}>Here you can find all the businesses</h4>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        
        {filteredCards.length > 0 ? (
          filteredCards.map((card, index) => (
            <Card
            key={index}
            onClick={() => {
              navigate(`/businesspage/${card._id}`);
              setSelectedCard(card.id);
            }}
            sx={{
              width: '350px',
              display: 'flex',
              flexDirection: 'column',
              margin: 2,
              cursor: 'pointer'
            }}
          >
            <CardMedia
                component="img"
                alt="card image"
                height="250px"
                src={card.image.url}
                onError={(e) => { 
                  e.target.onerror = null; 
                  e.target.src="default_image_url";
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {card.title}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {card.description}
                </Typography>
                <Divider />
                <Typography variant="body2" color="text.secondary">
                  {`phone: ${card.phone}`}<br />
                  {`email: ${card.email}`}<br />
                  {`address: ${card.address.city} ${card.address.street} ${card.address.houseNumber}`}
                </Typography>
              </CardContent>
              <CardActions>
              <Box display="flex" justifyContent="space-between" width="100%">
  <Box display="flex">
    {isLoggedIn && (
      <>
        <IconButton color="inherit"  onClick={(event) => {
          event.stopPropagation();
          handleFavCard(card._id);
        }}>
          <FavoriteIcon 
            className="favorite-icon"
            style={{ color: card.likes.includes(userInfo._id) ? 'red' : 'inherit' }} 
          />
        </IconButton>
  <IconButton color="inherit" onClick={(event) => {
    event.stopPropagation();
    window.location.href = `tel:${card.phone}`;
      }}>
          <CallIcon />
        </IconButton>
      </>
    )}
  </Box>
  <Box display="flex">
    {isLoggedIn && userInfo.isAdmin && (
      <IconButton color="inherit"  onClick={(event) => {
        event.stopPropagation();
      }}>
        <Delete 
          cardId={card._id} 
          bizNumber={card.bizNumber} 
          token={token} 
          fetchData={fetchData} 
        />
      </IconButton>
    )}
  </Box>
</Box>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography variant="h6" color="text.secondary">
            No cards found.
          </Typography>
        )}
      </div>
    </div>
  );
}

export default About;
