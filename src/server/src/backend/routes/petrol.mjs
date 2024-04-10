import { Router } from "express";
import bodyParser from "body-parser";
import {getPetrolPrice} from "../controller/petrolPriceController.mjs";

const router = Router();
router.use(bodyParser.json());

router.put("/", async (req, res) =>{
    try{
        const { username, distanceTravelled, fuelPrice, twoWay, numOfDays } = req.body;
        const price = await getPetrolPrice(username, distanceTravelled, fuelPrice, twoWay, numOfDays)
        res.send(price.toFixed(2))
    }catch(e){
        console.error("An error occurred:\n", e);
        res.status(500).send("Internal Server Error");
    }
})


export default router;
