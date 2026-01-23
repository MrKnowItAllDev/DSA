export class Queue {
    constructor() {
        this.queue = [];
    }

    enqueue(val) {
        this.queue.push(val);
    }

    dequeue() {
        if (this.isEmpty()) return;
        this.queue.shift();
    }

    isEmpty() {
        return !this.queue.length;
    }

    getQueue() {
        return this.queue;
    }

    front() {
        if (this.isEmpty()) return;
        return this.queue[0];
    }

    last() {
        if (this.isEmpty()) return;
        return this.queue[this.queue.length - 1];
    }
}
