// routes/evChargers.mjs
import { Router } from "express";
import bodyParser from "body-parser";

const router = Router();
router.use(bodyParser.json());

export default router;

import {
    getEVChargersList,
    getEVChargerDetails,
    getEVChargersFavoritedByUser
} from "../controller/evChargerController.mjs";

router.get("/", async (req, res) => {
    try {
        const evChargersList = await getEVChargersList();
        res.send(evChargersList);
    } catch (e) {
        console.error("An error occurred:\n", e);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/:evChargerName", async (req, res) => {
    try {
        const evChargerName = req.params.evChargerName;
        const userID = req.params.userID;
        const evChargerDetails = await getEVChargerDetails(evChargerName,userID);
        res.send(evChargerDetails);
    } catch (e) {
        console.error("An error occurred:\n", e);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/favorites/:userID", async (req, res) => {
    try {
        const userID = req.params.userID;
        const favoritedEVChargers = await getEVChargersFavoritedByUser(userID);
        res.send(favoritedEVChargers);
    } catch (e) {
        console.error("An error occurred:\n", e);
        res.status(500).send("Internal Server Error");
    }
});
