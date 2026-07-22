# 💰 Expense Tracker App (React + Node.js + Express + MongoDB)

A beginner-friendly 3-page Expense Tracker web application built with the MERN stack (MongoDB, Express, React, Node.js).

---

## 🌟 Application Features & 3 Pages

1. **Dashboard Page (`/`)**:
   - Displays **Total Expenses** prominently at the top.
   - Summarizes key statistics: Total Spent, Number of Transactions, Top Category, and Average Expense.
   - Shows recent transaction logs and spending breakdown by category.

2. **Add Expense Page (`/add`)**:
   - Clean, intuitive form to add a new expense.
   - Required Schema Fields: `title`, `amount`, `category`, and `date`.
   - Sends new expenses to the Express API & MongoDB database.

3. **Expenses Page (`/expenses`)**:
   - Full list table of all recorded expenses.
   - Shows live calculated **Total Expenses** for the filtered view.
   - Search bar to search expenses by title and dropdown to filter by category.
   - Ability to delete expenses.

---

## 📁 Project Structure

```
ExpenseTracker/
├── server/                     # Node.js & Express Backend
│   ├── models/
│   │   └── Expense.js          # Mongoose Schema (title, amount, category, date)
│   ├── routes/
│   │   └── expenseRoutes.js    # Express REST API (GET, POST, DELETE)
│   ├── .env                    # Environment config (PORT, MONGODB_URI)
│   └── server.js               # Main Express server file
│
└── client/                     # React Frontend (Vite + React Router)
    ├── src/
    │   ├── components/
    │   │   └── Navbar.jsx      # Navigation bar
    │   ├── pages/
    │   │   ├── Dashboard.jsx   # Page 1: Dashboard
    │   │   ├── AddExpense.jsx  # Page 2: Add Expense Form
    │   │   └── Expenses.jsx    # Page 3: Expenses Table & Total
    │   ├── services/
    │   │   └── api.js          # API service for connecting to backend
    │   ├── App.jsx             # React Router Setup
    │   └── index.css           # Styling & Glassmorphism Theme
    └── vite.config.js
```

---

## 🚀 How to Run the Application

### 1. Run Backend Server (Node.js & Express)
```bash
cd server
npm install
npm run dev
```
The server will start at `http://localhost:5000` and connect to MongoDB (`mongodb://127.0.0.1:27017/expensetracker`).

### 2. Run Frontend App (React + Vite)
In a new terminal window:
```bash
cd client
npm install
npm run dev
```
Open `http://localhost:3000` in your browser!

---

## 🗄️ MongoDB Schema

```javascript
{
  title: String,     // e.g. "Grocery Shopping"
  amount: Number,    // e.g. 45.50
  category: String,  // e.g. "Food", "Utilities", "Entertainment", "Transportation", "Shopping", "Other"
  date: Date         // e.g. "2026-07-22"
}
```
# ExpenseTracker
