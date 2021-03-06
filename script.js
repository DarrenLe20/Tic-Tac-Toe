// Player factory 
const Player = (name, marker) => {
    return {
        name, 
        marker
    };
}
// Computer factory
const Computer = ((name, marker) => {
    function makeMove() {

    }

    return {
        name,
        marker,
    };
})
// Game Board
const Board = (() => {
    let mode = 0;

    let container = document.querySelector('.container');
    let allSlots = document.querySelectorAll(".slot");

    // Reset 
    const resetbtn = document.querySelector('#reset');
    let children = container.children;
    resetbtn.addEventListener('click', () => {
        // Reload the document
        location.reload();
    })

    // Create the game board
    let board = [0, 1, 2, 3, 4, 5, 6, 7, 8]; 
    const og_board = [0, 1, 2, 3, 4, 5, 6, 7, 8]; 
    for (i = 0; i < 9; i ++) {
        const slot = document.createElement('div');
        slot.classList.add('slot');
        slot.setAttribute('id', i);
        container.appendChild(slot);
    }

    console.log(mode)
    // 2 - player mode 
    
    if (mode == 0){
        allSlots = document.querySelectorAll(".slot");
        allSlots.forEach(slot => slot.addEventListener('click', () => {
            board[slot.id] = Game.active.marker;
            slot.setAttribute('id', Game.active.marker);
            slot.textContent = Game.active.marker;
            // Remove event marker 
            slot.style.pointerEvents = 'none';
            Game.remaining -= 1;
            // If the board is not filled up, check for a winner
            if (Game.remaining > 0) {
                Game.gameOver();
                // Remove all event listeners if a winner is found
                if (Game.winner != 0) {
                    allSlots.forEach(slot => slot.style.pointerEvents = 'none');
                } else {
                    Game.nextPlayer_human();
                }
            } else if (Game.remaining == 0) {
                Game.gameOver();
                if (Game.winner != 0) {
                    allSlots.forEach(slot => slot.style.pointerEvents = 'none');
                } else {
                    Game.tie();
                }
            }
        }))
    } /*else  if (mode == 1) {
        let arr = og_board;
        console.log(arr)
        allSlots = document.querySelectorAll(".slot");
        allSlots.forEach(slot => slot.addEventListener('click', () => {
            // Remove from arr
            let k = arr.indexOf(og_board[slot.id]);
            arr.splice(k, 1);
            console.log("arr " + arr)
            // Change board values
            board[slot.id] = Game.active.marker;
            slot.setAttribute('id', Game.active.marker);
            slot.textContent = Game.active.marker;
            // Remove event marker 
            slot.style.pointerEvents = 'none';
            Game.remaining -= 1;
            console.log("Remaining: " + Game.remaining);
            console.log(Game.active.name)
            // Computer algorithm
            if (Game.active == Game.comp) {
                console.log("AI")
                // Use arr to generate a move for the AI
                let pos = arr[Math.floor(Math.random() * arr.length)];
                console.log(pos)
                let move = board.indexOf(pos)
                board[move] = Game.active.marker;
                console.log(board)
                slot.setAttribute('id', Game.active.marker);
                slot.textContent = Game.active.marker;
                // Remove event marker 
                slot.style.pointerEvents = 'none';
                Game.remaining -= 1;
                console.log("Remaining: " + Game.remaining);
                console.log(Game.active.name)
            }
            // Check win / Move on 
            if (Game.remaining > 0) {
                Game.gameOver();
                // Remove all event listeners if a winner is found
                if (Game.winner != 0) {
                    allSlots.forEach(slot => slot.style.pointerEvents = 'none');
                } else {
                    Game.nextPlayer_AI();
                }
            } else if (Game.remaining == 0) {
                Game.gameOver();
                if (Game.winner != 0) {
                    allSlots.forEach(slot => slot.style.pointerEvents = 'none');
                } else {
                    Game.tie();
                }
            }
        }))
    }*/

    

    return {board, mode};
})();

const Game = (() => {
    const announcement = document.querySelector('.Instruct');
    // Create players 
    const playerOne = Player('Player 1', 'X');
    const playerTwo = Player('Player 2', 'O');
    const comp = Computer('Computer', 'A')
    const name1 = playerOne.name
    const name2 = playerTwo.name
    const name3 = comp.name;
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
                }
                else if (this.active === comp) {
                    announcement.textContent =  this.active.name + " WINS!"
                    console.log("Computer won");
                } else {
                    announcement.textContent = this.active.name + " WINS!"
                    console.log("Player 2 won");
                }
                this.winner = 1;
            }
            console.log("Winner " + this.winner);
        }
    }

    function nextPlayer_human() {
        if (this.active === playerOne) {
            announcement.textContent =  name2 + " make your move!";
            this.active = playerTwo;
        } else {
            this.active = playerOne;
            announcement.textContent =  name1 + " make your move!";
        }
        console.log('active player: ' + this.active.name);
    }

    function nextPlayer_AI() {
        if (this.active === playerOne) {
            this.active = comp;
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
        nextPlayer_human,
        nextPlayer_AI,
        tie,
        active,
        winner,
        remaining,
        comp
    };
})();

