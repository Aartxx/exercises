const { parentPort, workerData } = require('worker_threads');
const { compute } = require('./functions');

parentPort.postMessage(compute(workerData));
