import { Router } from "express";
import bodyParser from "body-parser";
import { sumDistanceForDateRange, sumExpensesForDateRange, sumFuelPumpForDateRange, getExpenseForPastYear} from "../controller/insightController.mjs";

const router = Router();
router.use(bodyParser.json());

router.put("/", async (req, res) => {
  try {
    // Extract parameters from the request body
    const { username, startDate, endDate } = req.body;

    const distance = await sumDistanceForDateRange(username, startDate, endDate);
    const expenses = await sumExpensesForDateRange(username, startDate, endDate);
    const fuel = await sumFuelPumpForDateRange(username, startDate, endDate);

    let fuelexpense
    let repairExpense
    let accessoriesExpense

    expenses.forEach(ex => {
      if (ex._id === 0) fuelexpense = ex.totalSpend
      if (ex._id === 1) repairExpense = ex.totalSpend
      if (ex._id === 2) accessoriesExpense = ex.totalSpend
    });

    const insight = [distance, fuel, fuelexpense, repairExpense, accessoriesExpense];

    res.send(insight);
  } catch (e) {
    console.error("An error occurred:\n", e);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/graph", async (req, res) => {
  try {
    // Extract parameters from the request body
    const { username } = req.body;

    const result = await getExpenseForPastYear(username) 

    res.send(result);
  } catch (e) {
    console.error("An error occurred:\n", e);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
