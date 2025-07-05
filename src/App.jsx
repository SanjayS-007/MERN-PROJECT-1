import React, { useState } from 'react';
import CreditExpenseBlock from './CreditExpenseBlock';
import './App.css';

function App() {
  const [showData, setShowData] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAccess = () => {
    if (password === '1234') { // 👈 Replace with your own password logic
      setShowData(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
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

  return <CreditExpenseBlock credit={15000} expense={8000} />;
}

export default App;
