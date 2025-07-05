import React from 'react';
import CreditExpenseBlock from './CreditExpenseBlock';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Monthly Summary</h1>
      <CreditExpenseBlock credit={20000} expense={15000} />
    </div>
  );
}

export default App;
