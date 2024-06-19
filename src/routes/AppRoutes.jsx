import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from '../components/Auth/Register';
import Login from '../components/Auth/Login';
import Profile from '../components/User/Profile';
import DeleteAccount from '../components/Auth/DeleteAccount';
import About from '../components/Pages/About';
import Users from '../components/User/Users';
import MyCards from '../components/Cards/MyCards';
import FavCard from '../components/Cards/FavCard';
import CreateCard from '../components/Cards/CreateCard';
import Edit from '../components/Cards/EditCard';
import BissnessPage from '../components/Pages/BissnessPage';

function AppRoutes({ searchInput }) {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/delete-account" element={<DeleteAccount />} />
      <Route path="/" element={<About searchInput={searchInput} />} />
      <Route path="/users" element={<Users searchInput={searchInput} />} />
      <Route path="/favcard" element={<FavCard searchInput={searchInput} />} />
      <Route path="/mycards" element={<MyCards searchInput={searchInput} />} />
      <Route path="/create" element={<CreateCard />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/businesspage/:id" element={<BissnessPage />} />
    </Routes>
  );
}

export default AppRoutes;
