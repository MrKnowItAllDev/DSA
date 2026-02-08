'use strict';

// @ts-check

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
        if (start > end) return null;

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

    /**
     * @param {function} callback
     * @param {object} root
     * */
    inOrderForEach(callback, root=this.root) {
        if (!callback) throw new Error("No callback provided");
        if (root === null) return root;

        else {
            this.inOrderForEach(callback, root.left);
            callback(root.data);
            this.inOrderForEach(callback, root.right);
        }
    }

    /**
     * @param {function} callback
     * @param {object} root
     * */
    preOrderForEach(callback, root=this.root) {
        if (!callback) throw new Error("No callback provided");
        if (root === null) return root;

        callback(root.data);
        this.preOrderForEach(callback, root.left);
        this.preOrderForEach(callback, root.right);
    }

    /**
     * @param {function} callback
     * @param {object} root
     * */
    postOrderForEach(callback, root=this.root) {
        if (!callback) throw new Error("No callback provided");
        if (root === null) return root;

        this.postOrderForEach(callback, root.left);
        this.postOrderForEach(callback, root.right);
        callback(root.data);
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

    /**
     * @param {number} value
     * @returns {$ObjMap}
     * */
    deleteItem(value) {
        let root = this.root;
        let prev = root;

        while (root !== null) {
            if ((root.left && root.right) && root.data === value) {
                let [parent, node] = [...this.getSuccessorNode(root)];
                root.data = node.data;
                if (parent.left) parent.left = null;
                else if (parent.right) parent.right = null;
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

    /**
     * @param {$ObjMap | null} node
     *  @returns { number | undefined }
     **/
    #getHeight(node) {
        let height = 0;
        while (node.left) {
            if (node.left) node = node.left;
            else node = node.right;
            height++;
        }
        return height;
    }

    /** @param {number} value */
    height(value) {
        if (!this.includes(value)) return undefined;

        let node = this.breadthFirstTraverse(value);
        return this.#getHeight(node);
    }

    /** @param {number} value */
    depth(value) {
        if (!this.includes(value)) return undefined;

        let root = this.root, depth = 0;
        while (root) {
            if (value < root.data) root = root.left;
            else if (value > root.data) root = root.right;
            else return depth;
            depth++;
        }
    }

    /** @returns {boolean | null} */
    isBalanced(root=this.root, nHeight=-1) {
        if (!root) return null;

        nHeight++;
        let left = this.isBalanced(root.left, nHeight);
        let right = this.isBalanced(root.right, nHeight);

        return Math.abs(left - right) < 2;
    }

    rebalance() {
        const array = [];
        this.inOrderForEach((v) => array.push(v));
        return this.buildBST(array, 0, array.length - 1);
    }
}

const array = [0, 1, 2, 4, 6, 8, 7, 9, 10, 17, 19, 20, 22];
const values = [10, 5, 15, 2, 7, 12, 20, 1];

const tree = new Tree();
tree.buildBST(array, 0, array.length - 1);
// console.log(tree.root);
// console.log(tree.depth());
// console.log(tree.root);
console.log(tree.isBalanced());
// tree.deleteItem(20);

