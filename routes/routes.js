const express = require('express');
const ProjectController = require('../ResourceControllers/ProjectCtrl');
const router = express.Router();

let keycloak = require('../config/keycloak-config').getKeycloak();

let projectCtrl = new ProjectController();

router.get('/:id', keycloak.protect('user'), (req, res) => {
  projectCtrl
    .findByID(req.params.id)
    .then((data) => res.json(data))
    .catch((customErr) => {
      customErr.send(res);
    });
});

router.get('/findByUser/:uid', keycloak.protect('user'), (req, res) => {
  projectCtrl
    .findByUserID(req.params.uid)
    .then((data) => {
      res.json(data);
    })
    .catch((customErr) => {
      console.log(customErr);

      customErr.send(res);
    });
});

module.exports = router;
