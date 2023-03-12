const EventEmitter = require('events');
const { RESULT_EVENT, isValidOperation, initOperationEvents } = require('./operations');

function main() {
    const num1 = Number(process.argv[2]);
    const num2 = Number(process.argv[3]);
    const operation = process.argv[4];

    if (isNaN(num1) || isNaN(num2)) {
        throw new Error('Not valid numbers');
    }

    if (!isValidOperation(operation)) {
        throw new Error('Not valid operation');
    }
    const bus = new EventEmitter();

    initOperationEvents(bus);
    bus.on(RESULT_EVENT, console.log);
    bus.emit(operation, num1, num2);
}

main();
