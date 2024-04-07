//const express=require("express");
//const router=express.Router();
import { Router } from "express";
const router = Router();

import haversineDistance from '../utils/haversineDistance.js';

router.get("/:lat/:lng/:range",(req,res)=>{
  let lat=parseFloat(req.params.lat);
  let lng=parseFloat(req.params.lng);
  let range=parseFloat(req.params.range);

    //set invalid value to 1km
    if (isNaN(range)) range = 1;
    if(isNaN(lat)) lat=1.3477;
    if(isNaN(lng)) lng=103.6837;


    console.log(range+"KM "+`${lat},${lng}`);
    getCarparkDataWithin(lat,lng,range)
    .then(carparkData => {
        //send data back to client
        res.json(carparkData);
    })
    .catch(error => {
        console.error("Error fetching carpark data:", error);
        res.status(500).json({ error: "Internal server error" });
    });

})


function getCarparkDataWithin(lat,lng,range)
{
  return fetch("http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2", {
    method: "GET",
    headers: {
      "AccountKey": "kOpaExgdQci4MFe1S0a8Iw=="
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(data => {
    // Handle the data returned from the API
    const values = data.value;

    const carparkArray = [];
    const carparkinRange=[];
    
    // Store the 'value' array into an array of objects
    values.forEach(item => {
        const coords = item.Location.split(' ');
        const lat = parseFloat(coords[0]);
        const lng = parseFloat(coords[1]);
        const facility="CARPARK";
      carparkArray.push({
            CarParkID: item.CarParkID,
            Area: item.Area,
            Name: item.Development,
            Location: {lat,lng},
            AvailableLots: item.AvailableLots,
            LotType: item.LotType,
            Agency: item.Agency,
            FacilityType: 'CARPARK',
        });
      });  

      //Filter by range
       carparkArray.forEach(item => {
                               
            if(haversineDistance({lat, lng}, item.Location) <= range)
            {
                carparkinRange.push(item);
            }

         });

         return carparkinRange;
  })
  .catch(error => {
    // Handle errors
    console.error("There was a problem with the fetch operation:", error);
  });
  
}


export default router