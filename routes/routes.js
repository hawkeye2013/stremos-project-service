const express = require('express');
const ProjectController = require('../ResourceControllers/ProjectCtrl');
const router = express.Router();

let keycloak = require('../config/keycloak-config').getKeycloak();

let projectCtrl = new ProjectController();

router.get('/:id', keycloak.protect('user'), (req, res) => {
  projectCtrl.findByID(req.params.id);
  res.send(`Getting Project ${req.params.id}`);
});
router.get('/findByUser/:uid', keycloak.protect('user'), (req, res) => {
  projectCtrl.findByUserID(req.params.uid);
  res.send(`Getting Project ${req.params.uid}`);
});

module.exports = router;
