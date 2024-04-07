import React, { useState, useEffect } from 'react';
import '../styles/addExpense.css';

const categories = ['PETROL', 'REPAIR', 'ACCESSORIES'];

const ExpenseForm = ({ isOpen, onClose, onSave, expense }) => {
  const [category, setCategory] = useState('');
  const [cost, setCost] = useState('');
  const [date, setDate] = useState('');
  const [amountOfFuelPump, setAmountOfFuelPump] = useState('');

  // Update form fields when expense prop changes
  useEffect(() => {
    if (expense && Object.keys(expense).length > 0) {
      setCategory(String(expense.category));
      setCost(String(expense.cost));
      setDate(expense.date);
      setAmountOfFuelPump(String(expense.amountOfFuelPump));
    } else {
      // Set default values when creating a new expense
      setCategory('');
      setCost('');
      setDate('');
      setAmountOfFuelPump('');
    }
  }, [expense]);

  const handleSave = () => {
    // Check if an expense is provided and if it has an _id property to determine if it's an update
    if (expense && '_id' in expense) {
      onSave({ _id: expense._id, category: parseInt(category), cost: parseInt(cost), date, amountOfFuelPump: parseInt(amountOfFuelPump) });
    } else {
      onSave({ category: parseInt(category), cost: parseInt(cost), date, amountOfFuelPump: parseInt(amountOfFuelPump) });
    }
    setCategory('');
    setCost('');
    setDate('');
    setAmountOfFuelPump('');
  };

  const handleCostChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && Number(value) >= 0) {
      setCost(value);
    }
  };

  const handleAmountOfFuelChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && Number(value) >= 0) {
      setAmountOfFuelPump(value);
    }
  };

  return (
    isOpen && (
      <div className="add-expense-form">
        <div>
          <h2>{expense && Object.keys(expense).length > 0 ? 'EDIT EXPENSE' : 'ADD EXPENSE'}</h2>
          <label>
            Category:
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="" disabled defaultValue>Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={String(index)}>{cat}</option>
              ))}
            </select>
          </label>
          <label>
            Amount Spent:
            <input type="number" value={cost} onChange={handleCostChange} />
          </label>
          <label>
            Date:
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          {category === '0' && (
            <label>
              Fuel Pump:
              <input type="number" value={amountOfFuelPump} onChange={handleAmountOfFuelChange} />
            </label>
          )}
          <button onClick={handleSave}>{expense && Object.keys(expense).length > 0 ? 'Update' : 'Save'}</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    )
  );
};


export default ExpenseForm;