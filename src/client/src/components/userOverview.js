import React from 'react';
import '../styles/userOverview.css';

const UserOverview = () => {
  /**
   * fetch date here 
   */
  let distance = '2312KM';
  let fuelPump = '123L';
  let fuelSpent = '$123';
  let startDate = new Date();
  startDate = startDate.toLocaleDateString();
  let endDate = new Date()
  endDate = endDate.toLocaleDateString(); 

  return (
    <div className="rounded-rectangle">
      <div className="date-style">
        {startDate} - {endDate}
      </div>
      <table>
        <thead>
          <tr>
            <th>DISTANCE TRAVELLED</th>
            <th>FUEL PUMP</th>
            <th>FUEL AMOUNT SPENT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{distance}</td>
            <td>{fuelPump}</td>
            <td>{fuelSpent}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserOverview;
