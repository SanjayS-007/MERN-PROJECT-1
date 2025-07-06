import React from 'react';
import './CreditExpenseBlock.css';

const CreditExpenseBlock = ({
  credit,
  expense,
  onCreditClick,
  lastCredit,
  lastCreditDate,
  avgCredit,
  lastExpense,
  lastExpenseDate,
  avgExpense
}) => {
  return (
    <div className="container-fluid credit-expense-container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="row w-100 justify-content-center gx-4 gy-4">
        
        {/* Credit Card - Column */}
        <div className="col-12 col-md-6 col-lg-5" onClick={onCreditClick}>
          <div className="themed-card credit-card p-4 h-100">
            <div className="icon mb-3">💰</div>
            <h4>Income This Month</h4>
            <p className="amount fs-4 fw-bold">₹ {credit}</p>
            <small className="note">You've earned well. Great job!</small>

            <div className="extra-info d-flex justify-content-between mt-4">
              <div className="d-flex flex-column">
                <span className="fw-semibold">Last Credited</span>
                <span>₹ {lastCredit}</span>
                <span className="text-muted small">{lastCreditDate}</span>
              </div>
              <div className="d-flex flex-column text-end">
                <span className="fw-semibold">Avg Income</span>
                <span>₹ {avgCredit}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Expense Card - Column */}
        <div className="col-12 col-md-6 col-lg-5">
          <div className="themed-card expense-card p-4 h-100">
            <div className="icon mb-3">📤</div>
            <h4>Spending This Month</h4>
            <p className="amount fs-4 fw-bold">₹ {expense}</p>
            <small className="note">Track your spending to save more.</small>

            <div className="extra-info d-flex justify-content-between mt-4">
              <div className="d-flex flex-column">
                <span className="fw-semibold">Last Expense</span>
                <span>₹ {lastExpense}</span>
                <span className="text-muted small">{lastExpenseDate}</span>
              </div>
              <div className="d-flex flex-column text-end">
                <span className="fw-semibold">Avg Spending</span>
                <span>₹ {avgExpense}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};


export default CreditExpenseBlock;
