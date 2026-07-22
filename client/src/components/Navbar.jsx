import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Receipt, Wallet } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand">
        <div className="nav-logo-icon">
          <Wallet size={22} />
        </div>
        <span>ExpenseTracker</span>
      </NavLink>

      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/add" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            <PlusCircle size={18} />
            <span>Add Expense</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/expenses" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            <Receipt size={18} />
            <span>Expenses</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
