import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import TransactionPage from './pages/TransactionPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/transactions/:date" element={<TransactionPage />} />
    </Routes>
  );
}

export default App;
