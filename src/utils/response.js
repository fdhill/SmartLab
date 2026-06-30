function ok(res, data, message = 'Success', statusCode = 200) {
  return res.status(statusCode).json({ success: true, message, data });
}

function created(res, data, message) {
  return ok(res, data, message, 201);
}

function fail(res, message, statusCode = 500, data = null) {
  return res.status(statusCode).json({ success: false, message, data });
}

module.exports = { ok, created, fail };
