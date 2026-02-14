'use strict';

import { Queue } from "../Queue/queue.js";

function knightMoves(start, end) {
    const visited = new Set();
    const parent = new Set();
    const queue = new Queue();
    queue.enqueue(start);
    parent[`${start[0]}, ${start[1]}`] = null;

    while (!queue.isEmpty()) {
        let vertex = queue.front();
        let adjacent = getAdjacent(vertex);
        let key = `${vertex[0]}, ${vertex[1]}`;
        visited[key] = key;
        for (const v of adjacent) {
             if (!visited[`${v[0]}, ${v[1]}`]) {
                 visited[`${v[0]}, ${v[1]}`] = v;
                 parent[`${v[0]}, ${v[1]}`] = `${vertex[0]}, ${vertex[1]}`;
                 queue.enqueue(v);
             }
        }

        let shortestPath = [];
        if (vertex[0] === end[0] && vertex[1] === end[1]) {
            let pnt = parent[`${vertex[0]}, ${vertex[1]}`];
            shortestPath.unshift(vertex);

            while (pnt) {
                if (pnt) {
                    let [x, y] = pnt.split(', ');
                    shortestPath.unshift([+x, +y]);
                }
                pnt = parent[pnt];
            }
            return shortestPath;
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

function getAdjacent(pos) {
    return getDelta(pos).map((e) => [pos[0] + e[0], pos[1] + e[1]]);
}

console.log(knightMoves([0,0],[4,6]));