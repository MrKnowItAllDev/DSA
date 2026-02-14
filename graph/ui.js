
export class UI {
    static body = () => document.querySelector('body');
    static container = () => document.querySelector('.container');

    static createGrid() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0;j < 8; j++) {
                const square = document.createElement('div');
                square.classList.add('');
                container.appendChild(square);
            }
        }
    }
}