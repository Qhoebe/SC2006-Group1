import React, { useState, useEffect } from 'react';
import UserOverview from '../components/userOverview';
import ExpenseContainer from '../components/expenseContainer';
import DistanceContainer from '../components/distanceContainer';
import { getUserDetails } from '../apiCalls/userApi';
import '../styles/userInfo.css';
import SpendingGraph from '../components/spendingGraph';

function UserInfoView() {

  const username = 'bob';

  const [carModel, setCarModel] = useState('');
  const [fuelConsumption, setFuelConsumption] = useState('');

  useEffect(() => {
    getUserDetails(username)
      .then(user => {
        const { carName, carFuelConsumption } = user;
        setCarModel(carName);
        setFuelConsumption(carFuelConsumption);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
        setCarModel('-');
        setFuelConsumption('-');
      });

  }, [username]); // Dependency array ensures that useEffect runs whenever username changes
    
  return (
    <div className="userInfo">
      <div className="userInfo-carDetails">
        <h1 className="userInfo-carName">{carModel}</h1>
        <div className="userInfo-carFuelConsumption">CAR FUEL CONSUMPTION: {fuelConsumption}L/100KM</div>
      </div>
      <div className="userInfo-userOverview">
        <UserOverview username={username}/>
      </div>
      <div className="userInfo-expenses">
        <ExpenseContainer username={username} />
      </div>
      <div className="userInfo-distance">
        <DistanceContainer />
      </div>
      {/* <div>
        <SpendingGraph />
      </div> */}
    </div>
  );
  
}

export default UserInfoView;
