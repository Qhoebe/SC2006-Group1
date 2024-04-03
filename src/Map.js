"use client";
import { useState, useEffect } from "react";
import { Circle } from "./components/circle";
import { facilityLocator,test } from "./utils/googlePlaces";
import Markers from "./Markers";
import{
    APIProvider,
    Map,
    AdvancedMarker,
    useAdvancedMarkerRef,
    Pin,
    InfoWindow,
    useMap,
    useMapsLibrary,
    GoogleMapsContext,
} from "@vis.gl/react-google-maps"

import RouteButton from "./routeButton";

export default function MapContainer(){
  const placesLibrary = useMapsLibrary("places");

    //NTU coordinates
const [position, setPosition] = useState({lat:1.3477 , lng:103.6837});

//Parameter related
const [radius, setRadius] = useState(1000);
const [selectedFacility, setSelectedFacility] = useState("CARPARK");

//get data from server and store here
const [carparkData, setCarparkData] = useState([]);
const [facilityData, setFacilityData] = useState([]);

//marker related
const [destination, setDestination] = useState(null);
//const [origin, setOrigin] = useState("50 Nanyang Ave, 639798");
const [origin, setOrigin] = useState({lat:1.3477 , lng:103.6837});
const handleButtonClick = (newDestination) => {
  setDestination(newDestination);
  
};
const resetRadius = () => {
  setRadius(0);
};

//.....................................

//useEffect to fetch data either from server or google api
useEffect(() => {

  
  //if no radius, no need to fetch
  if(radius===0){
      setFacilityData([]);
      return;}
  console.log(origin);


const controller= new AbortController();
if(selectedFacility.toUpperCase()==="CARPARK"){
//  setFacilityData([]);
        
        fetch("carpark/" + origin.lat + "/" + origin.lng + "/" + radius/1000)
        .then((response) => response.json())
        .then((data) => setFacilityData(data))/*.then (() => console.log(facilityData))*/
        .catch((error) => console.error(error));
    }
    else {
     // setCarparkData([]);
      const searchParams = new URLSearchParams({
        lat: origin.lat,
        lng: origin.lng,
        range: radius/1000,
        facilityType: selectedFacility,
      });
      
        fetch("facilities/?" + searchParams.toString() )
        .then((response) => response.json())
        .then((data) => setFacilityData(data.results))/*.then (() => console.log(JSON.stringify(facilityData,null,2)))*/
        .catch((error) => console.error(error));

        // console.log(JSON.stringify(facilityData,null,2))  
        return () => {controller.abort(); console.log("aborted");}
    }


   
}, [origin,radius,selectedFacility]);


//get user current location
const getLocation = (position) => {

  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  setOrigin({lat:latitude,lng:longitude})
}
function error() {
  console.log("Unable to retrieve your location");
}

return (
    <div style={{position: "fixed", bottom: 0, height: "93vh", width: "100vw" }} >
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <Map defaultZoom={12} 
        defaultCenter={origin} 
        mapId={process.env.REACT_APP_GOOGLE_MAP_ID}
        fullscreenControl={false}
        mapTypeControl= {false}
        streetViewControl={false}
        >
         
            <div className="overlayContainer">
              <div>
            <button className="overlayButton"
            onClick={() => setRadius(1000)}//change circle range + fetch data
            >1KM</button>
            <button className="overlayButton"
            onClick={() => setRadius(3000)}
            >3KM</button>
             <button className="overlayButton"
            onClick={() => setRadius(5000)}
            >5KM</button>
             <button className="overlayButton"
            onClick={() => setRadius(7000)}
            >7KM</button>
            </div>

            <div>
            <button className="overlayButton"
            onClick={() => setSelectedFacility("CARPARK")}
            >Carpark</button>
            <button className="overlayButton"
            onClick={() => setSelectedFacility("CAR WORKSHOP")}
            >WorkShop</button>
             <button className="overlayButton"
            onClick={() => setSelectedFacility("FUEL STATION")}
            >Fuel Station</button>
            </div>

            <div >
            <button className="overlayButton"
            onClick={() => {
            navigator.geolocation.getCurrentPosition(getLocation,error)}}
            >GPS</button>

<button className="overlayButton"
            onClick={() => setOrigin({lat:1.3691,lng:103.8454})}
            >AMK </button>
            </div>

            </div>

            <Circle
          radius={radius}
          center={origin}
          onRadiusChanged={setRadius}
          
          strokeColor={'#0c4cb3'}
          strokeOpacity={1}
          strokeWeight={2}
          fillColor={'#3b82f6'}
          fillOpacity={0.3}
          editable ={false}
          draggable ={false}
          
        />
      
      


        {/* <Markers locationData={carparkData} onClick={handleButtonClick}></Markers> */}
        <Markers origin={origin} locationData={facilityData} FacilityType={selectedFacility} onClick={handleButtonClick} resetRadius={resetRadius}></Markers>
        {/* <div>
        {carparkData.map((point) => (

        <AdvancedMarker position={point.Location}
        title={point.Development}
        key={point.CarParkID}
        onClick={() => selectCarpark(point.CarParkID)}
        >
            <Pin  ></Pin>
            {(point.CarParkID===selectedCarParkID)&&(
          <InfoWindow position={point.Location} onCloseClick={closeInfoWindow}>
           <h3>{point.Development}</h3>
           <p>Available Lots: {point.AvailableLots}</p>
           <button onClick={() => console.log("PRESSED")}>Close</button>
          </InfoWindow>
        )}
        </AdvancedMarker>
        ))}
        

        </div> */} 
        <Direction origin={origin} destination={destination} setDestination={setDestination} />
            {/* <Direction/> */}
        </Map>
    </APIProvider>
    </div>
    );
}

