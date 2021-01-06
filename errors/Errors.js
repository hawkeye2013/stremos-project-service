const { logInfo } = require('../logging/logging');

class ErrorResponse {
  constructor(code, userResponse, developerInfo) {
    this.code = code;
    this.userResponse = userResponse;
    this.developerInfo = developerInfo;
  }

  send(res) {
    this.logDeveloperData();
    res.status(this.code).send(this.userResponse);
  }

  logDeveloperData() {
    logInfo(
      'ErrorBaseClass',
      `Resource Error - ${this.code}, ${this.developerInfo}`,
    );
  }
}

exports.ErrorResponse = ErrorResponse;
