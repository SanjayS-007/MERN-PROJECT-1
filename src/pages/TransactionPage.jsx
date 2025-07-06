import { useState, useEffect } from 'react';
import CalendarModal from '../CalendarModal';
import TransactionList from '../TransactionList';

const allTransactions = [
  { id: 1, type: 'credit', amount: 5000, date: '2025-07-01' },
  { id: 2, type: 'credit', amount: 2000, date: '2025-07-02' },
  { id: 3, type: 'credit', amount: 3000, date: '2025-07-05' },
];

const TransactionPage = ({ type }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    if (showAll || !selectedDate) {
      setFilteredTransactions(allTransactions.filter(tx => tx.type === type));
    } else {
      const filtered = allTransactions.filter(
        tx => tx.type === type && tx.date === selectedDate
      );
      setFilteredTransactions(filtered);
    }
  }, [selectedDate, type, showAll]);

  const handleToggle = () => {
    setShowAll(prev => !prev);
  };

  const handleDownload = () => {
  const dataToExport = allTransactions.filter(tx => tx.type === type);
  const csvRows = [
    ['Type', 'Amount', 'Date'], // header
    ...dataToExport.map(tx => [tx.type, tx.amount, tx.date])
  ];

  const csvContent = csvRows.map(e => e.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${type}-transactions.csv`);
  link.click();
};


  return (
    <div style={{ display: 'flex', gap: '30px', padding: '30px' }}>
      {/* Filtered or All Transactions */}
      <div style={{ flex: 1 }}>
        <h2>💰 {type.toUpperCase()} Transactions</h2>
        <TransactionList transactions={filteredTransactions} />
      </div>

      {/* Calendar + Toggle Button */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h3>Select Date</h3>
        <CalendarModal onDateSelect={date => {
          setSelectedDate(date);
          setShowAll(false); // reset to filtered view
        }} />

        <button onClick={handleToggle} className="show-all-btn">
          {showAll ? 'Show Filtered Transactions' : 'Show All Transactions'}
        </button>
        <button onClick={handleDownload} className="download-btn">
          📥 Download CSV
        </button>

      </div>
    </div>
  );
};

export default TransactionPage;
