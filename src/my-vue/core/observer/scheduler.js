const queue = [];

let getNow = Date.now;

export let currentFlushTimestamp = 0

function flushSchedulerQueue() {
    currentFlushTimestamp = getNow();

    let watcher,id;

    for(index = 0; index < queue.length; index++) {
        watcher = queue[index]
        id = watcher.id
    }
}

export function queueWatcher(watcher){
    queue.push(watcher);
};