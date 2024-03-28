// routes/carparks.mjs
import { Router } from "express";
import bodyParser from "body-parser";

const router = Router();
router.use(bodyParser.json());

export default router;

import { getCarparksList, getCarparkDetails } from "../controller/carparksController.mjs";

router.get("/", async (req, res) => {
  try {
    const carparksList = await getCarparksList();
    res.send(carparksList);
  } catch (e) {
    console.error("An error occurred:\n", e);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:carparkID", async (req, res) => {
  try {
    const carparkID = req.params.carparkID;
    const carparkDetails = await getCarparkDetails(carparkID);
    res.send(carparkDetails);
  } catch (e) {
    console.error("An error occurred:\n", e);
    res.status(500).send("Internal Server Error");
  }
});
