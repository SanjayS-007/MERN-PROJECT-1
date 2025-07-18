// src/pages/HomePage.js
import React from 'react';
import CreditExpenseBlock from '../CreditExpenseBlock';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Adjust the import path as necessary


function HomePage() {
  const navigate = useNavigate();


  return (
    <div>
      <CreditExpenseBlock
        onCreditClick={() => navigate('/transactions/credit')}
        onDebitClick={() => navigate('/transactions/debit')}
        credit={15000}
        expense={8000}
        lastCredit={1200}
        lastCreditDate={"2025-07-03"}
        avgCredit={9800}
        lastExpense={650}
        lastExpenseDate={"2025-07-02"}
        avgExpense={7200}
      />
    </div>
  );
}

export default HomePage;
