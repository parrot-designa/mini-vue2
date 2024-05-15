import { nextTick } from "../util/next-tick";

const queue = [];

let getNow = Date.now;

export let currentFlushTimestamp = 0

/**
 * 重置状态
 */
function resetSchedulerState() {
    queue.length = 0 
}
  

function flushSchedulerQueue() {
    currentFlushTimestamp = getNow();

    let watcher, id, index;

    for(index = 0; index < queue.length; index++) {
        watcher = queue[index]
        id = watcher.id

        watcher.run()
    }

    resetSchedulerState();
}

export function queueWatcher(watcher){
    queue.push(watcher);

    nextTick(flushSchedulerQueue);
};