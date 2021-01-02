const ProjectDataController = require('../DataControllers/ProjectDataCtrl');

module.exports = class ProjectController {
  constructor() {
    this.dataCtrl = new ProjectDataController();
  }
};
