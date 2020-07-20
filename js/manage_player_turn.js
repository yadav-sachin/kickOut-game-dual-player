function togglePlayerTurn() {
    $('.player_' + currPlayer + '_turn').removeClass('active_player');
    let currPlayer = localStorage.getItem('currPlayer');
    if (currPlayer == 1)
        currPlayer = 2;
    else currPlayer = 1;
    localStorage.setItem('currPlayer', currPlayer);
    $('.player_' + currPlayer + '_turn').addClass('active_player');
}

function showPredictedWinner(winner) {
    $('.predicted_winner').removeClass('predicted_winner');
    $('.player_' + winner + '_win').addClass('predicted_winner');
}


$(() => {
    $('#restartBtn').click(() => window.location.href = "/html/create_game.html");
})