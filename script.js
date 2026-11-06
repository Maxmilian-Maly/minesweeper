const rows = 10;
const cols = 10;
const boardElement = document.getElementById('game-board');

// pole na ukladani divu
let allCells = [];

function initGame() {
    boardElement.innerHTML = '';
    boardElement.style.gridTemplateColumns = `repeat(${cols}, 30px)`;
    allCells = [];

    // delani bunek
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            // vychozi data
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.dataset.isMine = "false";
            cell.dataset.strength = "0";

            // klikani vypois
            cell.addEventListener('click', function() {
                console.log(`Klik: Řádek ${cell.dataset.row}, Sloupec ${cell.dataset.col} | Mina: ${cell.dataset.isMine} | Síla: ${cell.dataset.strength}`);
            });

            boardElement.appendChild(cell);
            allCells.push(cell); // prida do seznamu
        }
    }

    // sila a pocet min
    placeMines(1, 7);
    placeMines(3, 5);
    placeMines(5, 4);
}

// random placement
function placeMines(strength, count) {
    let placed = 0;
    while (placed < count) {
        // vyber random bunky
        let randomIndex = Math.floor(Math.random() * allCells.length);
        let randomCell = allCells[randomIndex];

        // kontrol ajestli uz nema minu
        if (randomCell.dataset.isMine === "false") {
            // prepsani atributu
            randomCell.dataset.isMine = "true";
            randomCell.dataset.strength = strength;

            // docasny vypsani sily miny
            randomCell.textContent = strength;
            randomCell.style.color = 'red';
            randomCell.style.fontWeight = 'bold';

            placed++;
        }
    }
}

// Spuštění hry
initGame();