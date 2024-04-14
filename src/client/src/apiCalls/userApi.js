// Define the getUserDetails function
async function getUserDetails(_username) {
    try {
      const response = await fetch('user/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: _username }), // Convert the object to JSON string
      });
      const user = await response.json();
      return user
    } catch (error) {
      console.error('Error fetching user details:', error);
      // Handle error, e.g., show an error message
    }
} 

export {getUserDetails}