function Direction({ origin, destination, setDestination }) {
    const map=useMap();
    const routesLibrary = useMapsLibrary("routes");
    const [directionsService, setDirectionsService] = useState();
    const [directionsRenderer, setDirectionsRenderer] = useState();
    const [routes, setRoutes] = useState([]);
    const [routeIndex, setRouteIndex] = useState(0);
    const selected = routes[routeIndex];
    const leg=selected?.legs[0];
    

     useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({map}));
  }, [routesLibrary, map]);

    useEffect(()=>{
        if(!directionsService || !directionsRenderer) return;
      map.panTo(origin);
        if(origin && destination){
        directionsService.route({ 
            origin: origin,
            destination: destination,
            travelMode: window.google.maps.TravelMode.DRIVING,
            provideRouteAlternatives: true,})
            .then((response)=>{
            directionsRenderer.setDirections(response);
            setRoutes(response.routes);
        }) ;
      }else
      {
        directionsRenderer.setDirections({ routes: [] });
      setRoutes([]);
      }
  
    }, [directionsService, directionsRenderer,origin, destination]);

    //change route when click on alt route
    useEffect(()=>{
        if(!directionsRenderer) return;
        directionsRenderer.setRouteIndex(routeIndex);
    },[routeIndex,directionsRenderer])

    if(!leg) return null;


    return (
        <div className="directions">
          
          <h2>{selected.summary}</h2>
          <p>
            {leg.start_address.split(',')[0]} to {leg.end_address.split(',')[0]}
          </p>
          <p>Distance: {leg.distance?.text}</p>
          <p>Duration: {leg.duration?.text}</p>
    
          <h2>Other Routes</h2>
          <ul>
            {routes.map((route, index) => (
              <li key={route.summary}>
                <button onClick={() => setRouteIndex(index)}
                //diffrent styling for currently selected route
                className={index === routeIndex ? "buttonSelected" : "button"}
                >
                  {route.summary}
                </button>
              </li>
            ))}
          </ul>
          <RouteButton origin={origin} destination={destination} />

            <br></br>
            <button style={{ position: 'absolute', bottom: '10px', right: '5px',maxHeight: '20px',borderRadius: '5px' }
            } onClick={() => setDestination(null)}>Cancel</button>
        </div>
      );
}
