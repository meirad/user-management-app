import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
import { GetUserContext } from '../GetUserContext';
import { TextField, Button, Box, Typography, Avatar, Container, CssBaseline, Grid, Divider } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


const Profile = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { profile, setProfile } = useContext(GetUserContext);
  const [formData, setFormData] = useState({
    name: { first: '', middle: '', last: '' },
    phone: '',
    image: { url: '', alt: '' },
    address: {
      state: '',
      country: '',
      city: '',
      street: '',
      houseNumber: '',
      zip: ''
    }
  });
  const [errors, setErrors] = useState({});

useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      const decoded = JSON.parse(storedUserInfo);
      setUserInfo(decoded);
    }
  }, []);
  

  useEffect(() => {
    if (profile) {
      setFormData({
        name: {
          first: profile.name.first || '',
          middle: profile.name.middle || '',
          last: profile.name.last || ''
        },
        phone: profile.phone || '',
        image: {
          url: profile.image.url || '',
          alt: profile.image.alt  || ''
        },
        address: {
          state: profile.address.state || '',
          country: profile.address.country || '',
          city: profile.address.city || '',
          street: profile.address.street || '',
          houseNumber: profile.address.houseNumber || '',
          zip: profile.address.zip || ''
        }
      }); 
    }
  }, [profile]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: '' });
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [field]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.first) newErrors['name.first'] = 'First name is required';
    if (!formData.name.last) newErrors['name.last'] = 'Last name is required';
    if (!formData.phone || !isIsraeliPhoneNumber(formData.phone)) newErrors.phone = 'Valid Israeli phone number is required';
    if (!formData.address.country) newErrors['address.country'] = 'Country is required';
    if (!formData.address.city) newErrors['address.city'] = 'City is required';
    if (!formData.address.street) newErrors['address.street'] = 'Street is required';
    if (!formData.address.houseNumber) newErrors['address.houseNumber'] = 'House number is required';
    if (!formData.address.zip) newErrors['address.zip'] = 'ZIP code is required';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const token = localStorage.getItem('token');
    const config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userInfo._id}`,
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(formData)
    };

    try {
      const response = await axios(config);
      setProfile(response.data);
      console.log('Profile updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response && error.response.data.errors) {
        const errorMessages = error.response.data.errors.reduce((acc, curr) => {
          acc[curr.param] = curr.msg;
          return acc;
        }, {});
        setErrors(errorMessages);
      }
    }
  };

  const isIsraeliPhoneNumber = (phoneNumber) => {
    const regex = /^(\+972|0)([23489]|5[0123456789])[0-9]{7}$/;
    return regex.test(phoneNumber);
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
          component="form"
          onSubmit={handleSubmit}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name.first"
                onChange={handleChange}
                label="First Name"
                value={formData.name.first}
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
                value={formData.name.middle}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name.last"
                onChange={handleChange}
                label="Last Name"
                value={formData.name.last}
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
                value={formData.phone}
                required
                fullWidth
                error={Boolean(errors.phone)}
                helperText={errors.phone}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="image.url"
                onChange={handleChange}
                label="Image URL"
                value={formData.image.url}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="image.alt"
                onChange={handleChange}
                label="Image Alt Text"
                value={formData.image.alt}
                fullWidth
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }}>Address</Divider>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="address.state"
                onChange={handleChange}
                label="State"
                value={formData.address.state}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="address.country"
                onChange={handleChange}
                label="Country"
                value={formData.address.country}
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
                value={formData.address.city}
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
                value={formData.address.street}
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
                value={formData.address.houseNumber}
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
                value={formData.address.zip}
                type="number"
                required
                fullWidth
                error={Boolean(errors['address.zip'])}
                helperText={errors['address.zip']}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Update
          </Button>
          {errors.submit && <Typography variant="body2" color="error">{errors.submit}</Typography>}
        </Box>
      </Container>
  );
};

export default Profile;
