let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

let currentPlayer = 'circle';

function init(){
    render();
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return pattern; // Gewinnmuster gefunden
        }
    }

    return null; // Kein Gewinnmuster gefunden
}

function drawWinLine(winner) {
    if (winner) {
        const container = document.getElementById('container');
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.style.position = 'absolute';
        svg.style.zIndex = '1';

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', '0');
        line.setAttribute('y1', '0');
        line.setAttribute('x2', '100%');
        line.setAttribute('y2', '100%');
        line.setAttribute('stroke', 'white');
        line.setAttribute('stroke-width', '10');
        svg.appendChild(line);

        container.appendChild(svg);
    }
}


function handleClick(cell, index) {
    if (fields[index] === null) {
        // Füge abwechselnd 'circle' oder 'cross' in das Array ein
        fields[index] = currentPlayer;

        // Wechsle den Spieler für den nächsten Zug
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';

        // Füge das entsprechende SVG in das angeklickte <td>-Element ein
        if (fields[index] === 'circle') {
            cell.innerHTML = generateAnimatedCircleSVG();
        } else if (fields[index] === 'cross') {
            cell.innerHTML = generateAnimatedCrossSVG();
        }

        // Entferne die onclick-Funktion vom <td>-Element
        cell.onclick = null;

        // Überprüfe, ob das Spiel vorbei ist
        const winPattern = checkWin();
        if (winPattern) {
            drawWinLine(winPattern);
        }

    }
}

function render() {
    const container = document.getElementById('container');
    const table = document.createElement('table');

    for (let i = 0; i < 3; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('td');
            const index = i * 3 + j;

            // Füge die onclick-Funktion für jedes <td>-Element hinzu
            cell.onclick = function () {
                handleClick(cell, index);
            };

            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    container.innerHTML = '';
    container.appendChild(table);
}


function generateAnimatedCircleSVG() {
    const svgText = `
        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#00B0EF" stroke-width="10" stroke-dasharray="251.2" stroke-dashoffset="251.2">
                <animate attributeName="stroke-dashoffset" from="251.2" to="0" dur="500ms" begin="0s" fill="freeze" />
            </circle>
        </svg>
    `;
    return svgText;
}

function generateAnimatedCrossSVG() {
    const svgText = `
        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 100 100">
            <line x1="20" y1="20" x2="80" y2="80" stroke="#FFC000" stroke-width="10">
                <animate attributeName="x2" from="20" to="80" dur="500ms" begin="0s" fill="freeze" />
                <animate attributeName="y2" from="20" to="80" dur="500ms" begin="0s" fill="freeze" />
            </line>
            <line x1="80" y1="20" x2="20" y2="80" stroke="#FFC000" stroke-width="10">
                <animate attributeName="x2" from="80" to="20" dur="500ms" begin="0s" fill="freeze" />
                <animate attributeName="y2" from="20" to="80" dur="500ms" begin="0s" fill="freeze" />
            </line>
        </svg>
    `;
    return svgText;
}

function restartGame(){
    fields = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
    ];
    init();
}