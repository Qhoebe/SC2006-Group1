import React, { useState, useRef, useCallback, useContext } from 'react';
import Map from '../utils/mapComponent';
import SearchBar from '../utils/searchBar';
import { addMarker, calculateAndDisplayRoute } from '../utils/mapUtils';
import ScriptLoadContext from '../context/ScriptLoadContext';
import '../styles/mapContainer.css'

// Petrol stations data
const petrol = [
  { name : "ESSO", fuel : { "92" : 2.92, "95" : 2.97, "98" : 3.45, "DIESEL" : 2.70 } },
  { name : "SHELL", fuel : { "95" : 2.97, "98" : 3.47, "PREMIUM" : 3.69, "DIESEL" : 2.70 } },
  { name : "SPC", fuel : { "92" : 2.84, "95" : 2.88, "98" : 3.37, "DIESEL" : 2.68 } },
  { name : "CALTEX", fuel : { "92" : 2.92, "95" : 2.97, "PREMIUM" : 3.64, "DIESEL" : 2.70 } },
  { name : "SINOPEC", fuel : { "95" : 2.93, "98" : 3.41, "PREMIUM" : 3.54, "DIESEL" : 2.69 } }
];

const MapContainer = ({username}) => {
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationNames, setLocationNames] = useState([]);
  const [selectedStation, setSelectedStation] = useState('');
  const [selectedFuelType, setSelectedFuelType] = useState('');
  const [isRoundTrip, setIsRoundTrip] = useState(true); 
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  const { isScriptLoaded, googleMaps } = useContext(ScriptLoadContext);

  const handleMapLoad = useCallback((map) => {

    if (!googleMaps || !isScriptLoaded) return; // Ensure the script is loaded and googleMaps object is available

    mapRef.current = map; // Store the map instance in mapRef
    const localDirectionsService = new googleMaps.maps.DirectionsService();
    const localDirectionsRenderer = new googleMaps.maps.DirectionsRenderer();
    localDirectionsRenderer.setMap(map);
    setDirectionsService(localDirectionsService);
    setDirectionsRenderer(localDirectionsRenderer);
  }, [googleMaps, isScriptLoaded]);

  // Handle change in petrol station selection
  const handleStationChange = (e) => {
    setSelectedStation(e.target.value);
    setSelectedFuelType(''); // Reset fuel type selection
  };

  // Handle change in fuel type selection
  const handleFuelTypeChange = (e) => {
    setSelectedFuelType(e.target.value);
  };

  // Get the fuel types for the selected station
  const fuelTypes = selectedStation ? petrol.find(station => station.name === selectedStation).fuel : {};

  const handlePlaceSelect = useCallback(() => {
    if (!isScriptLoaded || !googleMaps || !mapRef.current || !directionsService || !directionsRenderer || !selectedLocation) return;

    const newMarker = addMarker(selectedLocation.latLng, mapRef.current, googleMaps);
    setMarkers(prevMarkers => [...prevMarkers, newMarker]);
    setLocationNames(prevNames => [...prevNames, selectedLocation.name]);

    if (markers.length >= 1) {
      calculateAndDisplayRoute(directionsService, directionsRenderer, [...markers, newMarker], googleMaps, setTotalDistance);
    }
  }, [isScriptLoaded, googleMaps, markers, selectedLocation, directionsService, directionsRenderer]);

  const handleNumberOfDaysChange = (e) => {
    // Use Math.floor() to ensure the value is always an integer
    const intValue = Math.floor(parseFloat(e.target.value));
  
    // Check if the value is a number and greater than or equal to 1
    if (!isNaN(intValue) && intValue >= 1) {
      setNumberOfDays(intValue);
    }
    else setNumberOfDays(1)
  }

  const fetchEstimatedPrice = async () => {

    if (!selectedStation || !selectedFuelType){
      alert('Please fill in the petrol station and the fuel type');
      return;
    }
    const station = petrol.find(station => station.name === selectedStation);
    const fuelPrice = station ? station.fuel[selectedFuelType] : null;
    try {
      const response = await fetch('petrol/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username : username, // Assuming this is available in your component or context
          distanceTravelled: totalDistance,
          fuelPrice: parseFloat(fuelPrice), // Get the fuel price from selected station and fuel type
          twoWay: isRoundTrip,
          numOfDays: numberOfDays,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const price = await response.json(); // Assuming the API returns the price directly
      setEstimatedPrice(price); // Update state with the fetched price
    } catch (error) {
      console.error("Failed to fetch estimated price:", error);
    }
  };

  const handleSubmit = () => {
    fetchEstimatedPrice();
  };


  const handleReset = useCallback(() => {
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);
    setLocationNames([]);
    setSelectedStation('');
    setSelectedFuelType('');
    setIsRoundTrip(true);
    setNumberOfDays(1);
    setTotalDistance(0);
    setEstimatedPrice(0);
    setSelectedLocation(null);

    if (directionsRenderer) {
      directionsRenderer.setDirections({ routes: [] });
    }
  }, [markers, directionsRenderer]);
  
  return (
    <div className='mapContainer'>
      <div className='container-left'> 
        <div className='left-header'>
        Input Location: 
        <SearchBar onPlaceSelect={(name, latLng) => setSelectedLocation({ name, latLng }) } className ="searchBar override" />
        <button >
          <img
              src="/icons/add.png"
              alt="add"
              style={{ width: '55px', height: '50px' }}
              onClick={handlePlaceSelect}
            /></button>
        </div>
        <div style = {{position:'relative'}}>
          <div>
            <Map className='col1-map' onMapLoad={handleMapLoad}/>
          </div>
        </div>
      </div>
      <div className = 'container-right'>
      <div className='right-header'>Estimated Petrol Price: ${estimatedPrice}</div>
        <div className='right-header'>Total Distance per journey: {totalDistance.toFixed(2)} km</div>
        <div className='col2-location'>
          <ul>
          {locationNames.map((name, index) => (
            <li key={index}>{index + 1}. {name}</li>
          ))}
          </ul>
        </div>
        <label> Petrol Station: 
          <select value={selectedStation} onChange={handleStationChange}>
            <option value="">Select Petrol Station</option>
            {petrol.map((station, index) => (
              <option key={index} value={station.name}>{station.name}</option>
            ))}
        </select>
        </label>
        <label> Fuel Type: 
          <select value={selectedFuelType} onChange={handleFuelTypeChange} disabled={!selectedStation}>
            <option value="">Select Fuel Type</option>
              {Object.keys(fuelTypes).map((type, index) => (
                <option key={index} value={type}>{type} </option>
              ))}
          </select>
        </label>
        <label>
          {isRoundTrip ? 'Two-way' : 'One-way'}
          <input
            type="checkbox"
            checked={isRoundTrip}
            onChange={(e) => setIsRoundTrip(e.target.checked)}
          />
        </label>
        <label>
          Number of Days: 
          <input
            type="number"
            value={numberOfDays}
            onChange={handleNumberOfDaysChange}
            min="1"
            step="1"
          />
        </label>
        <div>
          {/* <button onClick={handleReset}> Cancel</button> */}
          <button onClick={handleReset}>RESET</button>
          <button onClick={handleSubmit}>ESTIMATED PRICE</button>
        </div>
      </div>
    </div>
  );
};

export default MapContainer;