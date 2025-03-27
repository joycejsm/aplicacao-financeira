const GastoModel = require("../models/Gasto");

const GastoController = {
  getAll: async (req, res) => {
    try {
      console.log("🔍 DEBUG req.user:", req.user); // Verifica se vem certo
  
      const gastos = await GastoModel.findAllByUserId(req.user.id);
      res.json(gastos);
    } catch (error) {
      console.error("ERRO AO BUSCAR GASTOS:", error); // Loga o erro real
      res.status(500).json({ error: "Erro ao buscar gastos", details: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const gasto = await GastoModel.findByIdAndUserId(req.params.id, req.user.id);
      if (!gasto) {
        return res.status(404).json({ error: "Gasto não encontrado" });
      }
      res.json(gasto);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar gasto" });
    }
  },
  create: async (req, res) => {
    try {
      const { descricao, valor, categoria, data } = req.body;
      const novoGasto = await GastoModel.create({
        descricao,
        valor: parseFloat(valor),
        categoria,
        data: data ? new Date(data) : new Date(),
        userId: req.user.id,
      });
      res.status(201).json(novoGasto);
    } catch (error) {
      res.status(500).json({ error: "Erro ao adicionar gasto" });
    }
  },
  delete: async (req, res) => {
    try {
      const gasto = await GastoModel.findByIdAndUserId(req.params.id, req.user.id);
      if (!gasto) {
        return res.status(404).json({ error: "Gasto não encontrado" });
      }
      await GastoModel.deleteById(req.params.id);
      res.json({ success: true, message: "Gasto excluído com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao excluir gasto" });
    }
  },
};

module.exports = GastoController;
