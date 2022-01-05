// Player factory 
const Player = (name, marker) => {
    return {
        name, 
        marker
    };
}
// Game Board
const Board = (() => {
    // Reset 
    resetbtn = document.querySelector('#reset');
    // Create the game board
    let board = [0, 1, 2, 3, 4, 5, 6, 7, 8]; 
    const container = document.querySelector('.container');
    for (i = 0; i < 9; i ++) {
        const slot = document.createElement('div');
        //slot.textContent = i;
        slot.classList.add('slot');
        slot.setAttribute('id', i);
        container.appendChild(slot);
    }

    const allSlots = document.querySelectorAll(".slot");
    allSlots.forEach(slot => slot.addEventListener('click', () => {
        board[slot.id] = Game.active.marker;
        slot.setAttribute('id', Game.active.marker);
        slot.textContent = Game.active.marker;
        console.log(board);
        // Remove event marker 
        slot.style.pointerEvents = 'none';
        Game.remaining -= 1;
        console.log("remaining: " + Game.remaining)
        if (Game.remaining > 0) {
            Game.gameOver();
            // Remove all event listeners if a winner is found
            if (Game.winner != 0) {
                allSlots.forEach(slot => slot.style.pointerEvents = 'none');
            } else {
                Game.nextPlayer();
            }
        } else if (Game.remaining == 0) {
            Game.tie();
        }
    }))

    

    return {board};
})();

const Game = (() => {
    const announcement = document.querySelector('.Instruct');
    // Create players 
    const playerOne = Player('Player 1', 'X');
    const name1 = playerOne.name
    const playerTwo = Player('Player 2', 'O');
    const name2 = playerTwo.name
    // Variables
    let active = playerOne;
    let remaining = 9;
    let winner = 0;
    const winCondition = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    function gameOver() {
        for (i = 0; i < 8; i ++) {
            if (Board.board[winCondition[i][0]] === this.active.marker && Board.board[winCondition[i][1]] === this.active.marker
                && Board.board[winCondition[i][2]] === this.active.marker){
                if (this.active === playerOne) {
                    announcement.textContent =  this.active.name + " WINS!"
                    console.log("Player 1 won");
                } else {
                    announcement.textContent = this.active.name + " WINS!"
                    console.log("Player 2 won");
                }
                this.winner = 1;
                console.log("Winner" + this.winner);
            }
        }
    }

    function nextPlayer() {
        if (this.active === playerOne) {
            announcement.textContent =  name2 + " make your move!";
            this.active = playerTwo;
        } else {
            this.active = playerOne;
            announcement.textContent =  name1 + " make your move!";
        }
        console.log('active player: ' + this.active.name);
    }

    function tie() {
        announcement.textContent = "IT'S A TIE";
    }

    return {
        gameOver,
        nextPlayer,
        tie,
        active,
        winner,
        remaining
    };
})();
