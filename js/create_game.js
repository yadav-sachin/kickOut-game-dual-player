function setGameTokens(numRows, numCols, numTokens) {
    let data = [];
    let clrs = ['black', 'blue', 'red'];
    for (let i = 1; i <= numRows; ++i) {
        col_data = [];
        for (let j = 1; j <= numCols; ++j) {
            col_data.push({
                black: 0,
                blue: 0,
                red: 0
            });
        }
        data.push(col_data);
    }
    localStorage.setItem('currPlayer', 1);
    for (let i = 1; i <= numTokens; ++i) {
        let x = Math.floor(Math.random() * numRows) + 1, y = Math.floor(Math.random() * numCols) + 1, clr = Math.floor(Math.random() * 3) + 1;
        console.log(x, y, clr);
        data[x - 1][y - 1][clrs[clr - 1]] += 1;
    }
    localStorage.setItem('data', JSON.stringify(data));
}


$(() => {
    $player1Name = $('#player1');
    $player2Name = $('#player2');
    $numRows = $('#numRows');
    $numCols = $('#numCols');
    $numTokens = $('#numTokens');

    $createBtn = $('#createBtn');
    $createBtn.click(() => {
        let numRows = $numRows.val(), numCols = $numCols.val(), numTokens = $numTokens.val();
        localStorage.setItem('numRows', $numRows.val());
        localStorage.setItem('numCols', $numCols.val());
        localStorage.setItem('numTokens', $numTokens.val());
        localStorage.setItem('player1', $player1Name.val());
        localStorage.setItem('player2', $player2Name.val());
        localStorage.removeItem('data');
        setGameTokens(numRows, numCols, numTokens);
        window.location.href = "/html/game.html";
    });
});