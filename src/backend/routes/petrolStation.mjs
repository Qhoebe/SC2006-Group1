// routes/petrolStations.mjs
import { Router } from "express";
import bodyParser from "body-parser";

const router = Router();
router.use(bodyParser.json());

export default router;

import { getPetrolStationsList, getPetrolStationDetails, getPetrolStationsFavoritedByUser } from "../controller/petrolStationController.mjs";

router.get("/", async (req, res) => {
  try {
    const petrolStationsList = await getPetrolStationsList();
    res.send(petrolStationsList);
  } catch (e) {
    console.error("An error occurred:\n", e);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:petrolStation", async (req, res) => {
  try {
    const petrol_station = req.params.petrol_station;
    const userID = req.query.userID; // Assuming the user ID is passed as a query parameter
    const petrolStationDetails = await getPetrolStationDetails(petrol_station, userID);
    res.send(petrolStationDetails);
  } catch (e) {
    console.error("An error occurred:\n", e);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/favorites/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const favoritedPetrolStations = await getPetrolStationsFavoritedByUser(userID);
    res.send(favoritedPetrolStations);
  } catch (e) {
    console.error("An error occurred:\n", e);
    res.status(500).send("Internal Server Error");
  }
});
