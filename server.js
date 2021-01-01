// EXPRESS IMPORTS
const express = require('express');
const app = express();
require('./config/keycloak-config.js').initKeycloak();

// MIDDLEWARE
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

// ROUTES
const projectRoutes = require('./routes/routes.js');

// Server
const startupHelpers = require('./helpers/startup');
const startServer = require('./helpers/startServer');
const PORT = process.env.PORT || 4000;

// Execute Startup Processes
startupHelpers.registerEnvVars();
startupHelpers.startLogger(app);
startupHelpers.setProcessEventHandlers();

// Register Middleware
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

startServer(() => {
  app.use('/project/status', (_, res) => {
    res.json({ service: 'project', status: 'green-status' });
  });

  app.use('/project', projectRoutes);

  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} \tListening on port ${PORT}`);
  });
});
