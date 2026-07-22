import React, { useState } from 'react';
import { createExpense } from '../services/api';
import { PlusCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const AddExpense = () => {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0] // default to today's date YYYY-MM-DD
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Input Validation
    if (!formData.title.trim()) {
      setErrorMsg('Please enter an expense title.');
      return;
    }
    if (!formData.amount || Number(formData.amount) <= 0) {
      setErrorMsg('Please enter a valid positive amount.');
      return;
    }

    try {
      setLoading(true);
      await createExpense({
        title: formData.title,
        amount: Number(formData.amount),
        category: formData.category,
        date: formData.date
      });

      setSuccessMsg('Expense added successfully!');
      
      // Reset form
      setFormData({
        title: '',
        amount: '',
        category: 'Food',
        date: new Date().toISOString().split('T')[0]
      });

      // Optionally navigate after 1.5s
      setTimeout(() => {
        navigate('/expenses');
      }, 1500);
    } catch (err) {
      setErrorMsg('Failed to add expense. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
      </div>

      <div className="glass-card">
        <div className="card-header" style={{ marginBottom: '24px' }}>
          <h1 className="card-title" style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <PlusCircle style={{ color: '#6366f1' }} size={24} />
            Add New Expense
          </h1>
        </div>

        {/* Notifications */}
        {successMsg && (
          <div className="alert-success">
            <CheckCircle2 size={20} />
            <span>{successMsg} Redirecting to Expenses list...</span>
          </div>
        )}

        {errorMsg && (
          <div className="alert-success" style={{ background: 'rgba(244, 63, 94, 0.15)', borderColor: 'rgba(244, 63, 94, 0.3)', color: '#fb7185' }}>
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="form-group">
            <label className="form-label" htmlFor="title">Expense Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              placeholder="e.g. Grocery Shopping, Netflix Subscription"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Amount & Category Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="amount">Amount ($)</label>
              <input
                type="number"
                id="amount"
                name="amount"
                step="0.01"
                min="0"
                className="form-control"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                className="form-control"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Food">Food 🍔</option>
                <option value="Transportation">Transportation 🚗</option>
                <option value="Utilities">Utilities 💡</option>
                <option value="Entertainment">Entertainment 🎬</option>
                <option value="Shopping">Shopping 🛍️</option>
                <option value="Other">Other 📦</option>
              </select>
            </div>
          </div>

          {/* Date */}
          <div className="form-group">
            <label className="form-label" htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              className="form-control"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '12px' }}>
            {loading ? 'Saving Expense...' : 'Save Expense'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
