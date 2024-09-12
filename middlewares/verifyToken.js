const SECRET_KEY =  process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');



const verifyToken = (req, res, next) => {
  // Get the token from the request header
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(403).json({ message: 'No token provided!' });
  }

  // Remove 'Bearer ' prefix if present
  const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

  // Verify the token
  jwt.verify(tokenWithoutBearer, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized!' });
    }
    // Save the decoded token to the request for use in other routes
    req.userId = decoded.id;
    next();
  });
};


module.exports =  {verifyToken};