// Function to fetch expenses data from the server
const handleFetchDistance = async (username) => {
    try {
      // Make a PUT request to fetch expenses data
      const response = await fetch('distance/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username }), // Convert the object to JSON string
    });
    
      // Parse the JSON response
      const distanceData = await response.json();
  
      return distanceData
  
    } catch (error) {
      console.error('An error occurred while fetching distance:', error);
    }
  };
  
  const handleUpdateDistance = async (distanceData) => {
    try {
      const response = await fetch('distance/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(distanceData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update distance');
      }
  
    } catch (error) {
      console.error('An error occurred while updating distance:', error);
    }
  };
  
  const handleAddNewDistance = async (distanceData) => {
    try {
      const response = await fetch('distance/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(distanceData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add new distanceRecord');
      }
  
      // Handle successful addition
      // For example, update the state or perform any other necessary action
    } catch (error) {
      console.error('An error occurred while adding new distanceRecord:', error);
    }
  };
  
  const handleDeleteDistance = async (distanceId) => {
    try {
      const response = await fetch('distance/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: distanceId }), // Convert the object to JSON string
      });
      
      if (response.ok) {
        // If the request is successful (status code 200-299), return true
        return true;
      } else {
        // If the request is not successful, throw an error
        throw new Error('Failed to delete distanceRecord');
      }
    } catch (error) {
      console.error('An error occurred while deleting distanceRecord:', error);
      // If an error occurs during the request, return false
      return false;
    }
  };
  
  export {handleDeleteDistance, handleUpdateDistance, handleAddNewDistance, handleFetchDistance}