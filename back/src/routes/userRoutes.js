const express = require("express");
const UserController = require("../controllers/UserController");

const router = express.Router();

router.post("/", UserController.create);        // Criar novo usuário
router.get("/", UserController.getAll);         // Buscar todos os usuários
router.get("/:id", UserController.getById);     // Buscar usuário por ID
router.put("/:id", UserController.update);      // Atualizar usuário por ID
router.delete("/:id", UserController.delete);   // Excluir usuário por ID

module.exports = router;
