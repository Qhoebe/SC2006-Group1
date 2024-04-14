import express from "express";
import { setupDB } from "./backend/database/database.mjs";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//const PORT = process.env.PORT | 3000;
const PORT = 3001;

import userRoute from "./backend/routes/user.mjs";
import expensesRoute from "./backend/routes/expenses.mjs";
import favouritesRoute from "./backend/routes/favourites.mjs";
import insightRoute from "./backend/routes/insights.mjs";
import distanceRoute from "./backend/routes/distance.mjs";
import petrolRoute from "./backend/routes/petrol.mjs";

app.use("/user", userRoute);
app.use("/expenses", expensesRoute);
app.use("/favourites", favouritesRoute);
app.use("/insights", insightRoute);
app.use("/distance", distanceRoute);
app.use("/petrol", petrolRoute);

import carparkRouter from "./backend/routes/carpark.js";
app.use("/carpark", carparkRouter);

import googleplacesRouter from "./backend/routes/googleplaces.js";
app.use("/facilities", googleplacesRouter);

import favouritesRouter from "./backend/routes/favourites.mjs";
app.use("/favourites", favouritesRouter);

setupDB();
app.listen(PORT, () => {
  console.log("Server running");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
