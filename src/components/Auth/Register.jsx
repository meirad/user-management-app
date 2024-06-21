import React, { useState } from 'react';
import axios from 'axios';
import { Button, Box, Typography, Avatar, Container, CssBaseline, Snackbar, Alert, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import FormFields from './RegisterFrom'; 

const Register = ({ setSnackbarOpen }) => {
  const [formData, setFormData] = useState({
    name: { first: '', middle: '', last: '' },
    phone: '',
    email: '',
    password: '',
    image: { url: '', alt: '' },
    address: {
      state: '',
      country: '',
      city: '',
      street: '',
      houseNumber: '',
      zip: ''
    },
    isBusiness: false,
    isAdmin: false
  });
  const [snackbarOpenInternal, setSnackbarOpenInternal] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState('');
  const navigate = useNavigate();

  const isIsraeliPhoneNumber = (phoneNumber) => {
    const regex = /^(\+972|0)([23489]|5[0123456789])[0-9]{7}$/;
    return regex.test(phoneNumber);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setErrors({ ...errors, [name]: '' });

    if (name === 'image.file') {
      setSelectedFile(e.target.files[0].name);
    }

    const nameParts = name.split('.');
    if (nameParts.length === 2) {
      setFormData({
        ...formData,
        [nameParts[0]]: {
          ...formData[nameParts[0]],
          [nameParts[1]]: type === 'checkbox' ? checked : value
        }
      });
    } else {
      setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.first) newErrors['name.first'] = 'First name is required';
    if (!formData.name.last) newErrors['name.last'] = 'Last name is required';
    if (!formData.phone || !isIsraeliPhoneNumber(formData.phone)) newErrors.phone = 'Valid Israeli phone number is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{9,}$/;
      if (!passwordRegex.test(formData.password)) {
        newErrors.password = 'Password must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number, and one of the following characters: !@#$%^&*-';
      }
    }
    if (!formData.address.country) newErrors['address.country'] = 'Country is required';
    if (!formData.address.city) newErrors['address.city'] = 'City is required';
    if (!formData.address.street) newErrors['address.street'] = 'Street is required';
    if (!formData.address.houseNumber) newErrors['address.houseNumber'] = 'House number is required';
    if (!formData.address.zip) newErrors['address.zip'] = 'ZIP code is required';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const registerUrl = 'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users';
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: registerUrl,
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(formData)
    };

    try {
      const response = await axios(config);
      setSnackbarOpenInternal(true);
      setSnackbarOpen(true);
      navigate('/login');
    } catch (error) {
      console.error(error);
      setErrors({ ...errors, submit: error.message });
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpenInternal(false);
  };

  return (
    <Container component="main" sx={{ display: 'flex', justifyContent: 'center' }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '700px'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <FormFields formData={formData} errors={errors} handleChange={handleChange} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          {errors.submit && <Typography variant="body2" color="error">{errors.submit}</Typography>}
        </Box>
        <Box>
          <Link href="/login" variant="body2">
            {"Already have an account? Login"}
          </Link>
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpenInternal}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          User created successfully!!!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Register;
