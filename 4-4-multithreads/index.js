const os = require("os");
const path = require("path");
const { Worker } = require('worker_threads');
const { performance, PerformanceObserver } = require('perf_hooks');

const { compute } = require('./functions');

const performanceObserver = new PerformanceObserver(items => {
    items.getEntries().forEach(entry => {
        console.log(`${entry.name}: ${entry.duration}`);
    })
});

performanceObserver.observe({ entryTypes: ['measure'] });

const MAX_NUMBER_SIZE = 3_000_000_000;

function withoutWorkers() {
    performance.mark('simple start');
    const res = compute({ start: 1, end: MAX_NUMBER_SIZE });

    performance.mark('simple end');
    performance.measure('simple', 'simple start', 'simple end');
    console.log(res);
}

const workerFunction = (start, end) => {
    return new Promise((resolve) => {
        const worker = new Worker(path.resolve(__dirname, './worker.js'), {
            workerData: {
                start,
                end
            }
        });

        worker.on('message', msg => {
            resolve(msg);
        })
    })
}

function withWorkers() {
    const length = os.cpus().length;
    const chunkSize = Math.ceil(MAX_NUMBER_SIZE / length);
    const chunks =  Array.from({ length }, (_, ind) => {
        const startChunk = ind * chunkSize;
        const endChunk = startChunk + chunkSize;

        return workerFunction(startChunk + 1, Math.min(endChunk, MAX_NUMBER_SIZE));
    });

    performance.mark('worker start');

    Promise
        .all(chunks)
        .then((results) => {
            console.log(results);
            performance.mark('worker end');
            performance.measure('worker', 'worker start', 'worker end');
        });
}

withoutWorkers();
withWorkers();
