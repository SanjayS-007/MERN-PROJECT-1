import './TransactionList.css';

const TransactionList = ({ transactions }) => {
  return (
    <div className="transaction-list">
      {transactions.map((tx) => (
        <div
          key={tx.id}
          className={`transaction-item transaction-${tx.type}`}
        >
          <div className="transaction-icon">
            {tx.type === 'credit' ? '💸' : '📤'}
          </div>
          <div className="transaction-details">
            <div className="transaction-type">{tx.type}</div>
            <div className="transaction-amount">₹{tx.amount}</div>
            <div className="transaction-date">on {tx.date}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
