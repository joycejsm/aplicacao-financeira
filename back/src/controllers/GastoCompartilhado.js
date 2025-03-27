const GastoCompartilhadoModel = require("../models/GastoCompartilhado");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const GastoCompartilhadoController = {
  list: async (req, res) => {
    const userId = req.user?.id;
    try {
      const gastos = await GastoCompartilhadoModel.findAllByUserId(userId);
      res.json(gastos);
    } catch (error) {
      console.error("Erro ao listar gastos:", error);
      res.status(500).json({ error: "Erro ao buscar gastos compartilhados" });
    }
  },

  findById: async (req, res) => {
    const userId = req.user?.id;
    const { id } = req.params;

    try {
      const gasto = await GastoCompartilhadoModel.findById(userId, id);
      res.json(gasto);
    } catch (error) {
      console.error("Erro ao buscar gasto:", error);
      res.status(500).json({ error: "Erro ao buscar gasto compartilhado" });
    }
  },

  aceitar: async (req, res) => {
    const userId = req.user?.id;
    const { id } = req.params;

    try {
      const gasto = await GastoCompartilhadoModel.updateStatus(id, userId, "Aceito");
      res.json({ success: true, message: "Gasto aceito com sucesso", gasto });
    } catch (error) {
      console.error("Erro ao aceitar gasto:", error);
      res.status(500).json({ error: "Erro ao aceitar gasto compartilhado" });
    }
  },

  recusar: async (req, res) => {
    const userId = req.user?.id;
    const { id } = req.params;

    try {
      const gasto = await GastoCompartilhadoModel.updateStatus(id, userId, "Recusado");
      res.json({ success: true, message: "Gasto recusado com sucesso", gasto });
    } catch (error) {
      console.error("Erro ao recusar gasto:", error);
      res.status(500).json({ error: "Erro ao recusar gasto compartilhado" });
    }
  },

  create: async (req, res) => {
    const { descricao, valor, categoria, data } = req.body;
    const userId = req.user.id;

    if (!descricao || !valor || !categoria || !data) {
      return res.status(400).json({ error: "Campos obrigatórios faltando." });
    }

    try {
      // 1. Criar gasto principal
      const novoGasto = await prisma.gasto.create({
        data: {
          descricao,
          valor: parseFloat(valor),
          categoria,
          data: new Date(data),
          payerId: userId,
          userId: userId // garante vínculo
        }
      });

      // 2. Compartilhar com o próprio usuário (amizade simbólica)
      await prisma.gastoCompartilhado.create({
        data: {
          userId,
          gastoId: novoGasto.id,
          valor: parseFloat(valor), // campo obrigatório
          status: "Pendente"
        }
      });

      res.status(201).json({ message: "Gasto compartilhado com você mesmo!" });
    } catch (error) {
      console.error("Erro ao criar gasto compartilhado:", error);
      res.status(500).json({
        error: "Erro ao criar gasto compartilhado",
        details: error.message
      });
    }
  }
};

module.exports = GastoCompartilhadoController;
