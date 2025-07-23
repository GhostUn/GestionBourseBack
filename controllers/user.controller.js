const User = require('../model/user.model');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
console.log('req.body.password', req.body.password)
  try {
     const {password} = req.body;
    // Hash the password and insert into MySQL
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword
    const user = await User.UserCreate(req.body);
    console.log('user', user)
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  const users = await User.findAll();
  console.log('users', users)
  res.json(users);
};

exports.getUserById = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).send('User not found');
  res.json(user);
};

exports.updateUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).send('User not found');
  await user.update(req.body);
  res.json(user);
};

exports.deleteUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).send('User not found');
  await user.destroy();
  res.sendStatus(204);
};
