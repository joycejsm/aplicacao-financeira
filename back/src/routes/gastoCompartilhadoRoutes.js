const express = require("express");
const GastoCompartilhadoController = require("../controllers/GastoCompartilhado");
const authenticateToken = require("../middlewares/authenticateUser");

const router = express.Router();

router.get("/compartilhados_comigo", authenticateToken, GastoCompartilhadoController.list);
router.get("/compartilhados_comigo/:id", authenticateToken, GastoCompartilhadoController.findById);
router.put('/compartilhados_comigo/:id/aceitar', authenticateToken, GastoCompartilhadoController.aceitar);
router.put('/compartilhados_comigo/:id/recusar', authenticateToken, GastoCompartilhadoController.recusar);

module.exports = router;
