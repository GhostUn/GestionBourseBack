const jwt = require('jsonwebtoken');
const Session = require('../model/Session');

exports.authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Récupérer le token Bearer

  if (!token) {
    return res.status(401).json({ error: "Accès refusé : token manquant" });
  }

  try {
    // Vérifier la validité du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Vérifier si le token existe dans la table Sessions
    const session = await Session.findOne({
      where: { token, userId: decoded.userId },
    });

    if (!session || session.expiresAt < new Date()) {
      return res.status(403).json({ error: "Token invalide ou expiré" });
    }

    // Ajouter les informations de l'utilisateur à la requête
    req.user = { id: decoded.userId };
    next();
  } catch (err) {
    res.status(403).json({ error: "Token invalide" });
  }
};