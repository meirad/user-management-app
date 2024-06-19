import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Box, Container, CssBaseline, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Use useParams to get the card ID from the URL
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem('token');
  const [cardData, setCardData] = useState({
    title: '',
    subtitle: '',
    description: '',
    phone: '',
    email: '',
    web: '',
    image: {
      url: '',
      alt: '',
    },
    address: {
      city: '',
      country: '',
      street: '',
      houseNumber: '',
      zip: '',
    },
  });

  useEffect(() => {
    const fetchCardData = async () => {
      const config = {
        method: 'get',
        url: `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
        headers: { 
          'x-auth-token': token,
        }
      };
      try {
        const response = await axios(config);
        const data = response.data;
        // Clean unwanted fields from data
        if (data.image && data.image._id) {
          delete data.image._id;
        }
        if (data.address && data.address._id) {
          delete data.address._id;
        }
        delete data._id;
        delete data.__v;
        delete data.bizNumber;
        delete data.likes;
        delete data.user_id;
        delete data.createdAt;
        setCardData(data);
      } catch (error) {
        console.error('Error during API call:', error);
        setErrors({ ...errors, submit: error.message });
      }
    };

    fetchCardData();
  }, [id, token]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setCardData({
        ...cardData,
        [parent]: {
          ...cardData[parent],
          [child]: value,
        },
      });
    } else {
      setCardData({
        ...cardData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};
    if (!cardData.title || cardData.title.length < 2 || cardData.title.length > 256) {
      newErrors.title = 'Title is required and should be 2-256 characters long';
    }
    if (!cardData.subtitle || cardData.subtitle.length < 2 || cardData.subtitle.length > 256) {
      newErrors.subtitle = 'Subtitle is required and should be 2-256 characters long';
    }
    if (!cardData.description || cardData.description.length < 2 || cardData.description.length > 1024) {
      newErrors.description = 'Description is required and should be 2-1024 characters long';
    }
    if (!cardData.phone || cardData.phone.length < 9 || cardData.phone.length > 11) {
      newErrors.phone = 'Phone is required and should be 9-11 characters long';
    }
    if (!cardData.email || cardData.email.length < 5) {
      newErrors.email = 'Email is required and should be at least 5 characters long';
    }
    if (cardData.web && cardData.web.length < 14) {
      newErrors.web = 'Web should be at least 14 characters long';
    }
    if (!cardData.image.url) {
      newErrors['image.url'] = 'Image URL is required';
    }
    if (!cardData.image.alt) {
      newErrors['image.alt'] = 'Image Alt Text is required';
    }
    if (!cardData.address.city) {
      newErrors['address.city'] = 'City is required';
    }
    if (!cardData.address.country) {
      newErrors['address.country'] = 'Country is required';
    }
    if (!cardData.address.street) {
      newErrors['address.street'] = 'Street is required';
    }
    if (!cardData.address.houseNumber) {
      newErrors['address.houseNumber'] = 'House Number is required';
    }
    if (!cardData.address.zip) {
      newErrors['address.zip'] = 'ZIP Code is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Exclude unwanted fields before submitting
    const updatedCardData = { ...cardData };
    if (updatedCardData.image && updatedCardData.image._id) {
      delete updatedCardData.image._id;
    }
    if (updatedCardData.address && updatedCardData.address._id) {
      delete updatedCardData.address._id;
    }
    delete updatedCardData._id;
    delete updatedCardData.__v;
    delete updatedCardData.bizNumber;
    delete updatedCardData.likes;
    delete updatedCardData.user_id;
    delete updatedCardData.createdAt;

    const updateUrl = `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`;
    const config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: updateUrl,
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(updatedCardData),
    };

    try {
      const response = await axios(config);
      console.log('Response data:', response.data);
      navigate('/mycards'); 
    } catch (error) {
      console.error('Error during API call:', error);
      setErrors({ ...errors, submit: error.message });
    }
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
          width: '700px',
        }}
      >
        <Typography component="h1" variant="h5">
          Edit Card
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="title"
                value={cardData.title}
                onChange={handleChange}
                label="Title"
                fullWidth
                required
                helperText={errors['title']}
                error={Boolean(errors['title'])}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="subtitle"
                value={cardData.subtitle}
                onChange={handleChange}
                label="Subtitle"
                fullWidth
                required
                helperText={errors['subtitle']}
                error={Boolean(errors['subtitle'])}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                value={cardData.description}
                onChange={handleChange}
                label="Description"
                required
                fullWidth
                helperText={errors['description']}
                error={Boolean(errors['description'])}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="phone"
                value={cardData.phone}
                onChange={handleChange}
                required
                label="Phone"
                fullWidth
                helperText={errors['phone']}
                error={Boolean(errors['phone'])}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                value={cardData.email}
                onChange={handleChange}
                label="Email"
                fullWidth
                required
                helperText={errors['email']}
                error={Boolean(errors['email'])}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="web"
                value={cardData.web}
                onChange={handleChange}
                label="Web"
                fullWidth
                helperText={errors['web']}
                error={Boolean(errors['web'])}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="image.url"
                value={cardData.image.url}
                onChange={handleChange}
                label="Image URL"
                fullWidth
                required
                helperText={errors['image.url']}
                error={Boolean(errors['image.url'])}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="image.alt"
                value={cardData.image.alt}
                onChange={handleChange}
                label="Image Alt Text"
                fullWidth
                required
                helperText={errors['image.alt']}
                error={Boolean(errors['image.alt'])}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="address.city"
                value={cardData.address.city}
                onChange={handleChange}
                label="City"
                fullWidth
                required
                helperText={errors['address.city']}
                error={Boolean(errors['address.city'])}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="address.country"
                value={cardData.address.country}
                onChange={handleChange}
                label="Country"
                fullWidth
                required
                helperText={errors['address.country']}
                error={Boolean(errors['address.country'])}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="address.street"
                value={cardData.address.street}
                onChange={handleChange}
                label="Street"
                fullWidth
                required
                helperText={errors['address.street']}
                error={Boolean(errors['address.street'])}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="address.houseNumber"
                value={cardData.address.houseNumber}
                onChange={handleChange}
                label="House Number"
                fullWidth
                required
                helperText={errors['address.houseNumber']}
                error={Boolean(errors['address.houseNumber'])}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="address.zip"
                value={cardData.address.zip}
                onChange={handleChange}
                label="ZIP Code"
                fullWidth
                required
                helperText={errors['address.zip']}
                error={Boolean(errors['address.zip'])}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
          {errors.submit && (
            <Typography variant="body2" color="error">
              {errors.submit}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Edit;
