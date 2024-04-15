import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faMotorcycle,
  faTruck,
  faScrewdriverWrench,
  faGasPump,
  faBookmark,
  faStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  GoogleMapsContext,
  AdvancedMarker,
  Pin,
  InfoWindow,
  Marker,
} from "@vis.gl/react-google-maps";
import RouteButton from "./routeButton";

const lowLotsThreshold = 10;
const midLotsThreshold = 50;
function Markers(props) {
  const { origin, locationData, FacilityType, onClick, resetRadius } = props;

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isFavourited, setIsFavourited] = useState(false);

  const selectPlace = (place) => {
    setSelectedPlace(place);
  };

  const closeInfoWindow = () => {
    setSelectedPlace(null);
  };

  const selectDestination = (newDestination) => {
    setSelectedPlace(null);
    onClick(newDestination);
  };

  useEffect(() => {
    const fetchIsFavouritedStatus = async (user) => {
      if (!selectedPlace) return;
      try {
        var placeID;
        if (FacilityType === "CARPARK") {
          placeID = selectedPlace.CarParkID;
        } else {
          placeID = selectedPlace.PlaceID;
        }
        // Make a request to your backend to check if the place is favourited
        const response = await fetch(`/favourites/isFavourited`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: user, //REPLACE!!!
            placeID: placeID, // Assuming your backend needs the placeID to check if it's favourited
          }),
        });
        if (response.ok) {
          const data = await response.json();
          setIsFavourited(data.success);
        } else {
          throw new Error("Failed to fetch isFavourited status");
        }
      } catch (error) {
        console.error("Error fetching isFavourited status:", error);
      }
    };

    // Call the function inside the useEffect callback
    if (window.sessionStorage.getItem("username")) {
      fetchIsFavouritedStatus(window.sessionStorage.getItem("username"));
    }
  }, [selectedPlace]);

  const toggleFavourite = async () => {
    if (!selectedPlace) return;
    if (window.sessionStorage.getItem("username") === null) {
      window.alert("Please login to use bookmark feature");
      return;
    }
    const user = window.sessionStorage.getItem("username");

    try {
      var placeID;
      if (FacilityType === "CARPARK") {
        placeID = selectedPlace.CarParkID;
      } else {
        placeID = selectedPlace.PlaceID;
      }
      const endpoint = isFavourited ? "delete" : "add"; // Determine the endpoint based on the isFavourited status
      const response = await fetch(`/favourites/${endpoint}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: user, // REPLACE!!!!
          placeID: placeID,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setIsFavourited(!isFavourited); // Toggle the isFavourited status
      } else {
        throw new Error(`Failed to ${endpoint} favourite`);
      }
    } catch (error) {
      console.error(
        `Error ${isFavourited ? "deleting" : "adding"} favourite:`,
        error
      );
    }
  };

  if (!locationData) return;

  return (
    <div>
      {locationData.map((point, index) => (
        // <AdvancedMarker position={point.Location}
        // title={point.Name}
        // key={index}
        // onClick={() => selectPlace(point)}

        // >
        //   <Pin ></Pin>
        //     </AdvancedMarker>

        <Marker
          position={point.Location}
          title={point.Name}
          key={index}
          onClick={() => selectPlace(point)}
          icon={{
            url: getIconURL(point),
            scaledSize: new window.google.maps.Size(30, 30),
            anchor: new window.google.maps.Point(15, 15),
          }}
        ></Marker>
      ))}

      {selectedPlace && selectedPlace.FacilityType === FacilityType && (
        <InfoWindow
          position={selectedPlace.Location}
          onCloseClick={closeInfoWindow}
        >
          <InfoWindowContent selectedPlace={selectedPlace} />

          <div className="flex flex-row items-center justify-between">
            <button
              onClick={() => {
                const newDestination = selectedPlace.Location;
                resetRadius();
                selectDestination(newDestination);
              }}
              className="bg-gray-200 rounded px-2"
            >
              Go
            </button>

            <button onClick={toggleFavourite}>
              <FontAwesomeIcon
                icon={faBookmark}
                color={isFavourited ? "#FFC000" : "lightgray"}
                size="lg"
              />
            </button>
          </div>
        </InfoWindow>
      )}
    </div>
  );
}

function getIconURL(locationData) {
  //if(locationData.CarParkID) return "/icons/carPin.svg";
  if (locationData.AvailableLots <= lowLotsThreshold)
    return "/icons/carRedPin.svg";
  if (locationData.AvailableLots <= midLotsThreshold)
    return "/icons/carOrangePin.svg";
  if (locationData.AvailableLots > midLotsThreshold)
    return "/icons/carGreenPin.svg";
  if (locationData.Name.toLowerCase().includes("shell"))
    return "/icons/shellPin.svg";
  if (locationData.Name.toLowerCase().includes("esso"))
    return "/icons/essoPin.svg";
  if (locationData.Name.toLowerCase().includes("spc"))
    return "/icons/spcPin.svg";
  if (locationData.Name.toLowerCase().includes("caltex"))
    return "/icons/caltexPin.svg";

  return "/icons/repairPin.svg";
}

const StarRating = ({ rating, color }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStar} color={color} size="sm" />
      );
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStarHalfAlt} color={color} size="sm" />
      );
    } else {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStar} color="lightgray" size="sm" />
      );
    }
  }

  return <div>{stars}</div>;
};

function InfoWindowContent({ selectedPlace }) {
  //change icon colour depending on available lots
  let colour = "black";

  if (selectedPlace.AvailableLots < lowLotsThreshold) colour = "red";
  else if (selectedPlace.AvailableLots < midLotsThreshold) colour = "orange";
  else colour = "#0BDA51"; //green colour

  return (
    <div className="items-center justify-between flex flex-row ">
      {/*Change Icon depending on lot type*/}
      <div className="px-2">
        {selectedPlace.LotType === "C" ? (
          <FontAwesomeIcon icon={faCar} color={colour} size="xl" />
        ) : selectedPlace.LotType === "Y" ? (
          <FontAwesomeIcon icon={faMotorcycle} color={colour} size="xl" />
        ) : selectedPlace.LotType === "H" ? (
          <FontAwesomeIcon icon={faTruck} color={colour} size="xl" />
        ) : selectedPlace.FacilityType === "FUEL STATION" ? (
          <FontAwesomeIcon icon={faGasPump} color="black" size="xl" />
        ) : selectedPlace.FacilityType === "CAR WORKSHOP" ? (
          <FontAwesomeIcon icon={faScrewdriverWrench} color="black" size="xl" />
        ) : null}
      </div>

      <div className="flex flex-col py-2">
        <strong>{selectedPlace.Name}</strong>
        {/* If carpark then print available lots content*/}
        {selectedPlace.CarParkID && (
          <h1>Available Lots: {selectedPlace.AvailableLots}</h1>
        )}
        {selectedPlace.Rating && (
          <h1>
            Ratings:({selectedPlace.Rating})
            <StarRating rating={selectedPlace.Rating} color={"#FFC000"} />
          </h1>
        )}
      </div>
    </div>
  );
}
export default Markers;
