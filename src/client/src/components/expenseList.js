import {React} from 'react';
import ExpenseEntry from './expenseEntry';
import '../styles/list.css';

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  // Check if expenses is not defined or null
  if (!expenses) {
    // Handle the case when expenses is undefined or null
    return <div>Loading...</div>;
  }

  return (
    <div className="list">
      {expenses.map((expense) => (
        <ExpenseEntry key={expense._id} expense={expense} onDelete={onDelete} onEdit={onEdit}/>
      ))}
    </div>
  );
};

export default ExpenseList;
