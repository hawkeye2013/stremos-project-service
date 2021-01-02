const ProjectDataController = require('../DataControllers/ProjectDataCtrl');

module.exports = class ProjectController {
  constructor() {
    this.dataCtrl = new ProjectDataController();
  }

  findByID(id) {
    this.dataCtrl.getByID(id);
  }

  findByUserID(uid) {
    this.dataCtrl.findByUserID(uid);
  }
};
