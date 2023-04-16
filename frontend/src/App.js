import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import RegisterPage from'./pages/RegisterPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" index element={<LoginPage />} />
      <Route path="/login" index element={<LoginPage />} />
      <Route path="/register" index element={<RegisterPage />} />
    </Routes>
  </BrowserRouter>
);
}

export default App;