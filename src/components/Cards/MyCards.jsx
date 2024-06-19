import React, { useState, useEffect, useContext } from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, Divider, Box, IconButton, Snackbar, Alert } from '@mui/material';
import { Call as CallIcon, Favorite as FavoriteIcon, AddCircle as AddCircleIcon, Create as CreateIcon } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Delete from './DeleteCard';
import '../../css/MyCards.css';
import { UserContext } from '../../UserContext';
import { CardContext } from '../../cardContext';
import useCards from './UseCards';

const MyCards = ({ searchInput }) => {
  const navigate = useNavigate();
  const [myCards, setMyCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [errors, setErrors] = useState({});
  const { userInfo } = useContext(UserContext);
  const { snackbarOpen, setSnackbarOpen, setSnackbarMessage, snackbarMessage } = useContext(CardContext); 
  const { handleFavCard } = useCards();
  const token = localStorage.getItem('token');

  const handleClick = () => {
    navigate('/create');
  };

  const fetchData = async () => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards',
      headers: {
        'x-auth-token': token,
      },
    };
    try {
      const response = await axios(config);
      setMyCards(response.data);
    } catch (error) {
      console.error('Error during API call:', error);
      setErrors({ ...errors, submit: error.message });
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const filteredCards = myCards.filter(card =>
    card.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleSnackbarClose = () => {
     setSnackbarOpen(false); 
  };

  const toggleFavorite = async (cardId) => {
    try {
      await handleFavCard(cardId);
      setMyCards(prevCards =>
        prevCards.map(card =>
          card._id === cardId
            ? { ...card, likes: card.likes.includes(userInfo._id) ? card.likes.filter(id => id !== userInfo._id) : [...card.likes, userInfo._id] }
            : card
        )
      );
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '4em', marginLeft: '70px', fontFamily: 'Roboto, sans-serif', fontWeight: 100 }}>My Cards</h1>
      <h4 style={{ fontSize: '2em', marginLeft: '70px', fontFamily: 'Roboto, sans-serif', fontWeight: 100 }}>Here you can find all your businesses</h4>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <div className="my-cards-container">
        {filteredCards.length > 0 ? (
          filteredCards.map((card, index) => (
            <Card
            key={card._id}
            onClick={() => {
              navigate(`/businesspage/${card._id}`);
              setSelectedCard(card.id);
            }}
              sx={{
                width: '350px',
                display: 'flex',
                flexDirection: 'column',
                margin: 2,
              }}
            >
              <CardMedia
                component="img"
                alt="card image"
                height="250px"
                image={card.image.url}
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
                    <IconButton color="inherit" onClick={(event) => {
                      event.stopPropagation();
                      window.location.href = `tel:${card.phone}`;
                    }}>
                      <CallIcon className='call-icon' />
                    </IconButton>
                    <IconButton color="inherit" onClick={(event) => {
                      event.stopPropagation();
                      toggleFavorite(card._id);
                    }}>
                      <FavoriteIcon 
                        className="favorite-icon" color="inherit"
                        style={{ color: card.likes.includes(userInfo._id) ? 'red' : 'inherit' }} 
                      />
                    </IconButton>
                  </Box>
                  <Box display="flex">
                    <IconButton color="inherit" onClick={(event) => {
                      event.stopPropagation();
                      navigate(`/edit/${card._id}`);
                    }}>
                      <CreateIcon className="edit-icon" />
                    </IconButton>
                    <IconButton color="inherit" onClick={(event) => {
                      event.stopPropagation();
                    }}>
                      <Delete  
                        cardId={card._id} 
                        bizNumber={card.bizNumber} 
                        token={token} 
                        fetchData={fetchData} 
                      />
                    </IconButton>
                  </Box>
                </Box>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography variant="h6" color="text.secondary">
            No cards available
          </Typography>
        )}
        <AddCircleIcon
          className="add-icon"
          onClick={handleClick}
          style={{
            fontSize: 50,
            position: 'fixed',
            right: 15,
            bottom: 60,
          }}
        />
        <Snackbar
          open={snackbarOpen} 
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            New card created successfully!!!
          </Alert>
        </Snackbar>
        {errors.submit && (
          <Typography variant="body2" color="error">
            {errors.submit}
          </Typography>
        )}
      </div>
    </div>
    </div>
  );
};

export default MyCards;
