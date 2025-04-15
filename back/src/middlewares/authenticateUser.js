const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 🔐 Verifica se o cabeçalho existe e começa com "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Não autorizado: token ausente ou malformado" });
  }

  try {
    const token = authHeader.split(" ")[1];

    // 🧠 Simula um token simples baseado no ID (modo DEV)
    const userId = parseInt(token);
    if (isNaN(userId)) {
      return res.status(401).json({ error: "Token inválido" });
    }

    // 🔍 Busca o usuário pelo ID (que está vindo como token por enquanto)
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    // ✅ Injeta o usuário na requisição
    req.user = user;
    next();
  } catch (error) {
    console.error("Erro no middleware de autenticação:", error); // 👈 Ajuda a identificar erros no terminal
    res.status(500).json({ error: "Erro de autenticação", details: error.message });
  }
};

module.exports = authenticateUser;
