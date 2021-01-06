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
    console.log(`Resource Error - ${this.code}, ${this.developerInfo}`);
  }
}

class Error404 extends ErrorResponse {
  constructor(developerInfo) {
    super(404, 'No Resources Found', developerInfo);
  }
}

class Error500 extends ErrorResponse {
  constructor(developerInfo) {
    super(
      500,
      'Internal Server Error.  The error has been logged and will be investigated.',
      developerInfo
    );
  }
}

exports.ErrorResponse = ErrorResponse;
exports.Error404 = Error404;
exports.Error500 = Error500;
