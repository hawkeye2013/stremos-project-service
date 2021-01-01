const express = require('express');
const router = express.Router();

let keycloak = require('../config/keycloak-config').getKeycloak();

router.get('/:id', keycloak.protect('user'), (req, res) => {
  res.send(`Getting Project ${req.params.id}`);
});

module.exports = router;
