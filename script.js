const rows = 10;
const cols = 10;
const boardElement = document.getElementById('game-board');
const hpElement = document.getElementById('hp-display');
const resetBtn = document.getElementById('reset-btn');

// pole na ukladani divu
let allCells = [];
let hp = 10;

function initGame() {
    boardElement.innerHTML = '';
    boardElement.style.gridTemplateColumns = `repeat(${cols}, 30px)`;
    allCells = [];
    hp = 10; // reset hp
    hpElement.textContent = hp;

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

            //kliknuti
            cell.addEventListener('click', function() {
                // pokud je odhaleny nebo 0 hp, tak nic
                if (cell.classList.contains('revealed') || cell.classList.contains('flagged') || hp <= 0) return;

                cell.classList.add('revealed');

                if (cell.dataset.isMine === "true") {
                    // minus zivoty
                    let damage = parseInt(cell.dataset.strength);
                    hp -= damage;
                    hpElement.textContent = hp; //aktualizace ukazatelu

                    cell.classList.add('mine'); // zmena pozadi

                    // Kontrola konce hry
                    if (hp <= 0) {
                        hpElement.textContent = "0"; // Abychom neukazovali do mínusu
                        setTimeout(() => alert("Konec hry! Došly ti životy."), 10);
                    }
                } else {
                    // Není to mina (později sem přidáme výpočet okolí)
                    cell.style.backgroundColor = 'lightgreen'; // Jen prozatím obarvíme bezpečné pole
                }
            });

            // right click pro vlajecky
            cell.addEventListener('contextmenu', function(e) {
                e.preventDefault(); // zabrani defaultnimu menu

                if (cell.classList.contains('revealed') || hp <= 0) return;

                // prepinani stavu
                if (cell.classList.contains('flagged')) {
                    cell.classList.remove('flagged');
                    cell.textContent = ''; //smaze vlajku

                } else {
                    cell.classList.add('flagged');
                    cell.textContent = '🚩'; // Vloží emoji
                }
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


initGame(); // prvni nacteni
resetBtn.addEventListener('click', initGame); // tlacitko rest