import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import './CalendarModal.css';

const CalendarModal = ({ transactions, onDateClick, onClose }) => {
  // Group transactions by date
  const groupedData = transactions.reduce((acc, tx) => {
    acc[tx.date] = acc[tx.date] || { credit: 0, debit: 0 };
    acc[tx.date][tx.type] += 1;
    return acc;
  }, {});

  // Create a colored dot and tooltip per date
  const tileContent = ({ date }) => {
    const key = date.toISOString().slice(0, 10);
    const txData = groupedData[key];

    if (!txData) return null;

    const tooltip = `💰 ${txData.credit || 0} Credit, 📤 ${txData.debit || 0} Debit`;

    return (
      <div
        title={tooltip}
        style={{
          marginTop: 4,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: '#17a2b8', // info color
            display: 'inline-block',
          }}
        />
      </div>
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
