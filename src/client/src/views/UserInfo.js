import React, { useState, useEffect } from 'react';
import UserOverview from '../components/userOverview';
import ExpenseContainer from '../components/expenseContainer';
import DistanceContainer from '../components/distanceContainer';
import SpendingGraph from '../components/spendingGraph';
import MapContainer from '../components/mapContainer';
import { getUserDetails } from '../apiCalls/userApi';
import { UpdateProvider } from '../context/UpdateContext';

import '../styles/userInfo.css';

function UserInfoView() {
  const username = window.sessionStorage.getItem("username");
  const [carModel, setCarModel] = useState('');
  const [fuelConsumption, setFuelConsumption] = useState('');

  useEffect(() => {
if(username===null)
{
  window.location.href = "/login";
  return;
}


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
  }, [username]);

  return (
   
      <div className="userContainer">
        <div className='userContainer-row1'>
          <h1 className="p-5 text-5xl font-bold text-white ">Car Model :</h1>
          <h1 className="userInfo-carName"> {carModel}</h1>
          <div className="userInfo-carFuelConsumption">CAR FUEL CONSUMPTION: {fuelConsumption}L/100KM</div>
        </div>
        <UpdateProvider>
          <div className='userContainer-overview'>
            <UserOverview username={username}/>
          </div>
          <div className='userContainer-details'>
            <ExpenseContainer username={username} />
            <DistanceContainer username={username}/>
            <SpendingGraph username={username} />
          </div>
          <div className='userContainer-mapInsight'>
            <MapContainer username={username} />
          </div>
        </UpdateProvider>
      </div>
     
  );
}

export default UserInfoView;
