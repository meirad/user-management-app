import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { GetUserContext } from '../GetUserContext';
import { UserContext } from '../UserContext';

export const useGetUserProfile = () => {
  const { profile, setProfile } = useContext(GetUserContext);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (userInfo) { // Check if userInfo is not null
      console.log(userInfo._id);

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
        console.log(profile);
         
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [userInfo]); // Add userInfo as a dependency to the useEffect hook


};


/*   useEffect(() => {    if (userInfo) {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userInfo._id}`, {
            headers: {
              'x-auth-token': token
            }
          });
        console.log(response.data);
        localStorage.setItem('profile', JSON.stringify(response.data));
        setProfile(response.data);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };

      fetchUserProfile();
    }
  }, []); */



