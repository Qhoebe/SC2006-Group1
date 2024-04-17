import {React,useState, useEffect} from 'react';
import {handleFetchInsights} from '../apiCalls/insightApi'
import '../styles/userOverview.css';
import { useUpdate  } from '../context/UpdateContext';


const UserOverview = ({ username }) => {
  
  const [repairSpent, setRepairSpent] = useState('-'); 
  const [accessoriesSpent, setAccessoriesSpent] = useState('-');
  const [distance, setDistance] = useState('-'); 
  const [fuelSpent, setFuelSpent] = useState('-');
  const [fuelPump, setFuelPump] = useState('-'); 
  const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1,8,0,0)); // Default start date is the beginning of the current month
  const [endDate, setEndDate] = useState(()=>{
    const ukDate = new Date(); 
    return new Date(ukDate.setHours(ukDate.getHours()+8)) // Change to Singapore time zone and date
  });
  const [errorMessage, setErrorMessage] = useState('');
  const { updateFlag } = useUpdate();

  const ukDate = new Date(); 
  const today = new Date(ukDate.setHours(ukDate.getHours()+8)).toISOString().split('T')[0];

  // Define the minimum date 
  const minDate = "2020-01-01";

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const data = await handleFetchInsights(username, startDate, endDate);
        setDistance(data[0]);
        setFuelPump(data[1]);
        setFuelSpent(data[2]);
        setRepairSpent(data[3]);
        setAccessoriesSpent(data[4]);

      } catch (error) {
        console.error('Error fetching insights:', error);
      }
    };

    fetchInsights();

  }, [username, startDate, endDate, updateFlag]);

  // Function to handle changes in the start date input
  const handleStartDateChange = (event) => {
    setStartDate(new Date(event.target.value));
    setErrorMessage(''); // Reset error message when start date changes
  };

  const handleEndDateChange = (event) => {
    const selectedEndDate = new Date(event.target.value);
    
    // Check if the selected end date is after the start date
    if (selectedEndDate >= startDate) {
      setEndDate(selectedEndDate);
      setErrorMessage(''); // Reset error message when end date changes
    } else {
      // If selected end date is not after the start date, set it to the start date
      setEndDate(startDate);
      setErrorMessage('End date must be after or on start date'); // Show error message
      // Clear the error message after 5 seconds
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  return (
    <div className="rounded-rectangle">
      <div className='overview-row1'>
        <div className='overview-header'>OVERVIEW</div>
        <div className="date-style">
          <label htmlFor="startDate">from </label>
          <input type="date" value={startDate.toISOString().split('T')[0]} onChange={handleStartDateChange} min={minDate} max={today} onKeyDown={(e) => e.preventDefault()} />
          <label htmlFor="endDate"> to </label>
          <input type="date" value={endDate.toISOString().split('T')[0]} onChange={handleEndDateChange} min={startDate} max={today} onKeyDown={(e) => e.preventDefault()} />
        </div>
      </div>
      <div className="error-message">
        <p className='overview-filler'>.</p>
        {errorMessage && <span>{errorMessage}</span>}
      </div>
      <table>
        <thead>
          <tr>
            <th>ACCESSORIES SPENT</th>
            <th>REPAIR SPENT</th>
            <th>FUEL SPENT</th>
            <th>FUEL PUMP</th>
            <th>DISTANCE TRAVELLED</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${accessoriesSpent}</td>
            <td>${repairSpent}</td>
            <td>${fuelSpent}</td>
            <td>{fuelPump}L</td>
            <td>{distance.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserOverview;
