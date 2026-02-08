// import { Queue } from "../Queue/queue.js";
// // Test code to learn tree traversal
// class Node {
//     constructor(data) {
//         this.data = data;
//         this.left = null;
//         this.right = null;
//     }
// }
//
// class Tree {
//     constructor() {
//         this.root = null;
//     }
//
//     getTree = () => this;
//
//     traverseBreadth() {
//         if (!this.root) return;
//
//         const queue = new Queue();
//         queue.enqueue(this.root);
//         console.log(queue.front());
//         while (!queue.isEmpty()) {
//             let current = queue.front();
//             if (current.left) queue.enqueue(current.left);
//             if (current.right) queue.enqueue(current.right);
//             queue.dequeue();
//         }
//     }
//
//     traversePreorderDepth(root) {
//         if (root === null) return;
//         console.log(root.data);
//         this.traversePreorderDepth(root.left);
//         this.traversePreorderDepth(root.right);
//     }
//
//     traverseInorderDepth(root) {
//         if (root === null) return;
//
//         this.traverseInorderDepth(root.left);
//         console.log(root.data);
//         this.traverseInorderDepth(root.right);
//     }
//
//     traversePostOrderDepth(root) {
//         if (root === null) return;
//
//         this.traversePostOrderDepth(root.left);
//         this.traversePostOrderDepth(root.right);
//         console.log(root.data);
//     }
// }
//
// const tree = new Tree();
// tree.root = new Node(5);
// tree.root.right = new Node(12);
// tree.root.left = new Node(7);
// tree.root.left.left = new Node(7.5);
// tree.root.left.right = new Node(7.6);
// tree.traversePreorderDepth(tree.root);

class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor() {
        this.root = new TreeNode(10);

        this.root.left = new TreeNode(5);
        this.root.right = new TreeNode(15);

        this.root.left.left = new TreeNode(3);
        this.root.left.right = new TreeNode(7);

        this.root.right.left = new TreeNode(13);
        this.root.right.right = new TreeNode(17);
    }

    isBalanced(root=this.root, nHeight=-1) {
        if (!root) return nHeight;

        let left = this.isBalanced(root.left, nHeight++);
        let right = this.isBalanced(root.right, nHeight++);

        return Math.abs(left - right) < 2;
    }
}

const tree = new Tree();
console.log(tree.root);
console.log(tree.isBalanced());


