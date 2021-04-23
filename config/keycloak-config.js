const Keycloak = require('keycloak-connect');
const { logWarn, logInfo, logError } = require('../logging/logging');

let keycloakInstance;

const keycloakConfig = {
  clientId: process.env.KEYCLOAK_CLIENT,
  bearerOnly: true,
  serverUrl: `http://${process.env.KEYCLOAK_HOST}/auth`,
  realm: process.env.KEYCLOAK_REALM,
  realmPublicKey: process.env.KEYCLOAK_PUBLIC_KEY,
};

function initKeycloak() {
  if (keycloakInstance) {
    logWarn('KeycloakConfig', 'Trying to init Keycloak again!');
    return keycloakInstance;
  }

  logInfo('KeycloakConfig', `Initializing Keycloak for pid ${process.pid}`);
  keycloakInstance = new Keycloak({}, keycloakConfig);
  return keycloakInstance;
}

function getKeycloak() {
  if (!keycloakInstance) {
    logError(
      'KeycloakConfig',
      'Keycloak has not been initialized. Please called init first.',
    );
  }
  return keycloakInstance;
}

module.exports = {
  initKeycloak,
  getKeycloak,
};
