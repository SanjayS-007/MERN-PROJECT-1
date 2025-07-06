// src/pages/TransactionPage.jsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './TransactionPage.css';

const allTransactions = [
  { date: '2025-07-01', type: 'credit', amount: 5000 },
  { date: '2025-07-01', type: 'debit', amount: 1500 },
  { date: '2025-07-02', type: 'credit', amount: 2000 },
  { date: '2025-07-03', type: 'debit', amount: 1000 },
  { date: '2025-07-05', type: 'credit', amount: 3000 },
];

function TransactionPage() {
  const [selectedDate, setSelectedDate] = useState(null);

  const filtered = selectedDate
    ? allTransactions.filter(tx => tx.date === selectedDate.toISOString().slice(0, 10))
    : allTransactions;

  return (
    <div className="transaction-page">
      <div className="transactions">
        <h3>💰 Transactions</h3>
        {filtered.length === 0 ? (
          <p>No transactions on this date.</p>
        ) : (
          filtered.map((tx, i) => (
            <div key={i} className={`tx-item ${tx.type}`}>
              <strong>{tx.type.toUpperCase()}</strong> - ₹{tx.amount} on {tx.date}
            </div>
          ))
        )}
      </div>
      <div className="calendar-box">
        <h4>Select Date</h4>
        <Calendar onClickDay={setSelectedDate} />
        {selectedDate && (
          <button onClick={() => setSelectedDate(null)} className="reset-btn">
            Show All
          </button>
        )}
      </div>
    </div>
  );
}

export default TransactionPage;
