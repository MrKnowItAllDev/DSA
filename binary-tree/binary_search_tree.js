'use strict';

import { mergeSort } from "../merge-sort/mergeSort.js";
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

    buildBST(array, start, end) {
        if (start > end) {
            return null;
        }
        array = mergeSort(array);
        let mid = Math.round((start + end) / 2);
        let root = new Node(array[mid]);

        root.left = this.buildBST(array, start, mid - 1);
        root.right = this.buildBST(array, mid + 1, end);

        this.root = root;

        return root;
    }

    levelOrderForEach(callback) {
        if (!callback || !(callback instanceof Function)) throw new Error("Callback function required!");

        let queue = new Queue();
        queue.enqueue(this.root);

        while (!queue.isEmpty()) {
            let node = queue.front();
            if (node.left) queue.enqueue(node.left);
            if (node.right) queue.enqueue(node.right);
            callback(node.data);
            queue.dequeue();
        }
        return null;
    }

    breadthFirstTraverse(value) {
        let queue = new Queue();
        queue.enqueue(this.root);

        while (!queue.isEmpty()) {
            let node = queue.front();
            if (node.left) queue.enqueue(node.left);
            if (node.right) queue.enqueue(node.right);
            if (node.data === value) return node;
            queue.dequeue();
        }
        return null;
    }

    inOrderForEach(callback, root=this.root) {
        if (!callback || typeof callback !== "function") throw new Error("No callback provided");
        if (root === null) return null;

        this.inOrderForEach(root.left);
        callback(root);
        this.inOrderForEach(root.right);

        return root;
    }

    preOrderForEach(callback, root=this.root) {
        if (!callback || typeof callback !== "function") throw new Error("No callback provided");
        if (root === null) return root;

        callback(root);
        this.preOrderForEach(callback, root.left);
        this.preOrderForEach(callback, root.right);

        return root;
    }

    postOrderForEach(callback, root=this.root) {
        if (!callback || typeof callback !== "function") throw new Error("No callback provided");
        if (root === null) return root;

        this.postOrderForEach(callback, root.left);
        this.postOrderForEach(callback, root.right);
        callback(root);

        return root;
    }

    includes = (value) => !!this.breadthFirstTraverse(value);

    insert(value, root=this.root) {
        if (this.includes(value)) return;
        if (root === null) return new Node(value);

        if (value < root.data) root.left = this.insert(value, root.left);
        else root.right = this.insert(value, root.right);

        return root;
    }

    getSuccessorNode(root) {
        let parent;
        root = root.right;
        while (root !== null && root.left !== null) {
            parent = root;
            root = root.left;
        }
        return [parent, root];
    }

    deleteItem(value) {
        let root = this.root;
        let prev = root;

        while (root !== null) {
            if ((root.left && root.right) && root.data === value) {
                let [parent, node] = [...this.getSuccessorNode(root)];
                root.data = node.data;
                if (parent.left === node) parent.left = null;
                else if (parent.right === node) parent.right = null;
            }

            else if (((root.left && !root.right) || (!root.left && root.right)) && root.data === value) {
                if (root.left) prev.left = root.left;
                else if (root.right) prev.right = root.right;
            }

            else if ((!root.left && !root.right) && root.data === value) {
                if (root.data === prev.left.data) prev.left = null;
                else prev.right = null;
            }

            prev = root;
            if (value < root.data) root = root.left;
            else if (value > root.data) root = root.right;
            else return root;
        }
    }

    height(value) {

    }

    depth(value) {

    }

    isBalanced() {

    }

    rebalance() {

    }
}

const array = [1, 2, 3, 6, 7, 9, 10, 17, 19];
const tree = new Tree();
tree.buildBST(array, 0, array.length - 1);
tree.deleteItem(7);
console.log("----");
console.log(tree.root);