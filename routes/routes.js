const express = require('express');
const router = express.Router();

// let keycloak = require('../config/keycloak-config').getKeycloak();

// router.use(keycloak.middleware());

router.get('/:id' /*, keycloak.protect()*/, (req, res) => {
  res.send(`Getting Project ${req.params.id}`);
});

module.exports = router;
