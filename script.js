let fields = [
   null, 
   null, 
   null, 
   null, 
   null, 
   null, 
   null,
   null,
   null
];

function init(){
   render();
}



function generateCircleSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <circle 
                cx="35" 
                cy="35" 
                r="30" 
                stroke="#00BDEF" 
                stroke-width="5" 
                fill="none"
                stroke-dasharray="188.4" 
                stroke-dashoffset="188.4"
            >
                <animate 
                    attributeName="stroke-dashoffset" 
                    from="188.4" 
                    to="0" 
                    dur="500ms" 
                    fill="freeze" 
                />
            </circle>
        </svg>
    `;
}

function generateCrossSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="10" x2="60" y2="60" stroke="red" stroke-width="5">
                <animate attributeName="x2" from="10" to="60" dur="500ms" fill="freeze" />
                <animate attributeName="y2" from="10" to="60" dur="500ms" fill="freeze" />
            </line>
            <line x1="60" y1="10" x2="10" y2="60" stroke="red" stroke-width="5">
                <animate attributeName="x2" from="60" to="10" dur="500ms" fill="freeze" />
                <animate attributeName="y2" from="10" to="60" dur="500ms" fill="freeze" />
            </line>
        </svg>
    `;
}
const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6], // diagonal
];
let currentPlayer = 'circle';

function drawWinningLine(combination) {
    const lineColor = '#ffffff';
    const lineWidth = 5;

 const startCell = document.querySelectorAll(`td`)[combination[0]];
    const endCell = document.querySelectorAll(`td`)[combination[2]];
    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();

    const contentRect = document.getElementById('content').getBoundingClientRect();

    const lineLength = Math.sqrt(
        Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2)
    );
    const lineAngle = Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left);
    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.width = `${lineLength}px`;
    line.style.height = `${lineWidth}px`;
    line.style.backgroundColor = lineColor;
    line.style.top = `${startRect.top + startRect.height / 2 - lineWidth / 2 - contentRect.top}px`;
    line.style.left = `${startRect.left + startRect.width / 2 - contentRect.left}px`;
    line.style.transform = `rotate(${lineAngle}rad)`;
    line.style.transformOrigin = `top left`;
    document.getElementById('content').appendChild(line);
}

function updateStatus(winner = null) {
    const statusDiv = document.getElementById('status');
    if (winner) {
        statusDiv.textContent = `${winner === 'circle' ? 'Spieler O Kreis' : 'Spieler X Kreuz'} hat gewonnen!`;
    } else if (fields.every((field) => field !== null)) {
        statusDiv.textContent = 'Unentschieden!';
    } else {
        statusDiv.textContent = `Spieler ${currentPlayer === 'circle' ? 'O' : 'X'} ist am Zug`;
    }
}

function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function handleCellClick(index, cell) {
    if (fields[index] === null) {
        fields[index] = currentPlayer;

        cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
        cell.onclick = null;

        const winCombination = getWinningCombination();
        if (winCombination) {
            drawWinningLine(winCombination);
            updateStatus(currentPlayer);
            triggerConfetti(); 
        } else if (fields.every((field) => field !== null)) {
            updateStatus(); // Unentschieden
        } else {
            currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
            updateStatus(); // Nächster Spieler
        }
    }
}

function isGameFinished() {
    return fields.every((field) => field !== null) || getWinningCombination() !== null;
}
function getWinningCombination() {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
        const [a, b, c] = WINNING_COMBINATIONS[i];
        if (fields[a] === fields[b] && fields[b] === fields[c] && fields[a] !== null) {
            return WINNING_COMBINATIONS[i];
        }
    }
    return null;
}

function render() {
    let tableHTML = '<table>';

    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>'; 
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j; 
            const value = fields[index]; 

            let cellContent = '';
            if (value === 'circle') cellContent = generateCircleSVG();
            if (value === 'cross') cellContent = generateCrossSVG();

            tableHTML += `<td onclick="handleCellClick(${index}, this)">${cellContent}</td>`;
        }
        tableHTML += '</tr>'; 
    }

    tableHTML += '</table>'; 

    document.getElementById('content').innerHTML = tableHTML;
}

function startNewGame(){
    fields = [
        null, 
        null, 
        null, 
        null, 
        null, 
        null, 
        null,
        null,
        null
     ];

    render();
}