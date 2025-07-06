// src/pages/CalendarPage.js
import React from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import './CalendarPage.css';

const transactions = [
  { date: '2025-07-01', type: 'credit', amount: 5000 },
  { date: '2025-07-01', type: 'credit', amount: 2000 },
  { date: '2025-07-01', type: 'debit', amount: 1500 },
  { date: '2025-07-02', type: 'debit', amount: 1000 },
  { date: '2025-07-02', type: 'debit', amount: 500 },
  { date: '2025-07-03', type: 'credit', amount: 2000 },
];

const groupedByDate = transactions.reduce((acc, tx) => {
  if (!acc[tx.date]) acc[tx.date] = { credit: 0, debit: 0 };
  acc[tx.date][tx.type]++;
  return acc;
}, {});

function CalendarPage() {
  const navigate = useNavigate();

  const handleDateClick = (date) => {
    const iso = date.toISOString().slice(0, 10);
    navigate(`/transactions/${iso}`);
  };

  const tileContent = ({ date, view }) => {
  if (view !== 'month') return null;

  const key = date.toISOString().slice(0, 10);
  const data = groupedByDate[key];
  if (!data) return null;

  const total = data.credit + data.debit;
  const creditPercent = (data.credit / total) * 100;
  const debitPercent = 100 - creditPercent;
  const tooltipText = `🟢 ${data.credit} Credit, 🔴 ${data.debit} Debit`;

  return (
    <div className="calendar-wrapper">
      <div
        className="calendar-gradient"
        style={{
          background: `linear-gradient(to right, rgba(0, 128, 0, 0.4) ${creditPercent}%, rgba(220, 53, 69, 0.4) ${debitPercent}%)`,
        }}
      ></div>
      <div className="calendar-tooltip">{tooltipText}</div>
    </div>
  );
};


  return (
    <div className="container mt-4 text-center">
      <h4>🗕️ Choose a date</h4>
      <Calendar
        onClickDay={handleDateClick}
        tileContent={tileContent}
      />
    </div>
  );
}

export default CalendarPage;
