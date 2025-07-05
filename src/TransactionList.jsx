import React, { useState } from 'react';

const TransactionList = ({ transactions, selectedDate }) => {
  const [filter, setFilter] = useState('all');

  const filteredByDate = transactions.filter(tx => tx.date === selectedDate);
  const filtered = filter === 'all'
    ? filteredByDate
    : filteredByDate.filter(tx => tx.type === filter);

  if (!filteredByDate.length)
    return <p className="mt-4 text-center">No transactions on {selectedDate}</p>;

  return (
    <div className="container mt-4">
      <h5 className="text-center">Transactions on {selectedDate}</h5>

      <div className="text-center mb-3">
        <button onClick={() => setFilter('all')} className="btn btn-outline-dark btn-sm mx-1">All</button>
        <button onClick={() => setFilter('credit')} className="btn btn-outline-success btn-sm mx-1">Credit</button>
        <button onClick={() => setFilter('debit')} className="btn btn-outline-danger btn-sm mx-1">Debit</button>
      </div>

      <ul className="list-group">
        {filtered.map((tx, idx) => (
          <li key={idx} className={`list-group-item ${tx.type === 'credit' ? 'text-success' : 'text-danger'}`}>
            <strong>{tx.type.toUpperCase()}:</strong> ₹{tx.amount} – {tx.note}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
