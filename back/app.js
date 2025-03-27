const express = require("express");
const cors = require("cors");
const gastoRoutes = require("./src/routes/gastoRoutes");
const userRoutes = require("./src/routes/userRoutes")
const amizadeRoutes = require("./src/routes/amizadeRoutes")
const gastoCompartilhadoRoutes = require("./src/routes/gastoCompartilhadoRoutes")

const app = express();
app.use(cors());
app.use(express.json());

app.use("/gastos", gastoRoutes);
app.use("/api/users", userRoutes)
app.use("/amizades", amizadeRoutes)
app.use("/gastos-compartilhados", gastoCompartilhadoRoutes);


module.exports = app;
