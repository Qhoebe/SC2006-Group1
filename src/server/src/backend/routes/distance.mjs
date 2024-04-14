import { Router } from "express";
import bodyParser from "body-parser";

const router = Router();
router.use(bodyParser.json());

export default router;

router.post("/add", async (req, res) => {
  try {
    const { addDistance } = await import(
      "../controller/distanceController.mjs"
    );
    const expense = await addDistance(req.body);

    res.send(expense);
  } catch (e) {
    console.error("An error occurred:\n", e);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/", async (req, res) => {
  try {
    const { getDistanceList } = await import(
      "../controller/distanceController.mjs"
    );
    // Extract parameters from the request body
    const { username, startDate, endDate, descending, max } =
      req.body;

    // Call getExpensesList function with extracted parameters
    const distance = await getDistanceList(
      username,
      startDate,
      endDate,
      descending,
      max
    );

    res.send(distance);
  } catch (e) {
    console.error("An error occurred:\n", e);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/edit", async (req, res) => {
  try {
    const { editDistance } = await import(
      "../controller/distanceController.mjs"
    );
    const expense = await editDistance(req.body._id, req.body);

    res.send(expense);
  } catch (e) {
    console.error("An error occurred:\n", e);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/", async (req, res) => {
  try {
    const { deleteDistance } = await import(
      "../controller/distanceController.mjs"
    );
    const success = await deleteDistance(req.body._id);
    if (success) res.sendStatus(202);
    else {
      throw new Error("Distance not found");
    }
  } catch (e) {
    console.error("An error occurred:\n", e);
    res.status(500).send("Internal Server Error");
  }
});
