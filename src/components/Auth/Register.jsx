import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Checkbox, FormControlLabel, Box, Typography, Avatar, Container, CssBaseline, Grid } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Divider from '@mui/material/Divider';

const Register = () => {
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
  
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState('');

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
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [field]: type === 'checkbox' ? checked : value
        }
      });
    } else if (name.includes('name.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        name: {
          ...formData.name,
          [field]: value
        }
      });
    } else if (name.includes('address.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [field]: value
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
      newErrors.password = 'Password must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-';
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
      console.log(JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
      setErrors({ ...errors, submit: error.message });
    }
  };

  return (
<Container component="main"  sx={{ display: 'flex', justifyContent: 'center' }}>        <CssBaseline />
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name.first"
                  onChange={handleChange}
                  label="First Name"
                  required
                  fullWidth
                  error={Boolean(errors['name.first'])}
                  helperText={errors['name.first']}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name.middle"
                  onChange={handleChange}
                  label="Middle Name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name.last"
                  onChange={handleChange}
                  label="Last Name"
                  required
                  fullWidth
                  error={Boolean(errors['name.last'])}
                  helperText={errors['name.last']}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="phone"
                  onChange={handleChange}
                  label="Phone"
                  required
                  fullWidth
                  error={Boolean(errors.phone)}
                  helperText={errors.phone}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="email"
                  onChange={handleChange}
                  label="Email"
                  required
                  fullWidth
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="password"
                  onChange={handleChange}
                  label="Password"
                  type="password"
                  required
                  fullWidth
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="image.url"
                  onChange={handleChange}
                  label="Image URL"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="image.alt"
                  onChange={handleChange}
                  label="Image Alt Text"
                  fullWidth
                />
              </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} > Address </Divider>    
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                  name="address.state"
                  onChange={handleChange}
                  label="State"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="address.country"
                  onChange={handleChange}
                  label="Country"
                  required
                  fullWidth
                  error={Boolean(errors['address.country'])}
                  helperText={errors['address.country']}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="address.city"
                  onChange={handleChange}
                  label="City"
                  required
                  fullWidth
                  error={Boolean(errors['address.city'])}
                  helperText={errors['address.city']}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="address.street"
                  onChange={handleChange}
                  label="Street"
                  required
                  fullWidth
                  error={Boolean(errors['address.street'])}
                  helperText={errors['address.street']}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="address.houseNumber"
                  onChange={handleChange}
                  label="House Number"
                  type="number"
                  required
                  fullWidth
                  error={Boolean(errors['address.houseNumber'])}
                  helperText={errors['address.houseNumber']}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="address.zip"
                  onChange={handleChange}
                  label="ZIP Code"
                  type="number"
                  required
                  fullWidth
                  error={Boolean(errors['address.zip'])}
                  helperText={errors['address.zip']}
                />
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Box
  sx={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  }}
>
  <FormControlLabel
    control={<Checkbox name="isBusiness" onChange={handleChange} />}
    label="Is Business"
  />
  <FormControlLabel
    control={<Checkbox name="isAdmin" onChange={handleChange} />}
    label="Is Admin"
  />
</Box>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Register
            </Button>
            {errors.submit && <Typography variant="body2" color="error">{errors.submit}</Typography>}
          </Box>
        </Box>
      </Container>

  );
}

export default Register;
