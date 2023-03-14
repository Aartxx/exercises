#!/usr/bin/env node
import notifier from 'node-notifier';

import { getDelayInSeconds } from './helpers/time.js';

function main() {
    const [,, ...params] = process.argv;
    const delay = getDelayInSeconds(...params);

    setTimeout(() => {
        notifier.notify({
            title: 'Timer Notification!',
            message: 'Timer finished.'
        });
    }, delay * 1000);
}

main();
