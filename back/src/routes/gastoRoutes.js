const express = require("express");
const GastoController = require("../controllers/GastoController");
const authenticateUser = require("../middlewares/authenticateUser");

const router = express.Router();

router.get("/", authenticateUser, GastoController.getAll);
router.get("/:id", authenticateUser, GastoController.getById);
router.post("/", authenticateUser, GastoController.create);
router.delete("/:id", authenticateUser, GastoController.delete);

module.exports = router;
