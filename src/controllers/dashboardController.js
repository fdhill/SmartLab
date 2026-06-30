const dashboardService = require('../services/dashboardService');
const { ok } = require('../utils/response');

async function summary(req, res, next) {
  try {
    const data = await dashboardService.getSummary();
    ok(res, data, 'Dashboard summary retrieved successfully');
  } catch (err) {
    next(err);
  }
}

module.exports = { summary };
