
import { Router } from "express";
const router = Router();

import haversineDistance from '../utils/haversineDistance';

router.get('/', (req, res) => {
    try {
      const lat = req.query.lat;
      const lng = req.query.lng;
      const facilityType = req.query.facilityType;
       const range = req.query.range; // Optional parameter

      //const response = await facilityLocator(lat, lng, facilityType, 0);
      //res.json(response); // Send the results as JSON
      facilityLocator(lat, lng, facilityType, range).then((response) => {
       
        res.json(response);
      })


    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "ERROR", error_message: "Internal server error" });
    }
  });
  

async function facilityLocator(lat, lng, facilityType,range) {
    try {
      // Construct the search URL
      const searchParams = new URLSearchParams({
        location: `${lat},${lng}`,
        key: "AIzaSyBQIjmVOaNYjue75PAQmy49Urzr0PnCtrw",
        query: facilityType,
      });
 
      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?${searchParams.toString()}`;

     //const url= `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${searchParams.toString()}`; does not work :(
  
      // Fetch data from the Google Maps API
      const response = await fetch(url)
    
      const data = await response.json();
      // Error handling
      if (data.status === "REQUEST_DENIED") {
        return { status: "REQUEST_DENIED", error_message: data.error_message };
      }
  
      // Process successful results
      if (data.status === "OK") {
        const results = data.results.map((result) => {
  
          const distance=haversineDistance({lat,lng},result.geometry.location);

          if(distance<=range){
          return {
            formatted_address: result.formatted_address,
            // lat: result.geometry.location.lat,
            // lng: result.geometry.location.lng,
            Location: result.geometry.location,
            Name: result.name,
            FacilityType: facilityType,
            Rating: result.rating,
            PlaceID: result.place_id,
          };
        }
        return null;
        }).filter(result => result !== null);

        if(!results) results=[];
        return { status: "OK", results };
      }
  
      // Catch any other errors
    } catch (error) {
      return { status: "REQUEST_DENIED", error_message: "Error" };
    }
  }
  

  
  // async function main() {
  //   const latlng = "1.347169 103.680133";
  
  //   //replace space with ,
  //   // const latlngArray = latlng.split(" ").join(",")
  
  //   const response = await facilityLocator(
  //     1.347169,
  //     103.680133,
  //     "Petrol Station",
  //   );
  
  //   for (const result of response.results) {
  //     console.log(result.name);
  //     console.log(result.formatted_address);
  //   }
  // }
  
  // main();
  


  export default router;