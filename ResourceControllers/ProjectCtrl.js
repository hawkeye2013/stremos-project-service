module.exports = class ProjectController {
  constructor(dataController) {
    this.dataCtrl = dataController;
  }

  findByID(id) {
    this.dataCtrl.getByID(id);
  }

  findByUserID(uid) {
    this.dataCtrl.findByUserID(uid);
  }
};
