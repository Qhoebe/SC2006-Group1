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
  
  export {handleDeleteExpense, handleUpdateExpense, handleAddNewExpense, handleFetchExpenses}