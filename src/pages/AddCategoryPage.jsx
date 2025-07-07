import React, { useState } from 'react';
import './AddCategory.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const AddCategoryPage = () => {
  const [formData, setFormData] = useState({
    type: 'credit',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: 'salary',
  });

//   const categories = ['salary', 'medical', 'grocery', 'transport', 'entertainment', 'other'];
const [preview, setPreview] = useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
toast.success("🎉 Transaction Added!");

  // Simulate fake backend delay
  setTimeout(() => {
    setPreview({ ...formData });
    setTimeout(() => setPreview(null), 3000);
    setFormData({
      type: 'credit',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      category: 'salary',
    });
  }, 500);
};

const categories = [
  { label: '💼 Salary', value: 'salary' },
  { label: '💊 Medical', value: 'medical' },
  { label: '🛒 Grocery', value: 'grocery' },
  { label: '🚗 Transport', value: 'transport' },
  { label: '🎬 Entertainment', value: 'entertainment' },
  { label: '📝 Other', value: 'other' },
];

  return (
    <div className="add-category-container">
      <h2>➕ Add New Transaction</h2>
      <form onSubmit={handleSubmit} className="add-form">
        <label>
          Type:
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </label>

        <label>
          Amount:
          <input
            type="number"
            name="amount"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </label>

        <label>
          Category:
          <select name="category" value={formData.category} onChange={handleChange}>
  {categories.map((cat, index) => (
    <option key={index} value={cat.value}>{cat.label}</option>
  ))}
</select>

        </label>

        <button type="submit" className="submit-btn">💾 Save Transaction</button>
      </form>

      {preview && (
  <div className="modal-overlay" onClick={() => setPreview(null)}>
    <div
      className={`modal-content ${preview.type === 'credit' ? 'credit-popup' : 'debit-popup'}`}
      onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
    >
      <h3>🎉 Transaction Added!</h3>
      <p><strong>Type:</strong> {preview.type}</p>
      <p><strong>Amount:</strong> ₹{preview.amount}</p>
      <p><strong>Date:</strong> {preview.date}</p>
      <p><strong>Category:</strong> {preview.category}</p>
    </div>
  </div>
)}

<ToastContainer position="bottom-right" autoClose={2000} />

    </div>
  );
};

export default AddCategoryPage;
