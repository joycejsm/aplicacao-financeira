const express = require("express");
const UserController = require("../controllers/UserController");

const router = express.Router();

// 🔹 Rota de login — ESSA é a que o front chama
router.post("/login", UserController.login);

// 🔹 Rotas de registro e gestão de usuários
router.post("/register", UserController.create);
router.get("/register", UserController.getAll);
router.get("/register/:id", UserController.getById);
router.put("/register/:id", UserController.update);
router.delete("/register/:id", UserController.delete);

module.exports = router;
