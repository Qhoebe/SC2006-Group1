import { Router } from "express";
import bodyParser from "body-parser";

const router = Router();
router.use(bodyParser.json());

router.put("/", async (req,res) =>{
    
})