var Keycloak = require('keycloak-connect');

let _keycloak;

var keycloakConfig = {
  clientId: process.env.KEYCLOAK_CLIENT,
  bearerOnly: true,
  serverUrl: `http://${process.env.KEYCLOAK_HOST}:${process.env.KEYCLOAK_PORT}/auth`,
  realm: process.env.KEYCLOAK_REALM,
  realmPublicKey: process.env.KEYCLOAK_PUBLIC_KEY,
};

function initKeycloak() {
  if (_keycloak) {
    console.warn('Trying to init Keycloak again!');
    return _keycloak;
  } else {
    console.log(`Initializing Keycloak for pid ${process.pid}`);
    _keycloak = new Keycloak({}, keycloakConfig);
    return _keycloak;
  }
}

function getKeycloak() {
  if (!_keycloak) {
    console.error(
      'Keycloak has not been initialized. Please called init first.'
    );
  }
  return _keycloak;
}

module.exports = {
  initKeycloak,
  getKeycloak,
};
