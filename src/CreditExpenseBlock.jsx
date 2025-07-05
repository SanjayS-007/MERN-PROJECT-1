
import React from 'react';

const CreditExpenseBlock = ({ credit, expense }) => {
  return (
    <div className="container mt-4">
      <div className="row justify-content-center g-4">
        <div
          className="col-md-3 p-4 text-white bg-success rounded text-center shadow-sm hover-scale"
          style={{ transition: "transform 0.3s, box-shadow 0.3s", cursor: "pointer" }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <h4>Credit</h4>
          <p className="fs-5">₹ {credit}</p>
        </div>
        <div
          className="col-md-3 p-4 text-white bg-danger rounded text-center shadow-sm hover-scale"
          style={{ transition: "transform 0.3s, box-shadow 0.3s", cursor: "pointer" }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}

        >
          <h4>Expense</h4>
          <p className="fs-5">₹ {expense}</p>
        </div>
      </div>
    </div>
  );
};

export default CreditExpenseBlock;
