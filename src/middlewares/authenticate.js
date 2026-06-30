const { verify } = require('../config/jwt');

function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Access token is missing' });
  }

  const token = authHeader.slice(7);

  try {
    const decoded = verify(token);
    req.user = decoded;
    next();
  } catch (err) {
    const message = err.name === 'TokenExpiredError' ? 'Token has expired' : 'Token is invalid';
    return res.status(401).json({ success: false, message });
  }
}

function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'You do not have permission to access this resource' });
    }
    next();
  };
}

module.exports = { authenticate, authorize };
