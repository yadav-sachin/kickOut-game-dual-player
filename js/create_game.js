$(() => {
    $player1Name = $('#player1');
    $player2Name = $('#player2');
    $numRows = $('#numRows');
    $numCols = $('#numCols');
    $numTokens = $('#numTokens');

    $createBtn = $('#createBtn');
    $createBtn.click(() => {
        localStorage.setItem('numRows', $numRows.val());
        localStorage.setItem('numCols', $numCols.val());
        localStorage.setItem('numTokens', $numTokens.val());
        localStorage.setItem('player1', $player1Name.val());
        localStorage.setItem('player2', $player2Name.val());
        localStorage.removeItem('data');
        window.location.href = "/html/game.html";
    });
});