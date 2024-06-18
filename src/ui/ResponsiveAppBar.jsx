import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { GetUserContext } from '../GetUserContext';
import { useGetUserProfile } from '../Services/GetUser';
import NavBar from './NavBar';

const settings = ['Profile', 'Logout'];

function ResponsiveAppBar({ searchInput, setSearchInput }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { profile, setProfile } = useContext(GetUserContext);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      const decoded = JSON.parse(storedUserInfo);
      setUserInfo(decoded);
      setIsLoggedIn(true);
    }
  }, []);

  useGetUserProfile();

  const logout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigateTo = (page) => {
    navigate(`/${page.toLowerCase()}`);
  };




  let pages = ['About'];
  if (userInfo) {
    if (userInfo.isBusiness || userInfo.isAdmin) {
      pages.push('MyCards');
    }
    pages.push('FavCard');
    if (userInfo.isAdmin) {
      pages.push('Users');
    }
  }

  return (
    <NavBar
      isLoggedIn={isLoggedIn}
      logout={logout}
      handleSignIn={handleSignIn}
      handleRegister={handleRegister}
      handleOpenNavMenu={handleOpenNavMenu}
      handleOpenUserMenu={handleOpenUserMenu}
      anchorElNav={anchorElNav}
      anchorElUser={anchorElUser}
      handleCloseNavMenu={handleCloseNavMenu}
      handleCloseUserMenu={handleCloseUserMenu}
      pages={pages}
      settings={settings}
      navigateTo={navigateTo}
      searchInput={searchInput}
      handleSearchChange={handleSearchChange}
    />
  );
}

export default ResponsiveAppBar;
