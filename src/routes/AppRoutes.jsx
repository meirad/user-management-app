import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from '../components/Register';
import Login from '../components/Login';
import Profile from '../components/Profile';
import DeleteAccount from '../components/DeleteAccount';
import About from '../components/About';
import Users from '../components/Users';
import MyCards from '../components/MyCards';
import FavCard from '../components/FavCard';
import CreateCard from '../components/card/Create';
import Edit from '../components/card/Edit';
import BissnessPage from '../pages/BissnessPage';

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
