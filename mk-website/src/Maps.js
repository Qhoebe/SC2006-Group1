import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  MarkerClusterer,
  DirectionsService,
} from "@react-google-maps/api";
import Places from "./places";
import CarparkInfo from "./CarparkInfo";
import RouteButton from "./routeButton";

function Maps({ isLoaded }) {
  const [office, setOffice] = useState();
  const [directions, setDirections] = useState();
  const [center, setCenter] = useState({ lat: 1.3521, lng: 103.8198 });
  const [currPos, setcurrPos] = useState(null);
  const mapRef = useRef();
  const directionsServiceRef = useRef();
  const [selectedCarpark, setSelectedCarpark] = useState(null);

  const onLoad = useCallback((map) => (mapRef.current = map), []);
  // The map instance has been loaded

  const onUnmount = useCallback(function callback(map) {
    // The map instance has been unmounted
  }, []);

  const carparks = useMemo(() => generateCarparksInSingapore(center), [center]);
  //console.log("carpark:", carparks, carparks.length, "center:", center);

  useEffect(() => {
    if (isLoaded && !directionsServiceRef.current) {
      directionsServiceRef.current = new window.google.maps.DirectionsService();
    }
  }, [isLoaded]);
  const fetchDirections = (carpark) => {
    const request = {
      origin: currPos,
      destination: carpark,
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    directionsServiceRef.current.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK && result) {
        setDirections(result);
      }
    });
  };

  const options = useMemo(
    () => ({
      mapId: "5133af955dc4d639",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  ); // Memoize the options

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(pos);
          setcurrPos(pos); // Set marker at the current position
        },
        () => {
          // Handle location error
          console.error("Error retrieving your location");
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  //console.log(center, marker);

  return (
    <div className="container">
      <div className="controls">
        <Places
          setOffice={(position) => {
            setOffice(position);
            mapRef.current?.panTo(position);
          }}
        />
        <CarparkInfo carpark={selectedCarpark} />
        <RouteButton origin={currPos} destination={selectedCarpark} />
      </div>
      <div className="map">
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={options}
        >
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  strokeColor: "#ffae42", // Example color: Red
                  strokeOpacity: 1,
                  strokeWeight: 5,
                },
              }}
            />
          )}
          {currPos && (
            <Marker
              position={currPos}
              icon="http://maps.gstatic.com/mapfiles/ms2/micons/man.png"
            />
          )}
          {office && <Marker position={office} />}
          {/* Render the office marker
           */}

          <MarkerClusterer>
            {(clusterer) =>
              carparks.map((carpark) => (
                <Marker
                  key={carpark.lat}
                  position={carpark}
                  clusterer={clusterer}
                  onClick={() => {
                    fetchDirections(carpark);
                    setSelectedCarpark(carpark);
                  }}
                />
              ))
            }
          </MarkerClusterer>
        </GoogleMap>
      </div>
    </div>
  );
}

export default React.memo(Maps);

const singaporeBounds = {
  northWest: { lat: 1.1304753, lng: 103.6920359 },
  southEast: { lat: 1.4504753, lng: 104.0120359 },
};

const generateCarparksInSingapore = () => {
  const carparks = [];
  for (let i = 0; i < 1000; i++) {
    const lat =
      singaporeBounds.northWest.lat +
      Math.random() *
        (singaporeBounds.southEast.lat - singaporeBounds.northWest.lat);
    const lng =
      singaporeBounds.northWest.lng +
      Math.random() *
        (singaporeBounds.southEast.lng - singaporeBounds.northWest.lng);

    carparks.push({ lat, lng });
  }
  return carparks;
};
