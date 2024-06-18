import React from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import axios from 'axios';

const Delete = ({ cardId, bizNumber, token, fetchData }) => {
  const deleteCard = async () => {
    try {
      const config = {
        method: 'delete',
        url: `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
        headers: {
          'x-auth-token': token,
        },
        data: {
          bizNumber,
        },
      };
      await axios(config);
      fetchData();
    } catch (error) {
      console.error('Error during API call:', error);
      // Handle error as needed
    }
  };

  return (
    <DeleteOutlinedIcon
      className="delete-icon"
      onClick={(event) => {
        event.stopPropagation();
        if (window.confirm('Are you sure you want to delete this card?')) {
          deleteCard();
        }
      }}
    />
  );
};

export default Delete;
