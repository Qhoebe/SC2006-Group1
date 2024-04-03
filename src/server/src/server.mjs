import express from "express";
import { setupDB } from "./backend/database/database.mjs";

const app = express();
app.use(express.urlencoded({extended:true}));
//const PORT = process.env.PORT | 3000;
const PORT= 5000;

import userRoute from "./backend/routes/user.mjs";
import expensesRoute from "./backend/routes/expenses.mjs";

app.use("/user", userRoute);
app.use("/expenses", expensesRoute);



import carparkRouter from "./backend/routes/carpark.js";
app.use('/carpark', carparkRouter);

import googleplacesRouter from "./backend/routes/googleplaces.js";
app.use('/facilities', googleplacesRouter);



setupDB();
app.listen(PORT, () => {
  console.log("Server running");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

console.log(new Date());
