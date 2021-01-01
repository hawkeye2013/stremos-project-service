// EXPRESS IMPORT
const express = require('express');
const app = express();

// MIDDLEWARE IMPORT
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

// ROUTES IMPORT
const projectRoutes = require('./routes/routes.js');

// SERVER HELPER IMPORT
const startupHelpers = require('./helpers/startup');
const startServer = require('./helpers/startServer');

// SERVER CONFIG
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
