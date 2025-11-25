require("dotenv").config();

const express = require("express");
const cors = require("cors");
const MemoryCache = require("./cache/MemoryCache");
const MealService = require("./services/MealService");
const createMealRoutes = require("./routes/mealRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

const cache = new MemoryCache(100, 3600000);

const mealService = new MealService(cache);


app.use("/api/meals", createMealRoutes(mealService));




app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorHandler);


app.listen(PORT, () => {
  console.log(
    "TheMealDB Explorer Backend running on http://localhost:${PORT}"
  );

});
