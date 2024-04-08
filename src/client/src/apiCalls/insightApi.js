const handleFetchInsights = async (username, startDate, endDate) => {
  try {
    // Make a PUT request to fetch expenses data
    const response = await fetch('insights/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: username, startDate:startDate, endDate:endDate }), // Convert the object to JSON string
  });
  
    // Parse the JSON response
    const insightsData = await response.json();

    return insightsData

  } catch (error) {
    console.error('An error occurred while fetching insights:', error);
  }
};

const handleFetchDataForGraph = async (username) => {
  try {
    // Make a PUT request to fetch expenses data
    const response = await fetch('insights/graph', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: username}), // Convert the object to JSON string
  });
  
    // Parse the JSON response
    const insightsData = await response.json();

    return insightsData

  } catch (error) {
    console.error('An error occurred while fetching insights:', error);
  }
};

export {handleFetchInsights, handleFetchDataForGraph}
  