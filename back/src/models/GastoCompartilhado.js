const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const GastoCompartilhadoModel = {
  findAllByUserId: async (userId) => {
    return prisma.gastoCompartilhado.findMany({
      where: { userId },
      include: {
        gasto: {
          include: {
            payer: true,
          },
        },
      },
    });
  },
  findById: async (userId, id) => {
    return prisma.gastoCompartilhado.findMany({
      where: { userId, id: parseInt(id) },
    });
  },
};

module.exports = GastoCompartilhadoModel;
