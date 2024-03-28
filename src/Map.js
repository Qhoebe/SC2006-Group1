"use client";
import { useState, useEffect } from "react";
import { Circle } from "./components/circle";
import{
    APIProvider,
    Map,
    useMapsLibrary,
} from "@vis.gl/react-google-maps"



export default function MapContainer(){
  const placesLibrary = useMapsLibrary("places");


//Parameter related
const [radius, setRadius] = useState(1000);




//const [origin, setOrigin] = useState("50 Nanyang Ave, 639798");
//NTU coord 
const [origin, setOrigin] = useState({lat:1.3477 , lng:103.6837});

//.....................................
return (
    <div style={{width:"100vw",height:"100vh"}}>
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
            onClick={() => setRadius(1000)} 
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
      
      


      
        </Map>
    </APIProvider>
    </div>
    );
}
