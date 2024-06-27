import React from 'react';
import Typography from '@mui/material/Typography';

const About = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" style={{ color: '#3f51b5' }}>About Our Site</Typography>
      <Typography variant="body1" style={{ marginBottom: '15px' }}>
        This site is designed to provide you with the best user experience. Here, you can find a wide range of features that will help you navigate and interface with the site easily.
      </Typography>
      <Typography variant="h5">How to Interface with Our Site</Typography>
      <Typography variant="h6">Pages</Typography>

      <Typography variant="body1" style={{ marginBottom: '15px' }}>
        <strong>Login</strong> - This is where you can log in to your account. If you do not have an account, you can sign up for one by clicking on the sign-up link.
      </Typography>

      <Typography variant="body1" style={{ marginBottom: '15px' }}>
        <strong>Register</strong> - This is where you can sign up for an account. You will need to provide your name, email, and password to create an account. You will be able to log in to your account after you have successfully registered.
      </Typography>

      <Typography variant="body1" style={{ marginBottom: '15px' }}>
        <strong>Profile</strong> - This is where you can view and edit your profile information. You can change your name, email, and password on this page.
      </Typography>


      <Typography variant="body1" style={{ marginBottom: '15px' }}>
        <strong>All Cards</strong> - This is where you can view all the cards that are available on the site. You can click on the cards to view more details about them. If you are logged in, you can add a card to your favorites by clicking on the favorite button.
      </Typography>

      <Typography variant="body1" style={{ marginBottom: '15px' }}>
        <strong>Favorites</strong> - This is where you can view all the cards that you have added to your favorites. You can click on the cards to view more details about them. If you are logged in, you can remove a card from your favorites by clicking on the favorite button.
      </Typography>

      <Typography variant="body1" style={{ marginBottom: '15px' }}>
        <strong> My Cards </strong> - This is where you can view all the cards that you have created. You can click on the cards to view more details about them. If you are logged in, you can edit, delete, call and by clicking on the on the icons.  
        you can also create a new card by clicking on the "+" button at the bottom right corner of the page.

      </Typography>
     
      <Typography variant="body1" style={{ marginBottom: '15px' }}>
        <strong>Users</strong> - This is where you can view all the users that are registered on the site. You can delete a user from the site if they are not an admin, and change their business status.
      </Typography>

      <Typography variant="body1" style={{ marginBottom: '15px' }}>
        Our site is user-friendly and easy to navigate. You can use the navigation bar at the top of the page to go to different sections of the site. If you have any questions or need further assistance, please contact our support team.
      </Typography>
    </div>
  );
};

export default About;
