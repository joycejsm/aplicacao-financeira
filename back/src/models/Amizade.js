const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const AmizadeModel = {
  findAllByUserId: async (userId) => {
    return prisma.amizade.findMany({
      where: {
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
      include: {
        user1: true,
        user2: true,
      },
    });
  },
  create: async (user1Id, user2Id) => {
    return prisma.amizade.create({
      data: { user1Id, user2Id },
    });
  },
  findById: async (id) => {
    return prisma.amizade.findUnique({ where: { id: parseInt(id) } });
  },
  deleteById: async (id) => {
    return prisma.amizade.delete({ where: { id: parseInt(id) } });
  },
};

module.exports = AmizadeModel;
