import { Router } from "express";
import bodyParser from "body-parser";

const router = Router();
router.use(bodyParser.json());

export default router;

router.put("/", async (req, res) => {
  try {
    const { getUserDetail } = await import("../controller/userController.mjs");
    const userDetails = await getUserDetail(req.body.username);

    res.send(userDetails);
  } catch (e) {
    console.error("An error occurred:\n", e);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { login } = await import("../controller/userController.mjs");
    const success = await login(req.body.username, req.body.password);

    if (success === 1) res.status(201).json({message:"success", token: req.body.username});
    else res.status(406).json({message:success});
  } catch (e) {
    console.error("An error occurred:\n", e);
    res.status(500).json({message:"Internal Server Error"});
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { signup } = await import("../controller/userController.mjs");
    const success = await signup(req.body);

    if (success) res.status(201).json({message:"Sign up successful"});
    else res.json({message: "Username is already taken. Please choose another username"})//.status(406).send("Username is already taken. Please choose another username");
  } catch (e) {
    console.error("An error occurred:\n", e);
    res.status(500).json({message:"Internal Server Error"});
  }
});

router.put("/signup", async (req, res) => {
  try {
    const { getListOfModels } = await import(
      "../controller/carsController.mjs"
    );

    const listofModels = await getListOfModels(req.body.carMakeID);

    res.status(300).send({listofModels}); // we can use res.render('<file path>', object to be pass) //need to use ejs
  } catch (e) {
    console.error("An error occurred:\n", e);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/edit", async (req, res) => {
  try {
    const { editUserInfo } = await import("../controller/userController.mjs");
    const userDetails = await editUserInfo(req.body);

    res.send(userDetails);
  } catch (e) {
    console.error("An error occurred:\n", e);
    res.status(500).send("Internal Server Error");
  }
});
