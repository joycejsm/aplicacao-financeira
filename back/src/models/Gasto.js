const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const GastoModel = {
  findAllByUserId: async (userId) => {
    return prisma.gasto.findMany({ where: { userId } });
  },
  findByIdAndUserId: async (id, userId) => {
    return prisma.gasto.findFirst({ where: { id, userId } });
  },
  create: async (data) => {
    return prisma.gasto.create({ data });
  },
  deleteById: async (id) => {
    return prisma.gasto.delete({ where: { id } });
  },
};

module.exports = GastoModel;
