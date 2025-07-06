import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import './CalendarModal.css';

const CalendarModal = ({ onDateClick, onClose }) => {


  // Create a colored dot and tooltip per date
 const transactions = [  // or import from a shared file
  { date: '2025-07-01', type: 'credit', amount: 5000 },
  { date: '2025-07-01', type: 'debit', amount: 1500 },
  { date: '2025-07-02', type: 'credit', amount: 2000 },
];

const groupedData = transactions.reduce((acc, tx) => {
  acc[tx.date] = acc[tx.date] || { credit: 0, debit: 0 };
  acc[tx.date][tx.type]++;
  return acc;
}, {});

const tileContent = ({ date }) => {
  const key = date.toISOString().slice(0, 10);
  const txData = groupedData[key];
  if (!txData) return null;

  const tooltip = `💰 ${txData.credit || 0} Credit, 📤 ${txData.debit || 0} Debit`;

  return (
    <>
      <div
        title={tooltip} // ✅ Title now applies directly on outer wrapper
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 2
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: '#17a2b8',
          }}
        ></span>
      </div>
    </>
  );
};



  return (
    <div className="modal-backdrop">
      <div className="modal-box text-center">
        <h4 className="mb-3">📅 Financial Calendar</h4>
        <Calendar
          onClickDay={onDateClick}
          tileContent={tileContent}
        />
        <button className="btn btn-secondary mt-3" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CalendarModal;
