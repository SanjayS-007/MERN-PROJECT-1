import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import TransactionPage from './pages/TransactionPage';
import AddCategoryPage from './pages/AddCategoryPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/calendar" element={<CalendarPage />} /> */}
      <Route path="/transactions" element={<TransactionPage type="all" />} />
      <Route path="/transactions/credit" element={<TransactionPage type="credit" />} />
      <Route path="/transactions/debit" element={<TransactionPage type="debit" />} />
      <Route path="*" element={<div>404 Not Found</div>} />
      <Route path="/add-category" element={<AddCategoryPage />} />

    </Routes>
  );
}

export default App;
