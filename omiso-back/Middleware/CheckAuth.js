// import
const jwt = require('jsonwebtoken');

// check, decode and add token to sent request
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_PASSWORD);
    req.dataToken = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'auth failed' });
  }
};
