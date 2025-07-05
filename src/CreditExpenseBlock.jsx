import React from 'react';
import './CreditExpenseBlock.css';

const CreditExpenseBlock = ({ credit, expense }) => {
  return (
    <div className="container-fluid themed-blocks py-5">
      <div className="row justify-content-center gx-4 gy-4">
        <div className="col-12 col-md-5 themed-card credit-card">
          <div className="icon">💰</div>
          <div className="text">
            <h5>Income This Month</h5>
            <p className="amount">₹ {credit}</p>
            <small className="note">You've earned well. Great job!</small>
          </div>
        </div>
        <div className="col-12 col-md-5 themed-card expense-card">
          <div className="icon">📤</div>
          <div className="text">
            <h5>Spending This Month</h5>
            <p className="amount">₹ {expense}</p>
            <small className="note">Track your spending to save more.</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditExpenseBlock;
