const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const UserModel = {
  // Criação de um novo usuário
  create: async (data) => {
    return prisma.user.create({ data });
  },

  // Busca todos os usuários
  findAll: async () => {
    return prisma.user.findMany();
  },

  // Busca um usuário pelo ID
  findById: async (id) => {
    return prisma.user.findUnique({ where: { id: parseInt(id) } });
  },

  // Atualiza um usuário pelo ID
  update: async (id, data) => {
    return prisma.user.update({ where: { id: parseInt(id) }, data });
  },

  // Exclui um usuário pelo ID
  delete: async (id) => {
    return prisma.user.delete({ where: { id: parseInt(id) } });
  },
};

module.exports = UserModel;
