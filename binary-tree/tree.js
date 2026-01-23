import { Queue } from "../Queue/queue.js";

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor() {
        this.root = null;
    }

    getTree = () => this;

    traverseBreadth() {
        if (!this.root) return;

        const queue = new Queue();
        queue.enqueue(this.root);
        console.log(queue.front());
        while (!queue.isEmpty()) {
            let current = queue.front();
            if (current.left) queue.enqueue(current.left);
            if (current.right) queue.enqueue(current.right);
            console.log(current);
            queue.dequeue();
        }
    }

    traverseDepth() {

    }

    traversePreorderDepth(root) {
        if (root === null) return;
        console.log(root.data);
        this.traversePreorderDepth(root.left);
        this.traversePreorderDepth(root.right);
    }

    traverseInorderDepth(root) {
        if (root === null) return;

        this.traverseInorderDepth(root.left);
        console.log(root.data);
        this.traverseInorderDepth(root.right);
    }

    traversePostOrderDepth(root) {
        if (root === null) return;

        this.traversePostOrderDepth(root.left);
        this.traversePostOrderDepth(root.right);
        console.log(root.data);
    }
}

const tree = new Tree();
tree.root = new Node(5);
tree.root.right = new Node(12);
tree.root.left = new Node(7);
tree.root.left.left = new Node(7.5);
tree.root.left.right = new Node(7.6);
tree.traversePreorderDepth(tree.root);