const RESULT_EVENT = 'result';
const operations = {
    add: (a, b) => a + b,
    multiply: (a, b) => a * b,
    devide: (a, b) => a / b,
};

function initOperationEvents(bus) {
    Object
        .entries(operations)
        .map(([eventName, eventAction]) => bus.on(eventName, (num1, num2) => {
            const result = eventAction(num1, num2);
    
            bus.emit(RESULT_EVENT, result);
        }));
}

module.exports = {
    RESULT_EVENT,
    isValidOperation: (operation) => !!operations[operation],
    initOperationsEvent: initOperationEvents,
}
