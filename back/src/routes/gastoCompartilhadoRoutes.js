const express = require("express");
const router = express.Router();
const GastoCompartilhadoController = require("../controllers/GastoCompartilhado"); 
const authenticateToken = require("../middlewares/authenticateUser");

// Rotas corretas
router.get("/compartilhados_comigo", authenticateToken, GastoCompartilhadoController.list);
router.get("/compartilhados_comigo/:id", authenticateToken, GastoCompartilhadoController.findById);
router.put("/compartilhados_comigo/:id/aceitar", authenticateToken, GastoCompartilhadoController.aceitar);
router.put("/compartilhados_comigo/:id/recusar", authenticateToken, GastoCompartilhadoController.recusar);

// Criação do gasto compartilhado
router.post("/", authenticateToken, GastoCompartilhadoController.create);

module.exports = router;
