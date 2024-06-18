import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import { UserContext } from '../UserContext';
import { useMediaQuery } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

export default function SimpleBottomNavigation({ currentRoute }) {
  const { userInfo } = useContext(UserContext);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      const decoded = JSON.parse(storedUserInfo);
      setIsLoggedIn(true);
    }
  }, []);

  const handleChange = (event, newValue) => {
    window.location.href = newValue; 
  };

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
      <BottomNavigation 
        value={currentRoute}
        onChange={handleChange}
        showLabels
      >
        <BottomNavigationAction 
          label="About" 
          value="/" 
          icon={<InfoIcon />} 
        />
        {userInfo && (
          <BottomNavigationAction 
            label="Favorites" 
            value="/favcard" 
            icon={<FavoriteIcon />} 
          />
        )}
        {userInfo && (userInfo.isBusiness || userInfo.isAdmin) && (
          <BottomNavigationAction 
            label="My cards" 
            value="/mycards" 
            icon={<AccountBoxOutlinedIcon />} 
          />
        )}
      
      {
  isMobile && !isLoggedIn && (
    <BottomNavigationAction 
      label="Register" 
      value="/register" 
      icon={<AppRegistrationIcon />} 
    />
  )
}
{
  isMobile && !isLoggedIn && (
    <BottomNavigationAction 
      label="Login" 
      value="/login" 
      icon={<LoginIcon />} 
    />
  )
}
      </BottomNavigation>
    </Box>
  );
}
