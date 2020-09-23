const Boom = require('boom');

module.exports = (err, _req, res, _next) => {
  if (Boom.isBoom(err)) {
    const {
      output: { payload },
    } = err;

    return res.status(payload.statusCode).json({ message: payload.message });
  }

  console.error(err);

  return res.status(500).json({
    err: {
      error: err.message,
      message: 'Internal Error',
      stack: err.stack,
    },
  });
};
