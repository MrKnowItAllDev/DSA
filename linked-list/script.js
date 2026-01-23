class Node {
    constructor(val = null, nextNode = null) {
        this.value = val;
        this.nextNode = nextNode;
    }
}

class LinkedList {
    #listSize = 0
    constructor() {
        this.root = null;
        this.next = null;
    }

    append(val) {
        if (!this.root) {
            this.next = this.root = new Node(val);
            this.#listSize++;
            return;
        }
        this.next.nextNode = new Node(val);
        this.next = this.next.nextNode;
        this.#listSize++;
    }

    prepend(val) {
        if (!this.root) {
            this.next = this.root = new Node(val);
            this.#listSize++;
            return;
        }
        let tmp = this.root;
        this.root = new Node(val);
        this.root.nextNode = tmp;
        this.#listSize++;
    }

    size = () => this.#listSize;
    head = () => this.root;
    tail = () => this.next;

    at(index) {
        let idx = 0;
        let rootNode = this.root;
        while (rootNode !== null) {
            if (idx === index) return rootNode;
            rootNode = rootNode.nextNode;
            idx++;
        }
        return null;
    }

    pop() {
        let removed;
        let node = this.root;

        if (!this.root) return null;
        this.#listSize--;

        while (node.nextNode !== this.next) {
            node = node.nextNode;
        }

        removed = this.next;
        node.nextNode = null;
        this.next = node;

        return removed;
    }

    getNodes = () => {
        const nodes = {};
        let node = this.root;
        while (node !== null) {
            nodes[node.value] = node;
            node = node.nextNode;
        }
        return nodes;
    };

    contains(val) {
        let rootNode = this.root;
        while (rootNode !== null) {
            if (rootNode.value === val)
                return true;
            rootNode = rootNode.nextNode;
        }
        return false;
    }

    find(val) {
        let node = this.root;
        while (node !== null) {
            if (node.value === val) return node;
            node = node.nextNode;
        }
        return null;
    }

    toString() {
        let node = this.root;
        let stringArr = ``;
        while (node !== null) {
            stringArr += `( ${node.value} ) -> `;
            node = node.nextNode;
        }
        return stringArr + `null`;
    }

    insertAt(index, val) {
        if (index >= this.#listSize + 1 || index < 0) return;
        if (index === 0) {
            this.#listSize++;
            this.prepend(val);
            return;
        }

        let idx = 0, tmp;
        let node = this.root;

        while (++idx < index) {
            node = node.nextNode;
        }
        tmp = node.nextNode;
        node.nextNode = new Node(val);
        node = node.nextNode;
        node.nextNode = tmp;
        this.#listSize++;
    }

    removeAt(index) {
        // Remove note at index
        // Previous node's reference must be assigned to the current node's reference
        this.#listSize--;
    }
}

const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");
list.prepend("horse");
list.prepend("cow");

// const node = list.pop();
// const newNode = list.pop();
// console.log("Removed:", node);
// console.log("Next removed:", newNode);
list.insertAt(2, "new");

list.pop();
list.pop();
list.pop();
list.prepend("chicken");
list.insertAt(3, "before-new");
console.log(list.toString());
console.log(list.size());
// const linkedList = new LinkedList();
// linkedList.append(1);
// linkedList.append(2);
// linkedList.append(3);
// linkedList.append(4);
// linkedList.append(5);

// // linkedList.insertAt(2, 45);
// linkedList.prepend(76);
// linkedList.prepend(100);
// console.log(linkedList.toString());
// console.log(linkedList.find(100));