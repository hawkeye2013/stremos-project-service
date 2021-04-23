// IMPORTS
const os = require('os');
const cluster = require('cluster');
const { logInfo } = require('../logging/logging');

/**
 * Finds the value of workers we can use.  It doesn't make
 * sense to have more workers than computer cores, since node
 * is single threaded.  If more workers are configured than
 * cpu cores available to use, this function will limit the
 * worker number to cpu core number.  If no value is provided
 * for the maximum CPU cores, the default value of numCpuCores
 * will be used.
 */
function getNumWorkers() {
  const cpuCores = os.cpus().length;

  if (process.env.MAX_WORKERS) {
    return Math.min(cpuCores, process.env.MAX_WORKERS);
  }
  return cpuCores;
}

/**
 * This function executes the fork of the workers.
 */
function forkWorkers() {
  for (let i = 0; i < getNumWorkers(); i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    cluster.fork();
    logInfo('StartServer', `Worker ${worker.id} has exited`);
  });
}

/**
 * This function abstracts the clustering process from the server.js
 * file. This allows the server.js file to purely focus on configuration.
 *
 * @param {function} callback - Function to execute to start a worker
 */
module.exports = (callback) => {
  if (cluster.isMaster && getNumWorkers() > 1) {
    forkWorkers();
  } else {
    callback();
  }
};
