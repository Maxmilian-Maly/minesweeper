<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <title>Maxsweeper</title>
    <link href="stylovac.css" rel="stylesheet">
    <script src="script.js" defer></script> <!-- defer to aktivuje hned, ne az se docte celej soubor -->
</head>
<body>

<h1>Minesweeper</h1>
<h2>Životy: <span id="hp-display">10</span></h2>
<!-- tady to bude spawnovat policka -->
<div id="game-board"></div>
<button id="reset-btn">Hrát znovu</button>

<div id="instructions">
    <h3>Jak hrát</h3>
    <p><strong>Cíl hry:</strong> Odkryj všechna bezpečná políčka dřív, než ti dojdou životy.</p>
    <p><strong>Miny a životy:</strong> Na mapě jsou ukryté miny o různé síle (1, 3 nebo 5). Pokud na minu klikneš, neprohráváš okamžitě, ale přijdeš o daný počet životů.</p>
    <p><strong>Nápověda (Čísla):</strong> Každé bezpečné políčko ukazuje dvě čísla. První <strong style="color: #5a189a;">počet min</strong> v okolních 8 políčkách. Druhá <strong style="color: #e63946;">celkovou sílu</strong> těchto okolních min.</p>    <p><strong>Ovládání:</strong> Levé tlačítko myši odkrývá pole. Pravé tlačítko přidává vlaječku (🚩) pro označení miny.</p>
</div>

</body>
</html>

<?php
?>