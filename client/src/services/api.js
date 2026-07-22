// API Helper for Expense Tracker Backend (Express + MongoDB)
const API_URL = '/api/expenses';

// Sample fallback data for immediate demo if backend DB is empty or connecting
const initialSampleExpenses = [
  {
    _id: 'sample-1',
    title: 'Grocery Shopping',
    amount: 84.50,
    category: 'Food',
    date: new Date(Date.now() - 86400000 * 1).toISOString()
  },
  {
    _id: 'sample-2',
    title: 'Electricity Bill',
    amount: 120.00,
    category: 'Utilities',
    date: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    _id: 'sample-3',
    title: 'Movie Night & Popcorn',
    amount: 32.00,
    category: 'Entertainment',
    date: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    _id: 'sample-4',
    title: 'Bus Pass & Transport',
    amount: 45.00,
    category: 'Transportation',
    date: new Date(Date.now() - 86400000 * 7).toISOString()
  }
];

// 1. Fetch all expenses from backend
export const fetchExpenses = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.warn('⚠️ Server/DB unavailable, using sample data:', error.message);
    // Check if we saved local state fallback
    const local = localStorage.getItem('demo_expenses');
    if (local) return JSON.parse(local);
    localStorage.setItem('demo_expenses', JSON.stringify(initialSampleExpenses));
    return initialSampleExpenses;
  }
};

// 2. Add a new expense
export const createExpense = async (expenseData) => {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expenseData)
    });
    if (!res.ok) throw new Error('Failed to create expense on server');
    return await res.json();
  } catch (error) {
    console.warn('⚠️ Server error, saving locally:', error.message);
    const local = JSON.parse(localStorage.getItem('demo_expenses') || '[]');
    const newDoc = {
      _id: 'local-' + Date.now(),
      ...expenseData,
      date: new Date(expenseData.date || Date.now()).toISOString()
    };
    const updated = [newDoc, ...local];
    localStorage.setItem('demo_expenses', JSON.stringify(updated));
    return newDoc;
  }
};

// 3. Delete an expense by ID
export const removeExpense = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete on server');
    return await res.json();
  } catch (error) {
    console.warn('⚠️ Server error, deleting locally:', error.message);
    const local = JSON.parse(localStorage.getItem('demo_expenses') || '[]');
    const updated = local.filter(item => item._id !== id);
    localStorage.setItem('demo_expenses', JSON.stringify(updated));
    return { id };
  }
};
