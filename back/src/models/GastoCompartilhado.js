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
            beneficiario: true
          }
        }
      }
    });
  },

  findById: async (userId, id) => {
    return prisma.gastoCompartilhado.findMany({
      where: { userId, id: parseInt(id) },
      include: {
        gasto: {
          include: {
            payer: true,
            beneficiario: true
          }
        }
      }
    });
  },

  updateStatus: async (id, userId, status) => {
    return prisma.gastoCompartilhado.updateMany({
      where: {
        id,
        userId
      },
      data: { status }
    });
  },

  verificarPermissao: async (userId, gastoCompartilhadoId) => {
    return prisma.gastoCompartilhado.findFirst({
      where: {
        id: gastoCompartilhadoId,
        userId: userId
      }
    });
  }
};

module.exports = GastoCompartilhadoModel;
