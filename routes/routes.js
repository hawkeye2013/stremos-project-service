const express = require('express');
const ProjectController = require('../ResourceControllers/ProjectCtrl');
const router = express.Router();

let keycloak = require('../config/keycloak-config').getKeycloak();

let projectCtrl = new ProjectController();

router.get('/:id', keycloak.protect('user'), (req, res) => {
  res.send(`Getting Project ${req.params.id}`);
});

module.exports = router;
