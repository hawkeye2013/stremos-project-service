const { ErrorResponse } = require('./Errors');

class Error500 extends ErrorResponse {
  constructor(developerInfo) {
    super(
      500,
      'Internal Server Error.  The error has been logged and will be investigated.',
      developerInfo,
    );
  }
}
exports.Error500 = Error500;
