import React from 'react';

const ExportButton = ({ transactions }) => {
  const handleExport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Date,Type,Amount,Note', ...transactions.map(tx =>
        `${tx.date},${tx.type},${tx.amount},${tx.note}`
      )].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="text-center my-3">
      <button className="btn btn-outline-primary btn-sm" onClick={handleExport}>
        Export as CSV
      </button>
    </div>
  );
};

export default ExportButton;
