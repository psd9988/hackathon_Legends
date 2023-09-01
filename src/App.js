import React from 'react';
import LoginPage from './components/LoginPage';
import { Routes, Route } from 'react-router-dom';
import SignUpPage from './components/SignUpPage';
import UserProfilePage from './components/UserProfilePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/profile/:userId" element={<UserProfilePage/>} />
    </Routes>
  );
}

export default App;
