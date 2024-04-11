import React, { useState, useEffect, useContext } from "react";
import SearchBar from "../utils/searchBar";
import calculateRoutes from "../utils/calculateRoutes";
import '../styles/form.css';
import ScriptLoadContext from '../context/ScriptLoadContext';

function DistanceForm({ isOpen, onClose, onSave, distanceRecord }) {
  const [distanceTravelled, setDistanceTravelled] = useState(0) 
  const [to, setTo] = useState('')
  const [from, setFrom] = useState('')
  const [date, setDate] = useState('')
  const [fromLatLng, setFromLatLng] = useState(null);
  const [toLatLng, setToLatLng] = useState(null);
  const [routes, setRoutes] = useState(null)
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0); // State to track selected route index
  const [saveRequested, setSaveRequested] = useState(false);

  const { isScriptLoaded, googleMaps } = useContext(ScriptLoadContext);


  useEffect(() => {
    if (isScriptLoaded && fromLatLng && toLatLng && googleMaps) {
      calculateRoutes(fromLatLng, toLatLng, googleMaps, (error, routes) => {
        if (error) {
          console.error("Error calculating routes:", error.message);
          setRoutes(null);
        } else {
          setRoutes(routes);
        }
      });
    }
  }, [fromLatLng, toLatLng, isScriptLoaded, googleMaps]);

  useEffect(() => {
    // Reset selected route index when routes array changes
    if (routes && routes.length > 0) {
      setSelectedRouteIndex(0); // Reset to first route by default
    } else {
      setSelectedRouteIndex(null); // No routes available
    }
  }, [routes]);

  useEffect(() => {

    setFrom('');
    setTo('');
    setDate('');
    setDistanceTravelled('');
    
  }, [distanceRecord]);

  const handlePlaceChange = (name, latLng, isSource = true) => {
    if (isSource) {
      setFrom(name);
      setFromLatLng(latLng);
    } else {
      setTo(name);
      setToLatLng(latLng);
    }
  };

  useEffect(() => {

    if (saveRequested) {
      
      onSave({ to: to, from: from, distanceTravelled: parseFloat(distanceTravelled), date: new Date(date)});
    
      // Reset states after saving
      setFrom('');
      setTo('');
      setDate('');
      setDistanceTravelled(0); // Assuming the initial state is 0 or any other default value
      setFromLatLng(null);
      setToLatLng(null);
      setSaveRequested(false); // Reset the save trigger
    }
  }, [distanceTravelled, saveRequested]);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSave = () => {
    if (!to || !from || !date){
      alert('Please fill in the all required section');
      return;
    }

    const distanceString = parseFloat(routes[selectedRouteIndex].distance).toFixed(1);
    setDistanceTravelled(distanceString); // Schedule the distance update
    setSaveRequested(true); // Indicate that a save has been requested
  };

  // Dropdown selection change handler
  const handleRouteSelectionChange = (event) => {
    setSelectedRouteIndex(parseInt(event.target.value, 10));
  };

  return isOpen && (
    <div className="form">
      <label>
        Date:
        <input type="date" value={date} onChange={handleDateChange} />
      </label>
      <label>
        From:
        <SearchBar
          placeholder="Enter source location"
          onPlaceSelect={(name, latLng) => handlePlaceChange(name, latLng, true)}
        />
      </label>
      <label>
        To:
        <SearchBar
          placeholder="Enter destination location"
          onPlaceSelect={(name, latLng) => handlePlaceChange(name, latLng, false)}
        />
      </label>
      {routes && routes.length > 0 && selectedRouteIndex !== null && routes[selectedRouteIndex] &&(
        <>
          <label htmlFor="routeSelection">Select Route:</label>
          <select
            id="routeSelection"
            value={selectedRouteIndex}
            onChange={handleRouteSelectionChange}
          >
            {routes.map((route, index) => (
              <option key={index} value={index}>
                {route.summary}
              </option>
            ))}
          </select>
          <div>
            <p>Distance: {routes[selectedRouteIndex].distance}</p>
          </div>
        </>
      )}
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default DistanceForm;
