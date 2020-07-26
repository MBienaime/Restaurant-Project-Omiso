const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.autorization.split(' ')[1];
    const decoded = jwt.verify(token, 'token');
    req.userdatatoken = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'auth failed' });
  }
};