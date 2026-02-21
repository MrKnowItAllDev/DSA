
import { knightMoves, getAdjacent } from "../graph.js";

class UI {
    static #body = () => document.querySelector('body');
    static #container = () => document.querySelector('.container');
    static #button = () => document.querySelector('.btn');
    static #getStart = () => document.querySelector('.start');
    static #getEnd = () => document.querySelector('.end');
    static #startHeader = () => document.querySelector('.start');
    static #endHeader = () => document.querySelector('.end');
    static #moveCounter = () => document.querySelector('.move-count');

    static createGrid() {
        this.#container().innerHTML = ``;
        for (let i = 7; i >= 0; i--) {
            for (let j = 0; j < 8; j++) {
                const square = document.createElement('div');
                square.setAttribute('id', `s${i}-${j}`);

                if ((i + j) % 2 === 0) square.style.backgroundColor = `#774f2a`;
                else square.style.backgroundColor = `#f4ecde`;

                square.style.height = `${this.#container().offsetWidth / 8}px`;
                square.style.width = `${this.#container().offsetHeight / 8}px`;
                square.classList.add('grid');
                this.#container().appendChild(square);
            }
        }
    }

    static start() {
        let id;
        let endId;
        let startSet = false;
        Array.from(document.querySelectorAll('.grid')).forEach((square) => {
            square.addEventListener('click', () => {
                if (!startSet) {
                    id = square.id;
                    startSet = true;
                    Array.from(document.querySelectorAll('.grid')).forEach((square) => {
                        if (square.id !== id) square.innerHTML = ``;
                    });
                    const img = document.createElement('img');
                    img.classList.add('img');
                    img.src = './chess.png';
                    square.appendChild(img);
                    this.#startHeader().textContent = 'Start: ' + square.id;
                    document.querySelector('.how-to').textContent = `Now select an end position`;
                }
                else {
                    if (!endId) {
                        endId = square.id;
                        document.querySelector('.how-to').textContent = `Press the Start button!`;
                        this.highlightEndPos(endId);
                    }
                }
            });
        });

        this.#button().addEventListener('click', (e) => {
            // Begin Algorithmic shenanigans
            let gridId = id.split('').map((i) => +i).filter((i) => i > -1);
            let endPos = endId.split('').map((i) => +i).filter((i) => i >= -1);
            let start = knightMoves(gridId, endPos);
            this.processPos(start, endId).catch((err) => console.log(err));
        });
    }

    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static async processPos(start, end) {
        let moves = 0;
        document.querySelector('.how-to').textContent = `Finding shortest path...`;
        for (const pos of start) {
            this.highlightEndPos(end);
            await this.makeMove(pos, start);
            this.#endHeader().textContent = `Current: s${pos.toString()}`;
            this.#moveCounter().textContent = `Moves: ${moves++}`;

            if (pos !== start[start.length - 1]) this.highlightPossibleMoves(pos);

            await this.sleep(700);

            if (pos !== start[start.length - 1]) {
                document.querySelector(`#s${pos[0]}-${pos[1]}`).innerHTML = ``;
                this.createGrid();
            }
        }
    }

    static async makeMove(pos, start) {
        let grid = document.querySelector(`#s${pos[0]}-${pos[1]}`);
        document.querySelector('.optimal').textContent = `Optimal Position: ${grid.id}`;
        grid.style.backgroundColor = `#37e1cc`;

        if (!grid.innerHTML) {
            if (pos === start[start.length - 1]) {
                document.querySelector('.how-to').textContent = `Shortest path found!`;
                document.querySelector(`#s${pos[0]}-${pos[1]}`).style.backgroundColor = `#4cdc03`;
            }
            let img = document.createElement('img');
            img.classList.add('img');
            img.src = `./chess.png`;
            grid.appendChild(img);
        }
        await this.sleep(1000);
    }

    static getCoords() {
        const grids = Array.from(document.querySelectorAll('.grid'));
        const coords = [];
        grids.forEach((grid, i) => {
            const coordinate = grid.getBoundingClientRect();
            const [x, y] = [coordinate.x, coordinate.y + (grid.offsetTop * pageYOffset)];
            coords[i] = [x, y, coordinate.width, coordinate.height];
        });
        return coords;
    }

    static highlightEndPos(id) {
        document.querySelector(`#${id}`).style.backgroundColor = `red`;
    }

    static highlightPossibleMoves(pos) {
        const paths = getAdjacent(pos);
        Array.from(document.querySelectorAll('.grid')).filter((grid) => {
            paths.forEach((array) => {
                let gId = grid.id.split('').map((i) => +i).filter((i) => i > -1);
                if (gId[0] === array[0] && gId[1] === array[1]) document.querySelector(`#${grid.id}`).style.backgroundColor = `#eda356`;
            });
        });
    }

    static animateMove() { }
}

UI.createGrid();
UI.start();