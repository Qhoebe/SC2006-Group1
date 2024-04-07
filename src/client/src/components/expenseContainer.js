import React, { useState, useEffect, useCallback } from 'react';
import ExpenseList from './expenseList'; 
import ExpenseForm from './expenseForm';
import '../styles/container.css'; 

// Function to fetch expenses data from the server
const handleFetchExpenses = async (username) => {
  try {
    // Make a PUT request to fetch expenses data
    const response = await fetch('expenses/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: username }), // Convert the object to JSON string
  });
  
    // Parse the JSON response
    const expensesData = await response.json();

    return expensesData

  } catch (error) {
    console.error('An error occurred while fetching expenses:', error);
  }
};

const handleUpdateExpense = async (expenseData) => {
  try {
    const response = await fetch('expenses/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expenseData),
    });

    if (!response.ok) {
      throw new Error('Failed to update expense');
    }

  } catch (error) {
    console.error('An error occurred while updating expense:', error);
  }
};

const handleAddNewExpense = async (expenseData) => {
  try {
    const response = await fetch('expenses/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expenseData),
    });

    if (!response.ok) {
      throw new Error('Failed to add new expense');
    }

    // Handle successful addition
    // For example, update the state or perform any other necessary action
  } catch (error) {
    console.error('An error occurred while adding new expense:', error);
  }
};

const handleDeleteExpense = async (expenseId) => {
  try {
    const response = await fetch('expenses/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: expenseId }), // Convert the object to JSON string
    });
    
    if (response.ok) {
      // If the request is successful (status code 200-299), return true
      return true;
    } else {
      // If the request is not successful, throw an error
      throw new Error('Failed to delete expense');
    }
  } catch (error) {
    console.error('An error occurred while deleting expense:', error);
    // If an error occurs during the request, return false
    return false;
  }
};




const ExpenseContainer = ({ username }) => {

  // State to manage expenses data
  const [expenses, setExpenses] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editExpense, setEditExpense] = useState({}); // State to store expense being edited


  const handleDelete = useCallback(async (expenseToDelete) => {
    try {
      // Call handleDeleteExpense to delete the expense
      const success = await handleDeleteExpense(expenseToDelete._id);
      
      if (success) {
        // If deletion is successful, update the expenses state
        setExpenses(prevExpenses => prevExpenses.filter(expense => expense._id !== expenseToDelete._id));
      } else {
        // If deletion fails, log an error or handle it accordingly
        console.error('Failed to delete expense');
      }
    } catch (error) {
      // Handle any errors that occur during the deletion process
      console.error('An error occurred while deleting expense:', error);
    }
  }, []);
   

  const handleSaveExpense = useCallback(async (expenseData) => {
    expenseData.username = username;

    try {
      // Check if the expenseData has an _id property to determine if it's an update
      if (expenseData && '_id' in expenseData) {
        await handleUpdateExpense(expenseData);
      } else {
        await handleAddNewExpense(expenseData);
      }

      setIsFormOpen(false);
      setEditExpense({});

      // After saving the expense, fetch the updated expenses data and set the state
      const fetchedExpenses = await handleFetchExpenses(username);
      setExpenses(fetchedExpenses);
    } catch (error) {
      console.error('An error occurred while saving expense:', error);
    }
  }, [username]);


  const handleEdit = useCallback((expenseToEdit) => {
    setEditExpense(expenseToEdit); // Set the expense being edited
    setIsFormOpen(true); // Open the form for editing
  }, []); // No dependencies


  useEffect(() => {

    const fetchExpenses = async () => {
      try {
        const fetchedExpenses = await handleFetchExpenses(username);
        setExpenses(fetchedExpenses);
      } catch (error) {
        return <div>Error: Cant fetch data from server</div>;
      }
    };

    fetchExpenses();

  }, [username, handleDelete, handleSaveExpense, handleEdit]);

  return (
     <div className="container">
      <header className="container-header">
        EXPENSES
        <button className='container-button'>
        <img
            src="/icons/add.png"
            alt="add"
            style={{ width: '50px', height: '50px' }}
            onClick={() => setIsFormOpen(true)}
          /></button>
      </header>
      <ExpenseList expenses={expenses} onDelete={handleDelete} onEdit={handleEdit} />
      {isFormOpen && (
        <div className='form-backdrop'> 
          <ExpenseForm 
            isOpen={isFormOpen} 
            onClose={() => {
              setIsFormOpen(false);
              setEditExpense({});
            }} 
            onSave={handleSaveExpense} 
            expense={editExpense} 
          />
        </div>
      )}
    </div>
  );
};

export default ExpenseContainer;
