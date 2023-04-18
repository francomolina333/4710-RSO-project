import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import RegisterPage from'./pages/RegisterPage';
import HomePage from './pages/HomePage';
import JoinRSOPage from './pages/JoinRSOPage';
import LeaveRSOPage from './pages/LeaveRSOPage'
import AddUniversityPage from './pages/AddUniversityPage';
import CreateRSOPage from './pages/CreateRSOPage';
import CreateEventPage from './pages/CreateEventPage';
import EventsPage from './pages/EventsPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" index element={<LoginPage />} />
      <Route path="/login" index element={<LoginPage />} />
      <Route path="/register" index element={<RegisterPage />} />
      <Route path="/home" index element={<HomePage />} />
      <Route path="/join-RSO" index element={<JoinRSOPage />} />
      <Route path="/leave-RSO" index element={<LeaveRSOPage />} />
      <Route path="/add-university" index element={<AddUniversityPage />} />
      <Route path='/create-RSO' index element={<CreateRSOPage />} />
      <Route path='/create-event' index element={<CreateEventPage />} />
      <Route path='/events' index element={<EventsPage />} />
    </Routes>
  </BrowserRouter>
);
}

export default App;