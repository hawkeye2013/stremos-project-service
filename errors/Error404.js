const { ErrorResponse } = require('./Errors');

class Error404 extends ErrorResponse {
  constructor(developerInfo) {
    super(404, 'No Resources Found', developerInfo);
  }
}
exports.Error404 = Error404;
