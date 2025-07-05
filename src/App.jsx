// import React, { useState } from 'react';
// import CreditExpenseBlock from './CreditExpenseBlock';

// import React, { useState } from 'react';
import React, { useState, useRef } from 'react';
import CreditExpenseBlock from './CreditExpenseBlock';
import CalendarModal from './CalendarModal';
import TransactionList from './TransactionList';
import './App.css';
import ExportButton from './ExportButton';
import SpendingChart from './SpendingChart';



const mockTransactions = [
  { date: '2025-07-01', type: 'credit', amount: 5000, note: 'Salary' },
  { date: '2025-07-01', type: 'debit', amount: 1500, note: 'Groceries' },
    { date: '2025-07-01', type: 'credit', amount: 5000, note: 'Salary' },
  { date: '2025-07-01', type: 'debit', amount: 1500, note: 'Groceries' },
    { date: '2025-07-01', type: 'credit', amount: 5000, note: 'Salary' },
  { date: '2025-07-01', type: 'debit', amount: 1500, note: 'Groceries' },
    { date: '2025-07-01', type: 'credit', amount: 5000, note: 'Salary' },
  { date: '2025-07-01', type: 'debit', amount: 1500, note: 'Groceries' },
    { date: '2025-07-01', type: 'credit', amount: 5000, note: 'Salary' },
  { date: '2025-07-01', type: 'debit', amount: 1500, note: 'Groceries' },
    { date: '2025-07-01', type: 'credit', amount: 5000, note: 'Salary' },
  { date: '2025-07-01', type: 'debit', amount: 1500, note: 'Groceries' },
    { date: '2025-07-01', type: 'credit', amount: 5000, note: 'Salary' },
  { date: '2025-07-01', type: 'debit', amount: 1500, note: 'Groceries' },
    { date: '2025-07-01', type: 'credit', amount: 5000, note: 'Salary' },
  { date: '2025-07-01', type: 'debit', amount: 1500, note: 'Groceries' },
  { date: '2025-07-02', type: 'credit', amount: 2000, note: 'Freelance' },
  { date: '2025-07-03', type: 'debit', amount: 800, note: 'Electricity' },
];



function App() {
  const [showData, setShowData] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
      const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const transactionRef = useRef(null);  
  const handleAccess = () => {
    if (password === '1234') { // 👈 Replace with your own password logic
      setShowData(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };
  
  const handleDateClick = (date) => {
    const isoDate = date.toISOString().slice(0, 10);
    setSelectedDate(isoDate);

    // ✅ Smooth scroll to transaction list
    setTimeout(() => {
      if (transactionRef.current) {
        transactionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // small delay ensures it's rendered
  };
  if (!showData) {
    return (
      <div className="lock-screen d-flex flex-column align-items-center justify-content-center ">
        <h2>🔒 Secure Finance Panel</h2>
        <p>Your credit and debit data is protected.</p>
        <input
          type="password"
          placeholder="Enter password to unlock"
          className="form-control w-50 mb-3"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAccess}>Unlock</button>
        {error && <p className="text-danger mt-2">{error}</p>}
      </div>
    );
  }



  // return <CreditExpenseBlock onCreditClick={() => setCalendarVisible(true)}  />;
    return (
    <div>
      <CreditExpenseBlock
        onCreditClick={() => setCalendarVisible(true)}
        credit={15000}
        expense={8000}
      />
      <SpendingChart transactions={mockTransactions} />

      {calendarVisible && (
        <CalendarModal
          transactions={mockTransactions}
          onDateClick={handleDateClick}
          onClose={() => setCalendarVisible(false)}
        />
      )}

  {/* ✅ Scroll target for transaction list + export */}
  {selectedDate && (
    <div ref={transactionRef} className="transaction-fade">
      <ExportButton
        transactions={mockTransactions.filter(tx => tx.date === selectedDate)}
      />
      <TransactionList
        transactions={mockTransactions}
        selectedDate={selectedDate}
      />
    </div>
  )}
</div>

  );
}


export default App;