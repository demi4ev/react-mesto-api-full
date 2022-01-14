const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError'); // 401

const { JWT_SECRET = 'some-secret-key' } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AuthError('Пожалуйста, авторизуйтесь');
  }
  req.user = payload;
  next();
};
