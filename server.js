// EXPRESS IMPORT
const express = require('express');

// MIDDLEWARE IMPORT
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

// SERVER IMPORTS
const startupHelpers = require('./helpers/startup');
const startServer = require('./helpers/startServer');

const app = express();

// Register Environment Variables
startupHelpers.registerEnvVars();

// SERVER CONFIG
const PORT = process.env.PORT || 4000;
const keycloak = require('./config/keycloak-config').initKeycloak();

// ROUTES IMPORT
const projectRoutes = require('./routes/routes.js');

// Execute Startup Processes
startupHelpers.startLogger(app);
startupHelpers.setProcessEventHandlers();

// Register Middleware
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(keycloak.middleware());

startServer(() => {
  app.use('/project/status', (_, res) => {
    res.json({ service: 'project', status: 'green-status' });
  });

  app.use('/project', projectRoutes);

  app.listen(PORT, () => {
    /* eslint-disable */
    console.log(`Worker ${process.pid} \tListening on port ${PORT}`);
  });
});
