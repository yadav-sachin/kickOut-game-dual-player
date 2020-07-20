let currPlayer = localStorage.getItem('currPlayer');
let predictedWinner = 1;

let numRows = parseInt(localStorage.getItem('numRows'));
let numCols = parseInt(localStorage.getItem('numCols'));
let numTokens = parseInt(localStorage.getItem('numTokens'));
console.log(numCols, numRows, numTokens);
let clrs = ['black', 'blue', 'red'];
let player1 = localStorage.getItem('player1');
let player2 = localStorage.getItem('player2');

//This setups the board grid
let piece_dimension = 60;
data = [];
data = localStorage.getItem('data');
data = JSON.parse(data);

function placeGamePiece(data, i, j, clr, $cell) {

    if (data[i - 1][j - 1][clr] > 0) {
        $cell.append(
            `<div class="${clr}_piece game_piece">
            <svg width="${piece_dimension}" height="${piece_dimension}">
            <circle cx="${piece_dimension / 2}" cy="${piece_dimension / 2}" r="${piece_dimension / 2.5}" fill="${clr}" />
            <text x="50%" y="50%" text-anchor="middle" fill="white" font-size="${piece_dimension / 1.5}px" font-family="Arial" dy=".3em">${data[i - 1][j - 1][clr]}</text>
            </svg>
        </div>`
        );
    }
}

function setPieces() {
    for (let i = 1; i <= numRows; ++i)
        for (let j = 1; j <= numCols; ++j) {
            $cell = $('#' + i + '_' + j);
            $cell.empty();
            placeGamePiece(data, i, j, "black", $cell);
            placeGamePiece(data, i, j, "blue", $cell);
            placeGamePiece(data, i, j, "red", $cell);
        }
}

function constructGrid() {
    $board = $('#board');
    $board.css('grid-template-columns', `repeat(${numCols + 1}, auto)`);
    for (let j = 0; j <= numCols; ++j) {
        $board.append(
            `<div class="out_cell" id="0_${j}"></div>`
        );
    }
    for (let i = 1; i <= numRows; ++i) {
        $board.append(
            `<div class="out_cell" id="${i}_0"></div>`
        )
        for (let j = 1; j <= numCols; ++j)
            $board.append(
                `<div class="cell" id="${i}_${j}"></div>`
            )
    }
}

$(function () {
    //removing the top and left borders for removal
    constructGrid();
    for (let j = 1; j <= numCols; ++j)
        $('#1_' + j).addClass('top_cell');
    for (let i = 1; i <= numRows; ++i)
        $('#' + i + '_1').addClass('left_cell');
    //Then set the pieces on the board
    setPieces();
    callWinPredictor();
    $('.player_1_turn').text(`${player1} Turn`);
    $('.player_2_turn').text(`${player2} Turn`);
    $('.player_1_win').text(`${player1} will Win`);
    $('.player_2_win').text(`${player2} will Win`);
});

function deleteGamePiece(i, j, selectedPieceColor) {
    data[i - 1][j - 1][selectedPieceColor] -= 1;
    localStorage.setItem('data', JSON.stringify(data));
}

function addGamePiece(i, j, selectedPieceColor) {
    if (i > 0 && j > 0) {
        data[i - 1][j - 1][selectedPieceColor] += 1;
        localStorage.setItem('data', JSON.stringify(data));
    }
    else {
        --numTokens;
        localStorage.setItem('numTokens', numTokens);
    }
    if (numTokens == 0)
        declareWinner(currPlayer);
    setPieces();
    togglePlayerTurn();
    callWinPredictor();
}

function callWinPredictor() {
    predictWinner(data, currPlayer, numRows, numCols)
        .then((winner) => { predictedWinner = winner; showPredictedWinner(winner); console.log(currPlayer, predictedWinner); })
        .catch((err) => { console.error(err); });
}

function declareWinner(currPlayer) {
    if (currPlayer == 1)
        alert(player1 + ' Won the Game');
    else 
        alert(player2 + 'Won the Game');
    window.location.href = "/html/create_game.html";
}


