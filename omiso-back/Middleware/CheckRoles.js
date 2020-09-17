// checks if role in token matches with the role in the route
const checkRoles = (roles) => (req, res, next) => {
  console.log("req.dataToken.role", req.dataToken.role)
  if (roles.length && !roles.includes(req.dataToken.role)) {
    // user's role is not authorized
    return res.status(401).json({ message: 'Unauthorized ' });
  }
  // authentication and authorization successful
  next();
};

module.exports = checkRoles;
