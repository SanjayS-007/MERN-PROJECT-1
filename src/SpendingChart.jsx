import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SpendingChart = ({ transactions }) => {
  // Group by date
  const dataByDate = {};

  transactions.forEach(tx => {
    if (!dataByDate[tx.date]) {
      dataByDate[tx.date] = { date: tx.date, credit: 0, debit: 0 };
    }
    dataByDate[tx.date][tx.type] += tx.amount;
  });

  const chartData = Object.values(dataByDate);

  return (
    <div className="container mt-4">
      <h5 className="text-center">💹 Spending Chart</h5>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="credit" fill="#28a745" name="Credit" />
          <Bar dataKey="debit" fill="#dc3545" name="Debit" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingChart;
