import React, { useState } from 'react';
import '../styles/expenseEntry.css';

const categories = ['PETROL', 'REPAIR', 'ACCESSORIES'];

const ExpenseEntry = ({ expense, onDelete, onEdit }) => {
  const { category, cost, date, amountOfFuelPump } = expense;
  const formattedDate = new Date(date).toLocaleDateString();

  // State to track hover state
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="expense-entry" 
         onMouseEnter={() => setIsHovered(true)} 
         onMouseLeave={() => setIsHovered(false)}>
      <div className="expense-content">
        <div className="expense-category" style={{ opacity: isHovered ? 0.5 : 1 }}>
          {categories[category]}
        </div>
        <div className="expense-cost" style={{ opacity: isHovered ? 0.5 : 1 }}>
          Spent: ${cost}
        </div>
        <div className="expense-date" style={{ opacity: isHovered ? 0.5 : 1 }}>
          {formattedDate}
        </div>
        {category === 0 && (
          <div className="expense-fuel" style={{ opacity: isHovered ? 0.5 : 1 }}>
            Fuel Pumped: {amountOfFuelPump}L
          </div>
        )}
        </div>
        {isHovered && (
          <div className="expense-actions">
          <img
            className="delete-btn"
            src="/icons/delete.png"
            alt="Delete"
            onClick={() => onDelete(expense)}
            style={{ width: '30px', height: '30px' }}
          />
          <img
            className="edit-btn"
            src="/icons/edit.png"
            alt="Edit"
            onClick={() => onEdit(expense)}
            style={{ width: '30px', height: '30px' }}
          />
        </div>
      
      )}
    </div>
  );
};

export default ExpenseEntry;
