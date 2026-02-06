'use strict';

import { LinkedList } from "../linked-list/script.js";

class HashMap {
    #capacity = 16;
    #load_factor = 0.75;
    constructor() {
        this.map = new Array(this.#capacity);
    }

    getLoadSize = () => this.#load_factor;
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

    #checkCapacity() {
        let map = this.map;
        if (this.length() > Math.round(this.#capacity * this.#load_factor)) {
            this.#capacity = this.#capacity * 2;
            this.map = new Array(this.#capacity);
            map.forEach((item, i) => {
                let node = item.root;
                while (node) {
                    if (map[i]) this.set(node.value[0], node.value[1]);
                    node = node.nextNode;
                }
            });
        }
    }

    set(key, val) {
        let hash = this.hash(key);
        if (!this.map[hash]) this.map[hash] = new LinkedList();

        if (!this.has(key)) {
            this.map[hash].append([key, val]);
            this.#checkCapacity();
            return;
        }

        let root = this.map[hash].root;
        while (root !== null) {
            if (root.value[0] === key) {
                root.value = [key, val];
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

    remove(key) {
        let index = this.hash(key);
        if (!this.map[index]) return;

        let node = this.map[index].root;
        while (node !== null) {
            if (node.nextNode.value[0] === key) {
                if (node.nextNode.nextNode) node.nextNode = node.nextNode.nextNode;
                else node.nextNode = null;
                return true;
            }
            node = node.nextNode;
        }
        return false;
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

    has = (key) => !!this.get(key);
    keys = () => this.entries().map((k) => k[0]);
    values = () => this.entries().map((v) => v[1]);

    entries() {
        const values = [];
        for (let k = 0; k < this.#capacity; k++) {
            if (this.map[k]) values.push(...this.#getNodes(k));
        }
        return values
    }
}

const test = new HashMap();
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
test.set('moon', 'silver');
console.log(test.length(), test.getCapacity() * test.getLoadSize(), test.map.length);
console.log(test.entries());
