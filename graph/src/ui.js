import {knightMoves} from "./graph.js";

class UI {
    static #body = () => document.querySelector('body');
    static #container = () => document.querySelector('.container');
    static #button = () => document.querySelector('.btn');
    static #getStart = () => document.querySelector('.start');
    static #getEnd = () => document.querySelector('.end');

    static createGrid() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const square = document.createElement('div');

                if ((i + j) % 2 === 0) square.style.backgroundColor = `#593b1d`;
                else square.style.backgroundColor = `#f4ecde`;

                square.style.height = `${this.#container().offsetWidth / 8}px`;
                square.style.width = `${this.#container().offsetHeight / 8}px`;
                square.classList.add('grid');

                this.#container().appendChild(square);
            }
        }
    }

    static start() {
        this.#button().addEventListener('click', (e) => {
            // Begin Algorithm shenanigans

        });
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

    static highlightPossibleMoves(pos) {
        const grids = knightMoves();
    }

    static animateMove() {

    }
}

UI.createGrid();