import React, { useState, useEffect } from 'react';
import { fetchExpenses } from '../services/api';
import { DollarSign, TrendingUp, ShoppingBag, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load expenses when Dashboard mounts
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchExpenses();
      setExpenses(data);
      setLoading(false);
    };
    loadData();
  }, []);

  // 1. Calculate TOTAL EXPENSES
  const totalExpenses = expenses.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

  // 2. Calculate Average Expense
  const averageExpense = expenses.length > 0 ? (totalExpenses / expenses.length) : 0;

  // 3. Category Breakdown calculation
  const categoryTotals = expenses.reduce((acc, curr) => {
    const cat = curr.category || 'Other';
    acc[cat] = (acc[cat] || 0) + Number(curr.amount || 0);
    return acc;
  }, {});

  // Find top category
  let topCategory = 'None';
  let maxCatTotal = 0;
  Object.entries(categoryTotals).forEach(([cat, amt]) => {
    if (amt > maxCatTotal) {
      maxCatTotal = amt;
      topCategory = cat;
    }
  });

  // Recent 5 expenses
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div>
      {/* Total Expenses Hero Banner */}
      <div className="hero-banner">
        <div className="hero-info">
          <h1>Financial Dashboard</h1>
          <p>Track your spending habits and manage your budget effortlessly.</p>
        </div>
        <div className="total-amount-box">
          <div className="total-label">Total Expenses</div>
          <div className="total-value">${totalExpenses.toFixed(2)}</div>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Spent</h3>
            <p>${totalExpenses.toFixed(2)}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon teal">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Transactions</h3>
            <p>{expenses.length}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon amber">
            <ShoppingBag size={24} />
          </div>
          <div className="stat-content">
            <h3>Top Category</h3>
            <p>{topCategory}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon rose">
            <Calendar size={24} />
          </div>
          <div className="stat-content">
            <h3>Avg Expense</h3>
            <p>${averageExpense.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Grid Layout for Recent Transactions & Category Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {/* Recent Transactions List */}
        <div className="glass-card">
          <div className="card-header">
            <h2 className="card-title">Recent Transactions</h2>
            <Link to="/expenses" style={{ color: '#6366f1', fontSize: '0.9rem', textDecoration: 'none', fontWeight: '600' }}>
              View All →
            </Link>
          </div>

          {loading ? (
            <p style={{ color: '#94a3b8' }}>Loading expenses...</p>
          ) : recentExpenses.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">💸</div>
              <p>No expenses logged yet.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentExpenses.map((expense) => (
                <div 
                  key={expense._id}
                  style={{
                    display: 'flex',
                    justifyConstraint: 'space-between',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 16px',
                    background: 'rgba(15, 23, 42, 0.4)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem' }}>{expense.title}</strong>
                    <span className={`category-badge cat-${expense.category}`} style={{ marginTop: '4px' }}>
                      {expense.category}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="amount-text">${Number(expense.amount).toFixed(2)}</div>
                    <small style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                      {new Date(expense.date).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Category Breakdown */}
        <div className="glass-card">
          <div className="card-header">
            <h2 className="card-title">Spending by Category</h2>
          </div>
          {Object.keys(categoryTotals).length === 0 ? (
            <div className="empty-state">
              <p>No category data available.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {Object.entries(categoryTotals).map(([cat, amount]) => {
                const percentage = totalExpenses > 0 ? ((amount / totalExpenses) * 100).toFixed(0) : 0;
                return (
                  <div key={cat}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '6px' }}>
                      <span className={`category-badge cat-${cat}`}>{cat}</span>
                      <span style={{ fontWeight: '600' }}>${amount.toFixed(2)} ({percentage}%)</span>
                    </div>
                    <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: '6px', height: '8px', overflow: 'hidden' }}>
                      <div 
                        style={{ 
                          width: `${percentage}%`, 
                          background: 'linear-gradient(90deg, #6366f1, #38bdf8)', 
                          height: '100%', 
                          borderRadius: '6px' 
                        }} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
