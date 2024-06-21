import React from 'react';
import { TextField, Grid, Divider, Checkbox, FormControlLabel, Box } from '@mui/material';

const FormFields = ({ formData, errors, handleChange }) => {
  return (
    <>
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

      <Divider sx={{ my: 2 }}>Address</Divider>
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
    </>
  );
};

export default FormFields;
