const express = require('express');
const ProjectDataController = require('../DataControllers/ProjectDataCtrl');
const ProjectController = require('../ResourceControllers/ProjectCtrl');
const router = express.Router();

let keycloak = require('../config/keycloak-config').getKeycloak();

// We Instantiate the Data controller here and pass it to the project controller
// so we can start the db pool.  This way it doesn't try an pool for each connection
// only on the initial startup
let projectDataCtrl = new ProjectDataController();

let projectCtrl = new ProjectController(projectDataCtrl);

router.get('/:id', keycloak.protect('user'), (req, res) => {
  projectCtrl.findByID(req.params.id);
  res.send(`Getting Project ${req.params.id}`);
});

router.get('/findByUser/:uid', keycloak.protect('user'), (req, res) => {
  projectCtrl.findByUserID(req.params.uid);
  res.send(`Getting Project ${req.params.uid}`);
});

module.exports = router;
