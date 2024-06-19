import React from 'react';
import axios from 'axios';

const DeleteAccount = () => {
  const handleDelete = () => {
    axios.delete('DELETE_ACCOUNT_ENDPOINT_URL', { headers: { Authorization: 'Bearer TOKEN' } })
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  };

  return <button onClick={handleDelete}>Delete Account</button>;
};

export default DeleteAccount;
