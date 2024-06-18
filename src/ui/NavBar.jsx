// NavBar.js
import React, { useContext } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import { Adb as AdbIcon, Menu as MenuIcon, Brightness7 as Brightness7Icon, Brightness4 as Brightness4Icon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../App';
import { UserContext } from '../UserContext';
import { GetUserContext } from '../GetUserContext';
import SearchBar from './ SearchBar';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ isLoggedIn, logout, handleSignIn, handleRegister, handleOpenNavMenu, handleOpenUserMenu, anchorElNav, anchorElUser, handleCloseNavMenu, handleCloseUserMenu, pages, settings, searchInput, handleSearchChange }) => {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const { profile } = useContext(GetUserContext);
  const navigate = useNavigate();
  const navigateTo = (path) => navigate(path);

  const navigateToAbout = () => navigate('/');
  const navigateToUsers = () => navigate('/users');
  const navigateToMyCards = () => navigate('/mycards');
  const navigateToFavCard = () => navigate('/FavCard');
  
  return (
    <AppBar position='fixed'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              width: '120px',
            }}
          >
            logo
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
              key={page}
              onClick={
                page.toLowerCase() === 'about' ? navigateToAbout :
                page.toLowerCase() === 'users' ? navigateToUsers :
                page.toLowerCase() === 'favcard' ? navigateToFavCard : 
                page.toLowerCase() === 'mycards' ? navigateToMyCards :
                handleCloseNavMenu
              }
              sx={{ my: 2, color: 'white', display: 'block' }}
              >
              {page}
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'flex-end',
              color: 'white',
              borderRadius: 1,
              p: 3,
            }}
          >
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
          <SearchBar searchInput={searchInput} handleSearchChange={handleSearchChange} />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              {isLoggedIn ? (
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {profile && profile.image && (
                    <Avatar
                      alt={profile.alt}
                      src={profile.image.url}
                      sx={{
                        width: 35,
                        height: 35,
                        ml: 2,
                        '& img': {
                          objectFit: 'contain',
                        },
                      }}
                    />
                  )}
                </IconButton>
              ) : (
                <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Button onClick={handleSignIn} sx={{ my: 2, color: 'white', width: '80px' }}>
                  Sign In
                </Button>
                <Button onClick={handleRegister} sx={{ my: 2, color: 'white' }}>
                  Register
                </Button>
              </Box>
              )}
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {settings.map((setting) => (
           <Button key={setting} onClick={() => setting === 'Logout' ? logout() : navigateTo(setting)}>
           {setting}
         </Button>
                ))}
              </div>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
