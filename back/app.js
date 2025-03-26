const express = require("express");
const cors = require("cors");
const gastoRoutes = require("./src/routes/gastoRoutes");
const userRoutes = require("./src/routes/userRoutes")

const app = express();
app.use(cors());
app.use(express.json());

app.use("/gastos", gastoRoutes);
app.use("/api/users", userRoutes)

module.exports = app;
