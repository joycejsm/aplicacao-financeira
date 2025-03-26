const express = require("express");
const AmizadeController = require("../controllers/AmizadeController");
const authenticateToken = require("../middlewares/authenticateUser.js");

const router = express.Router();

router.get("/list", authenticateToken, AmizadeController.list);
router.post("/create", authenticateToken, AmizadeController.create);
router.delete("/delete/:id", authenticateToken, AmizadeController.delete);

module.exports = router;
