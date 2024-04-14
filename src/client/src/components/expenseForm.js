import React, { useState, useEffect } from 'react';
import '../styles/form.css';

const categories = ['PETROL', 'REPAIR', 'ACCESSORIES'];

const ExpenseForm = ({ isOpen, onClose, onSave, expense }) => {
  const [category, setCategory] = useState('');
  const [cost, setCost] = useState('');
  const [date, setDate] = useState('');
  const [amountOfFuelPump, setAmountOfFuelPump] = useState('');
  const [costError, setCostError] = useState('');
  const [amountOfFuelPumpError, setAmountOfFuelPumpError] = useState('');

  const ukDate = new Date(); 
  const today = new Date(ukDate.setHours(ukDate.getHours()+8)).toISOString().split('T')[0];

  // Define the minimum date 
  const minDate = "2020-01-01";

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
    // Clear previous errors
    setCostError('');
    setAmountOfFuelPumpError('');

    // Validation checks
    if (parseInt(cost) > 10000000) {
      setCostError('Cost cannot exceed 10 million.');
      return;
    }
    if (category === '0' && parseInt(amountOfFuelPump) > 100000) {
      setAmountOfFuelPumpError('Amount of Fuel Pump cannot exceed 100,000.');
      return;
    }

    // Check if any of the fields are invalid
    if (isNaN(parseInt(cost)) || isNaN(new Date(date).getTime()) || (category === '0' && isNaN(parseInt(amountOfFuelPump)))) {
      alert('Please enter valid values for the fields.');
      return;
    }

    // Check if any of the required fields are empty
    if (!category || !cost || !date || (category === '0' && !amountOfFuelPump)) {
      alert('Please fill in all the required fields.');
      return;
    }

    // Proceed with saving the expense
    if (expense && '_id' in expense) {
      onSave({ _id: expense._id, category: parseInt(category), cost: parseFloat(cost), date: new Date(date), amountOfFuelPump: parseFloat(amountOfFuelPump) });
    } else {
      onSave({ category: parseInt(category), cost: parseFloat(cost), date: new Date(date), amountOfFuelPump: parseFloat(amountOfFuelPump) });
    }
    setCategory('');
    setCost('');
    setDate('');
    setAmountOfFuelPump('');
  };

  const handleCostChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && Number(value) > 0) {
      setCost(value);
      if (Number(value) > 10000000) {
        setCostError('Amount spend cannot exceed $10 million.');
      } else {
        setCostError('');
      }
    }
    else if (!isNaN(value) && Number(value) === 0){
      setCost(value);
      setCostError('Amount should be more than $0');
    }
  };

  const handleAmountOfFuelChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && Number(value) > 0) {
      setAmountOfFuelPump(value);
      if (Number(value) > 100000) {
        setAmountOfFuelPumpError('Amount of Fuel Pump cannot exceed 100,000L.');
      } else {
        setAmountOfFuelPumpError('');
      }
    }
    else if (!isNaN(value) && Number(value) === 0){
      setCost(value);
      setAmountOfFuelPumpError('Fuel Pump should be more than 0L');
    }
  };

  return (
    isOpen && (
      <div className="form">
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
            {costError && <div className="error">{costError}</div>}
          </label>
          <label>
            Date:
            <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={minDate}
            max={today}
            />
          </label>
          {category === '0' && (
            <label>
              Fuel Pump:
              <input type="number" value={amountOfFuelPump} onChange={handleAmountOfFuelChange} />
              {amountOfFuelPumpError && <div className="error">{amountOfFuelPumpError}</div>}
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
