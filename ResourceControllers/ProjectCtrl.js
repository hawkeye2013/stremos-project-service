const ProjectDataController = require('../DataControllers/ProjectDataCtrl');
const { Error404 } = require('../error/Errors');

module.exports = class ProjectController {
  constructor() {
    this.dataCtrl = new ProjectDataController();
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
          console.log(data);
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }
};
