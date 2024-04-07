import React, { useState, useEffect } from 'react';
import UserOverview from '../components/userOverview';
import ExpenseContainer from '../components/expenseContainer';
import DistanceContainer from '../components/distanceContainer';
import '../styles/userInfo.css';

function UserInfoView() {

  const username = 'bob';

  const [carModel, setCarModel] = useState('');
  const [fuelConsumption, setFuelConsumption] = useState('');

  useEffect(() => {
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
        const { carName, carFuelConsumption } = user;
        setCarModel(carName);
        setFuelConsumption(carFuelConsumption);
      } catch (error) {
        console.error('Error fetching user details:', error);
        // Handle error, e.g., show an error message
      }
    }

    // get the actual username 
    getUserDetails(username);
    
  }, []); // Empty dependency array ensures that useEffect runs only once after initial render

  return (
    <div className="userInfo">
      <div className="userInfo-carDetails">
        <h1 className="userInfo-carName">{carModel}</h1>
        <div className="userInfo-carFuelConsumption">CAR FUEL CONSUMPTION: {fuelConsumption}L/100KM</div>
      </div>
      <div className="userInfo-userOverview">
        <UserOverview />
      </div>
      <div className="userInfo-expenses">
        <ExpenseContainer username={username} />
      </div>
      <div className="userInfo-distance">
        <DistanceContainer />
      </div>
    </div>
  );
  
}

export default UserInfoView;
