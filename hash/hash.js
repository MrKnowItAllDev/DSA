'use strict';

import { LinkedList } from "../linked-list/script.js";

class HashMap {
    #capacity = 16;
    #load_size = 0.75;
    constructor() {
        this.map = new Array(this.#capacity);
    }

    createMap() {
        for (let i = 0; i < this.#capacity; i++) {
            this.map[i] = new LinkedList();
        }
    }

    getLoadSize = () => this.#load_size;
    getCapacity = () => this.#capacity;

    hash(str) {
        if ((typeof str instanceof String)) throw new Error("TypeError! Please use a string as input!");
        let hashCode = 0,
            prime = 31;

        for (let i = 0; i < str.length; i++) {
            hashCode = ((prime * hashCode) + str.charCodeAt(i)) % this.#capacity;
        }
        return hashCode;
    }

    // TODO: Check for full capacity/load size
    set(key, val) {
        let hash = this.hash(key);
        let node = [key, val];
        if (!this.map[hash]) {
            this.map[hash] = new LinkedList();
        }

        if (!this.has(key)) {
            this.map[hash].append(node);
            return;
        }

        let root = this.map[hash].root;
        while (root !== null) {
            if (root.value[0] === key) {
                root.value = node;
                return;
            }
            root = root.nextNode;
        }
    }

    #getNodes(index) {
        let node = this.map[index].root;
        let arr = [];
        while (node !== null) {
            arr.push(node.value);
            node = node.nextNode;
        }
        return arr;
    }

    get(key) {
        let index = this.hash(key);
        if (!this.map[index]) return null;

        let node = this.map[index].root;
        while (node !== null) {
            if (node.value && node.value[0] === key) return node.value[1];
            node = node.nextNode;
        }
    }

    has(key) {
        return !!this.get(key);
    }

    remove(key) {

    }

    length() {
        let size = 0;
        for (let i = 0; i < this.#capacity; i++) {
            if (this.map[i]) size += this.map[i].size();
        }
        return size;
    }

    clear() {
        for (let j = 0; j < this.#capacity; j++) {
            this.map[j] = null;
        }
    }

    keys() {
        return this.entries().map((k) => k[0]);
    }

    values() {
        return this.entries().map((v) => v[1]);
    }

    entries() {
        const values = [];
        for (let k = 0; k < this.#capacity; k++) {
            if (this.map[k]) values.push(...this.#getNodes(k));
        }
        return values
    }
}

const hash = new HashMap();
// console.log("Hash:", hash.hash("Nathan"));
hash.set("Rama", "Lloyd");
hash.set("Sita", "Bottomsworth");
hash.set("Sita", "New");
hash.set("Nathan", "The One And Only");
hash.set("C", "C-Man");
hash.set("C", "New C");
console.log(hash.keys());
console.log(hash.getLoadSize() * hash.getCapacity(), hash.length());
// console.log(hash.map[3]);
// console.log("Hash:", hash.hash("Rama"));
// console.log("Hash:", hash.hash("Sita"));
