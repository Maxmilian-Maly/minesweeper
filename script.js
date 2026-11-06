const rows = 10;
const cols = 10;
const boardElement = document.getElementById('game-board');

// Zde si budeme ukládat všechny vytvořené HTML elementy (divy),
// abychom z nich mohli snadno náhodně vybírat
let allCells = [];

function initGame() {
    boardElement.innerHTML = '';
    boardElement.style.gridTemplateColumns = `repeat(${cols}, 30px)`;
    allCells = [];

    // 1. Vytvoření HTML buněk a jejich nastavení
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            // Nastavíme výchozí data atributy přímo do HTML
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.dataset.isMine = "false";
            cell.dataset.strength = "0";

            // Přidáme klikací událost (zatím jen výpis)
            cell.addEventListener('click', function() {
                console.log(`Klik: Řádek ${cell.dataset.row}, Sloupec ${cell.dataset.col} | Mina: ${cell.dataset.isMine} | Síla: ${cell.dataset.strength}`);
            });

            boardElement.appendChild(cell);
            allCells.push(cell); // Přidáme element do našeho seznamu
        }
    }

    // 2. Rozmístění min (síla, počet)
    placeMines(1, 7);
    placeMines(3, 5);
    placeMines(5, 4);
}

// Funkce pro náhodné rozmístění min na HTML elementy
function placeMines(strength, count) {
    let placed = 0;
    while (placed < count) {
        // Vybereme náhodný index ze všech buněk (0 až 99)
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