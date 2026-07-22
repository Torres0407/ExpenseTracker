import React, { useState, useEffect } from 'react';
import { fetchExpenses, removeExpense } from '../services/api';
import { Trash2, Search, Filter, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch expenses on load
  const loadExpenses = async () => {
    setLoading(true);
    const data = await fetchExpenses();
    setExpenses(data);
    setLoading(false);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  // Handle Delete Expense
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      await removeExpense(id);
      setExpenses(expenses.filter((item) => item._id !== id));
    }
  };

  // Filter expenses by search query and category
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || expense.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate TOTAL EXPENSES for filtered list
  const totalFilteredAmount = filteredExpenses.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

  return (
    <div>
      {/* Header Banner showing Total Expenses */}
      <div className="hero-banner" style={{ padding: '24px 32px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>All Expenses</h1>
          <p>View, search, filter, and manage your complete expense log.</p>
        </div>
        <div className="total-amount-box">
          <div className="total-label">Total Shown</div>
          <div className="total-value">${totalFilteredAmount.toFixed(2)}</div>
        </div>
      </div>

      <div className="glass-card">
        {/* Search & Category Filter Row */}
        <div className="filters-row">
          <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: '#94a3b8' }} />
            <input
              type="text"
              className="form-control search-input"
              style={{ paddingLeft: '42px' }}
              placeholder="Search expenses by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={18} style={{ color: '#94a3b8' }} />
            <select
              className="form-control"
              style={{ width: 'auto' }}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Utilities">Utilities</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <Link to="/add" className="btn-primary" style={{ textDecoration: 'none', width: 'auto', padding: '10px 20px' }}>
            <PlusCircle size={18} /> Add New
          </Link>
        </div>

        {/* Expenses List Table */}
        {loading ? (
          <p style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>Loading expense entries...</p>
        ) : filteredExpenses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No expenses found</h3>
            <p>Try adjusting your search or category filter.</p>
          </div>
        ) : (
          <div className="expenses-table-container">
            <table className="expenses-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((expense) => (
                  <tr key={expense._id}>
                    <td>
                      <strong style={{ color: '#f8fafc' }}>{expense.title}</strong>
                    </td>
                    <td>
                      <span className={`category-badge cat-${expense.category}`}>
                        {expense.category}
                      </span>
                    </td>
                    <td style={{ color: '#94a3b8' }}>
                      {new Date(expense.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td>
                      <span className="amount-text">${Number(expense.amount).toFixed(2)}</span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => handleDelete(expense._id)}
                        className="btn-delete"
                        title="Delete expense"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Expenses;
