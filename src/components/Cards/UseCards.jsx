import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserFavCardContext } from '../../UserContext';
import { UserContext } from '../../UserContext';

const useCards = () => {
  const [allCards, setAllCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { favoriteCards, setFavoriteCards } = useContext(UserFavCardContext);
  const { userInfo } = useContext(UserContext);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setIsLoggedIn(true);
    }
  }, []);

  const fetchData = async () => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards',
      headers: {}
    };

    try {
      const response = await axios(config);
      setAllCards(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFavCard = async (cardId) => {
    const card = allCards.find(card => card._id === cardId);

    if (card) {
      await likeCard(cardId);
    } else {
      console.log(`Card with id ${cardId} not found.`);
    }
  };

  const likeCard = (cardId) => {
    const config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
      headers: {
        'x-auth-token': token
      }
    };

    axios(config)
      .then(response => {
        setFavoriteCards(response.data);

        setAllCards(prevCards => {
          return prevCards.map(card => card._id === cardId ? response.data : card);
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return { allCards, isLoggedIn, handleFavCard, fetchData };
};

export default useCards;
