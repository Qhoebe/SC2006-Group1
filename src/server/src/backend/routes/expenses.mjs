import { Router } from "express";
import bodyParser from "body-parser";

const router = Router();
router.use(bodyParser.json());

export default router;

router.post("/add", async (req, res) => {
  try {
    const { addExpenses } = await import(
      "../controller/expensesController.mjs"
    );
    const expense = await addExpenses(req.body);

    res.send(expense);
  } catch (e) {
    console.error("An error occurred:\n", e);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/", async (req, res) => {
  try {
    const { getExpensesList } = await import(
      "../controller/expensesController.mjs"
    );
    // Extract parameters from the request body
    const { username, category, startDate, endDate, descending, max } =
      req.body;

    console.log(username, category, startDate, endDate, descending, max);
    // Call getExpensesList function with extracted parameters
    const expense = await getExpensesList(
      username,
      category,
      startDate,
      endDate,
      descending,
      max
    );

    res.send(expense);
  } catch (e) {
    console.error("An error occurred:\n", e);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/edit", async (req, res) => {
  try {
    const { editExpenses } = await import(
      "../controller/expensesController.mjs"
    );
    const expense = await editExpenses(req.body._id, req.body);
    console.log('editting expenses')
    res.send(expense);
  } catch (e) {
    console.error("An error occurred:\n", e);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/", async (req, res) => {
  try {
    const { deleteExpense } = await import(
      "../controller/expensesController.mjs"
    );
    const success = await deleteExpense(req.body._id);
    if (success) res.sendStatus(202);
    else {
      throw new Error("Expense not found");
    }
  } catch (e) {
    console.error("An error occurred:\n", e);
    res.status(500).send("Internal Server Error");
  }
});
