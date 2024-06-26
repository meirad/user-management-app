import React, { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CallIcon from '@mui/icons-material/Call';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { UserContext } from '../../UserContext';
import useCards from './UseCards';
import '../../css/About.css';
import { useNavigate } from 'react-router-dom';
  import IconButton from '@mui/material/IconButton';

  const noPic = 'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcTeyKTG0Gfx42-5Snmu1-18eMPpuY-s4-Mmu12Xl-uC25VGZbk465RUbHKhJnnL8ajf'; 


const FavCard = ({searchInput}) => {
  const { allCards, isLoggedIn, handleFavCard } = useCards();
  const { userInfo } = useContext(UserContext);
  const [likedCards, setLikedCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && allCards.length > 0) {
      const filteredLikedCards = allCards.filter(card => card.likes.includes(userInfo._id));
      setLikedCards(filteredLikedCards);
    }
  }, [allCards, userInfo]);

  const filteredCards = likedCards.filter(card =>
    card.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div>
      <h1 style={{ fontSize: '4em', marginLeft: '70px', fontFamily: 'Roboto, sans-serif', fontWeight: 100 }}>Favorite Cards</h1>
      <h4 style={{ fontSize: '2em', marginLeft: '70px', fontFamily: 'Roboto, sans-serif', fontWeight: 100 }}>Here you can find all your favorite businesses</h4>
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
              margin: 2
            }}
          >
            <CardMedia
              component="img"
              alt="card image"
              height="250px"
              image={card.image.url}
              onError={(e) => {
                e.currentTarget.src = noPic;
                e.currentTarget.onerror = null;
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
            <IconButton color="inherit" onClick={(event) => {
                      event.stopPropagation();
                      window.location.href = `tel:${card.phone}`;
                    }}>
              <CallIcon />
            </IconButton>
              {isLoggedIn ? (
                  card.likes.includes(userInfo._id) ? (
                    <IconButton color="inherit" onClick={(event) => {
                      event.stopPropagation();
                      handleFavCard(card._id);
                    }}>
                      <FavoriteIcon 
                        className="favorite-icon"
                        style={{ color: 'red' }} 
                      />
                    </IconButton>
                  ) : (
                    <IconButton color="inherit" onClick={(event) => {
                      event.stopPropagation();
                      handleFavCard(card._id);
                    }}>
                      <FavoriteIcon 
                        className="favorite-icon"
                      />
                    </IconButton>
                  )
                ) : null}
            </CardActions>
          </Card>
        ))
      ) : (
        <p>No favorite card hearted</p>
      )}
    </div>
    </div>
  );
}

export default FavCard;