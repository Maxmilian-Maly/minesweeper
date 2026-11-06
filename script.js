const rows = 10;
const cols = 10;
const boardElement = document.getElementById('game-board');

function createBoard() {
    // nastavi grid podle sloupcu
    boardElement.style.gridTemplateColumns = `repeat(${cols}, 30px)`;

    // generator bunek
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');

            // func na zkousku klikani
            cellElement.addEventListener('click', function() {
                console.log(`Kliknul jsi na řádek ${r}, sloupec ${c}`);
                cellElement.style.backgroundColor = '#fff';
            });

            boardElement.appendChild(cellElement);
        }
    }
}

// spusteni po nacteni webu
createBoard();