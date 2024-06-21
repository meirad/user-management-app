import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { UserContext } from '../../UserContext';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate } from 'react-router-dom';
import { GetUserContext } from '../../GetUserContext';
import { useGetUserProfile } from '../../Services/GetUser';
import {useUserProfile} from '../../Services/GetUser';



const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
 const [token, setToken] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
 const { userInfo, setUserInfo } = useContext(UserContext);
  const {profile, setProfile}  = useContext(GetUserContext);
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  


  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      const decoded = JSON.parse(storedUserInfo);
      setUserInfo(decoded);
      setIsLoggedIn(true);
    }
  }, []);


  console.log(userInfo);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  let loginAttempts = {};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = formData.email;
    const now = new Date();

    let userData = localStorage.getItem(email);

    if (userData) {
      userData = JSON.parse(userData);
      if (userData.attempts >= 3 && now - new Date(userData.lastAttempt) < 24 * 60 * 60 * 1000) {
        setErrors({ ...errors, 'loginAttempts': 'Too many login attempts. Try again in 24 hours' });
        console.log('Too many login attempts. Try again in 24 hours');
        return;
      } else if (now - new Date(userData.lastAttempt) >= 24 * 60 * 60 * 1000) {
        userData = { attempts: 1, lastAttempt: now };
        console.log('Resetting login attempts');
      } else {
        userData.attempts++;
        userData.lastAttempt = now;
        console.log('Incrementing login attempts');
      }
    } else {
      userData = { attempts: 1, lastAttempt: now };
      console.log('First login attempt');
    }
  
    localStorage.setItem(email, JSON.stringify(userData));
  
    e.preventDefault();
    try {
      const response = await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login', formData);
      const getToken =  response.data;
      const decoded = jwtDecode(getToken);
      setUserInfo(decoded);
      localStorage.setItem('userInfo', JSON.stringify(decoded)); 
      localStorage.setItem('token', getToken);
      setIsLoggedIn(true);
    
    } catch (error) {
      console.error(error);
      if (error.response.status === password || error.response.status === email) {
        setErrors({ ...errors, [error.response.data]: error.response.data });

      }

    }
  };
  
return (
    <div>
    {isLoggedIn && <Navigate to="/" /> }
  
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        }}
    >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
            <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Link href="/Register" variant="body2">
              {"Don't have an account? Register"}
            </Link>
          </Box>
        </Box>
      </Box>
        
    </Container>

  </div>
);
  };


export default Login;
