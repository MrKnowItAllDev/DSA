'use strict';

import { Queue } from "../Queue/queue.js";

export function knightMoves(start, end) {
    const visited = new Set();
    const parent = new Set();

    const queue = new Queue();
    queue.enqueue(start);

    parent[start.toString()] = null;

    while (!queue.isEmpty()) {
        let vertex = queue.front();
        let shortestPath = [];

        if ((vertex[0] === end[0]) && (vertex[1] === end[1])) {
            let pnt = parent[vertex.toString()];
            shortestPath.unshift(vertex);

            while (pnt !== null) {
                if (pnt) shortestPath.unshift([+pnt.split(',')[0], +pnt.split(',')[1]]);
                pnt = parent[pnt];
            }
            return shortestPath;
        }

        let adjacent = getAdjacent(vertex);
        let key = vertex.toString();
        visited[key] = key;

        for (const v of adjacent) {
            if (!visited[v.toString()]) {
                visited[v.toString()] = v;
                parent[v.toString()] = vertex.toString();
                queue.enqueue(v);
            }
        }
        queue.dequeue();
    }
}

function getDelta(pos) {
    return [
        [1, 2], [-1, 2], [1, -2], [-1, -2],
        [2, 1], [-2, 1], [2, -1], [-2, -1]
    ].map((i) => i)
    .filter((i) =>
            (pos[0] + i[0] >= 0 && pos[0] + i[0] < 8) &&
            (pos[1] + i[1] >= 0 && pos[1] + i[1] < 8)
        );
}

export function getAdjacent(pos) {
    return getDelta(pos).map((e) => [pos[0] + e[0], pos[1] + e[1]]);
}

function printPath(start, end) {
    let path = knightMoves(start, end);
    let moves = path.length - 1;
    path.forEach((path, i) => {
        if (i === 0) console.log(`You made it in ${moves} ${moves !== 1 ? 'moves' : 'move'}! Here's your path:`);
        console.log(path);
    });
}

printPath([0, 0], [4, 6]);