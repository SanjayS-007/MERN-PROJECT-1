import { useState, useEffect } from 'react';
import CalendarModal from '../CalendarModal';
import TransactionList from '../TransactionList';
import jsPDF from 'jspdf';


const allTransactions = [
  { id: 1, type: 'credit', amount: 5000, date: '2025-07-01' },
  { id: 2, type: 'credit', amount: 2000, date: '2025-07-02' },
  { id: 3, type: 'credit', amount: 3000, date: '2025-07-05' },
  { id: 4, type: 'debit', amount: 1000, date: '2025-07-03'},
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

const handleDownload = (e) => {
  const format = e.target.value;
  const dataToExport = allTransactions.filter(tx => tx.type === type);

  if (format === 'csv') {
    const csvRows = [
      ['Type', 'Amount', 'Date'],
      ...dataToExport.map(tx => [tx.type, tx.amount, tx.date])
    ];
    const csvContent = csvRows.map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${type}-transactions.csv`);
    link.click();
  }

  if (format === 'pdf') {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(`${type.toUpperCase()} Transactions`, 20, 20);

    let y = 40;
    doc.setFontSize(12);
    doc.text("Type      Amount      Date", 20, 30);
    dataToExport.forEach((tx, index) => {
      doc.text(`${tx.type}      ₹${tx.amount}      ${tx.date}`, 20, y);
      y += 10;
    });

    doc.save(`${type}-transactions.pdf`);
  }

  e.target.value = ''; // reset dropdown
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

      <div className="transaction-controls">
        <button
            onClick={handleToggle}
            className={`show-all-btn ${type}`}
            style={{
              background: type === 'debit' ? 'red' : 'green',
              color: 'white',
              padding: '10px 20px',
            }}
        >
            {showAll ? 'Show Filtered Transactions' : 'Show All Transactions'}
        </button>


  <select onChange={handleDownload} className="download-dropdown" defaultValue="">
    <option value="" disabled>📥 Download As</option>
    <option value="csv">CSV</option>
    <option value="pdf">PDF</option>
  </select>
</div>



      </div>
    </div>
  );
};

export default TransactionPage;
