import { Router } from "express";
import bodyParser from "body-parser";

const router = Router();
router.use(bodyParser.json());

export default router;

router.post("/add", async (req, res) => {
  try {
    const { addReview } = await import("../controller/reviewsController.mjs");
    const review = await addReview(req.body);

    res.send(review);
  } catch (e) {
    console.error("An error occurred:\n", e);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/", async (req, res) => {
  try {
    const { reviewsList } = await import("../controller/reviewsController.mjs");
    // Extract parameters from the request body
    const { username, category, startDate, endDate, descending, max } = req.body;

    console.log(username, category, startDate, endDate, descending, max);
    // Call reviewsList function with extracted parameters
    const reviews = await reviewsList(username, category, startDate, endDate, descending, max);

    res.send(reviews);
  } catch (e) {
    console.error("An error occurred:\n", e);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/edit", async (req, res) => {
  try {
    const { editReview } = await import("../controller/reviewsController.mjs");
    const review = await editReview(req.body.reviewID, req.body);

    res.send(review);
  } catch (e) {
    console.error("An error occurred:\n", e);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/", async (req, res) => {
  try {
    const { deleteReview } = await import("../controller/reviewsController.mjs");
    const success = await deleteReview(req.body.reviewID);
    if (success) res.sendStatus(202);
    else {
      throw new Error("Review not found");
    }
  } catch (e) {
    console.error("An error occurred:\n", e);
    res.status(500).send("Internal Server Error");
  }
});

