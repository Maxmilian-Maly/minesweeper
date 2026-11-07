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
    boardElement.style.gridTemplateColumns = `repeat(${cols}, 45px)`;
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
                        hpElement.textContent = "0";
                        setTimeout(() => alert("Konec hry! Došly ti životy."), 10); // opozdene da alert
                    }
                } else {
                    // neni to mina - vypocet okoli
                    cell.style.backgroundColor = 'lightgreen';

                    let currentRow = parseInt(cell.dataset.row);
                    let currentCol = parseInt(cell.dataset.col);
                    let mineCount = 0;
                    let strengthSum = 0; // promenna pro celkovou silu

                    // prochazeni 8 sousedu
                    for (let rOffset = -1; rOffset <= 1; rOffset++) {
                        for (let cOffset = -1; cOffset <= 1; cOffset++) {
                            let checkRow = currentRow + rOffset;
                            let checkCol = currentCol + cOffset;

                            // kontrola, zda soused nevybocuje z hraci plochy
                            if (checkRow >= 0 && checkRow < rows && checkCol >= 0 && checkCol < cols) {
                                let neighborIndex = checkRow * cols + checkCol;
                                let neighborCell = allCells[neighborIndex];

                                // pokud ma soused minu, zvedneme pocitadlo a pricteme silu
                                if (neighborCell.dataset.isMine === "true") {
                                    mineCount++;
                                    // vycteni sily miny z atributu a pricteni k celkove sume
                                    strengthSum += parseInt(neighborCell.dataset.strength);
                                }
                            }
                        }
                    }

                    // vypis obou hodnot na policko
                    cell.innerHTML = `<span style="color: purple; font-weight: bold;">${mineCount}</span>|<span style="color: red; font-weight: bold;">${strengthSum}</span>`;
                    cell.style.fontSize = "16px";

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
// random placement
function placeMines(strength, count) {
    let placed = 0;
    while (placed < count) {
        // vyber random bunky
        let randomIndex = Math.floor(Math.random() * allCells.length);
        let randomCell = allCells[randomIndex];

        // kontrola jestli uz nema minu
        if (randomCell.dataset.isMine === "false") {
            // prepsani atributu
            randomCell.dataset.isMine = "true";
            randomCell.dataset.strength = strength;

            placed++;
        }
    }
}


initGame(); // prvni nacteni
resetBtn.addEventListener('click', initGame); // tlacitko rest