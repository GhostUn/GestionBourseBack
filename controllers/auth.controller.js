const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/user.model');
const Session = require('../model/Session');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log('email', email)
  const user = await User.userFind(email);
  if (!user) return res.status(401).json({ message: "Email invalide" });
  console.log('user.password', user.password)
  console.log('user', user)

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Mot de passe incorrect" });

  const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.json({ token, user });
};