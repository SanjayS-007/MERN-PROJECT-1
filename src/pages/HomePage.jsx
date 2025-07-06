// src/pages/HomePage.js
import React from 'react';
import CreditExpenseBlock from '../CreditExpenseBlock';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();


  return (
    <div>
      <CreditExpenseBlock
        onCreditClick={() => navigate('/transactions/credit')}
        credit={15000}
        expense={8000}
      />
    </div>
  );
}

export default HomePage;
