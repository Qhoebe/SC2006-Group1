import express from "express";
import { setupDB } from "./backend/database/database.mjs";

const app = express();
const PORT = process.env.PORT | 3000;

import userRoute from "./backend/routes/user.mjs";
import expensesRoute from "./backend/routes/expenses.mjs";

app.use("/user", userRoute);
app.use("/expenses", expensesRoute);

setupDB();
app.listen(PORT, () => {
  console.log("Serve running");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

console.log(new Date());
