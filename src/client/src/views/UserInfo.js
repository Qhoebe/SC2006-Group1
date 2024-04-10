import React, { useState, useEffect } from 'react';
import UserOverview from '../components/userOverview';
import ExpenseContainer from '../components/expenseContainer';
import DistanceContainer from '../components/distanceContainer';
import { getUserDetails } from '../apiCalls/userApi';
import '../styles/userInfo.css';
import SpendingGraph from '../components/spendingGraph';
import { UpdateProvider } from '../context/UpdateContext';
import MapContainer from '../components/mapContainer'


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
    <div className="userContainer">
      <div className='userContainer-row1'>
        <h1 className="userInfo-carName">{carModel}</h1>
        <div className="userInfo-carFuelConsumption">CAR FUEL CONSUMPTION: {fuelConsumption}L/100KM</div>
      </div>
      <UpdateProvider> {/* Wrap components that need access to expenses context */}
        <div className='userContainer-overview'>
          <UserOverview username={username}/>
        </div>
        <div className='userContainer-details'>
          <ExpenseContainer username={username} />
          <DistanceContainer username={username}/>
          <SpendingGraph username = {username} />
        </div>
        <div className='userContainer-mapInsight'>
          <MapContainer username = {username} />
        </div>
      </UpdateProvider>
    </div>
  );
  
}

export default UserInfoView;
