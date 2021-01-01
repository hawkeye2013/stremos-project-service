const morgan = require('morgan');

let startupHelpers = {};

startupHelpers.registerEnvVars = function () {
  if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
};

startupHelpers.startLogger = function (app) {
  if (process.env.NODE_ENV !== 'production') {
    app.use(
      morgan(function (tokens, req, res) {
        return [
          tokens.method(req, res),
          tokens.url(req, res),
          tokens.status(req, res),
          tokens.res(req, res, 'content-length'),
          '-',
          tokens['response-time'](req, res),
          'ms',
          '-',
          process.pid,
        ].join(' ');
      })
    );
  } else {
    app.use(morgan('combined'));
  }
};

startupHelpers.setProcessEventHandlers = function () {
  process.on('SIGTERM', () => {
    process.exit();
  });

  process.on('SIGTERM', () => {
    process.exit();
  });
};

module.exports = startupHelpers;
