const { verify } = require('../config/jwt');
const { fail } = require('../utils/response');

function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return fail(res, 'Access token is missing', 401);
  }

  const token = authHeader.slice(7);

  try {
    const decoded = verify(token);
    req.user = decoded;
    next();
  } catch (err) {
    const message = err.name === 'TokenExpiredError' ? 'Token has expired' : 'Token is invalid';
    return fail(res, message, 401);
  }
}

function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return fail(res, 'You do not have permission to access this resource', 403);
    }
    next();
  };
}

module.exports = { authenticate, authorize };
