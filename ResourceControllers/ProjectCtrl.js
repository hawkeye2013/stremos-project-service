const { Error404 } = require('../errors/Errors');
const { logInfo } = require('../logging/logging');

module.exports = class ProjectController {
  constructor(dataController) {
    this.dataCtrl = dataController;
  }

  findByID(id) {
    return new Promise((resolve, reject) => {
      this.dataCtrl
        .getByID(id)
        .then((data) => {
          if (data === null) {
            reject(new Error404(`Project ${id} is unable to be found.`));
          }
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }

  findByUserID(uid) {
    return new Promise((resolve, reject) => {
      this.dataCtrl
        .findByUserID(uid)
        .then((data) => {
          logInfo('ProjectCtrl', data);
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }
};
