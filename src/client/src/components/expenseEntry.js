import React, { useState } from 'react';
import '../styles/entry.css';

const categories = ['PETROL', 'REPAIR', 'ACCESSORIES'];

const ExpenseEntry = ({ expense, onDelete, onEdit }) => {
  const { category, cost, date, amountOfFuelPump } = expense;
  const formattedDate = new Date(date).toLocaleDateString();

  // State to track hover state
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="entry" 
         onMouseEnter={() => setIsHovered(true)} 
         onMouseLeave={() => setIsHovered(false)}>
      <div className="entry-row1">
        <div className="entry-title" style={{ opacity: isHovered ? 0.5 : 1 }}>
          {categories[category]}
        </div>
        <div className="entry-date" style={{ opacity: isHovered ? 0.5 : 1 }}>
          {formattedDate}
        </div>
      </div>
      <div>
        <div className="entry-details" style={{ opacity: isHovered ? 0.5 : 1 }}>
          Spent: ${cost}
        </div>
        {category === 0 && (
          <div className="entry-details" style={{ opacity: isHovered ? 0.5 : 1 }}>
            Fuel Pumped: {amountOfFuelPump}L
          </div>
        )}
      </div>
        {isHovered && (
          <div className="entry-actions">
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
