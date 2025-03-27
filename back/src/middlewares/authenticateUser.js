const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Não autorizado" });

  try {
    const token = authHeader.split(" ")[1]; // Substitua por validação JWT real
    const user = await prisma.user.findFirst({ where: { id: parseInt(token) } });
    if (!user) return res.status(401).json({ error: "Não autorizado" });

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: "Erro de autenticação" });
  }
};

module.exports = authenticateUser;
