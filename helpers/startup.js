const morgan = require('morgan');

const startupHelpers = {};

startupHelpers.registerEnvVars = () => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line global-require
    require('dotenv').config();
  }
};

startupHelpers.startLogger = (app) => {
  if (process.env.NODE_ENV !== 'production') {
    app.use(
      morgan((tokens, req, res) => {
        const options = [
          tokens.method(req, res),
          tokens.url(req, res),
          tokens.status(req, res),
          tokens.res(req, res, 'content-length'),
          '-',
          tokens['response-time'](req, res),
          'ms',
          '-',
          process.pid,
        ];

        return options.join(' ');
      }),
    );
  } else {
    app.use(morgan('combined'));
  }
};

startupHelpers.setProcessEventHandlers = () => {
  process.on('SIGTERM', () => {
    process.exit();
  });

  process.on('SIGTERM', () => {
    process.exit();
  });
};

module.exports = startupHelpers;
