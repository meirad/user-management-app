import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { GetUserContext } from '../GetUserContext';
import { UserContext } from '../UserContext';

export const useGetUserProfile = () => {
  const { profile, setProfile } = useContext(GetUserContext);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (userInfo) { 
      var config = {
        method: 'get',
        maxBodyLength: 'Infinity',  
        url: `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userInfo._id}`,
        headers: {
          'x-auth-token': token
        }
      };

      axios(config)
        .then(function (response) {
          const profiles = response.data;
        setProfile(profiles);         
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [userInfo]); 


};

