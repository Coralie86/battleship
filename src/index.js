import "./styles.css";
import { Player } from "./player";
import { GameUI } from "./gameui";


class GameController{
    
    constructor(){
        this.player1 = null;
        this.player2 = null;
        this.turn = null;
        this.playerPlaceholder = null;

        this.game = new GameUI();

        this.nextGame = this.nextGame.bind(this);
        this.game.setNextHandler(this.nextGame);

        this.startGame = this.startGame.bind(this);
        this.game.setStartHandler(this.startGame);

        this.handleTurn = this.handleTurn.bind(this);
        this.game.setAttackHandler(this.handleTurn);

        this.dropHandler = this.dropHandler.bind(this);
        this.game.setDropHandler(this.dropHandler);

        this.resetGame = this.resetGame.bind(this);
        this.game.setResetHandler(this.resetGame);

    }

    nextGame(){
        let players = this.game.playerName();
        this.player1 = new Player(players.player1.name, players.player1.type);
        this.player2 = new Player(players.player2.name, players.player2.type);

        this.game.initGrid();
        this.playerPlaceholder = document.querySelector("#playerName");

        this.turn = this.player1.name;
        this.playerPlaceholder.textContent = this.turn;
        
        this.defaultShipPlacement(this.player1.playerGameboard)
        this.defaultShipPlacement(this.player2.playerGameboard)

        this.game.renderPlayer1Board(this.player1.playerGameboard)
        this.game.renderPlayer2Board(this.player2.playerGameboard)

        this.game.dragAllShip();
    }

    startGame(){
        if((this.turn === this.player1.name) && (this.player2.name !== "computer")){
            this.turn = this.player2.name;
            this.game.renderPlayer1Board(this.player2.playerGameboard);
            this.playerPlaceholder.textContent = "Player2 position your ships";

            this.game.dragAllShip();
            console.log("first case")
        } else {
            this.turn = this.player1.name;
            this.game.renderPlayer1Board(this.player1.playerGameboard);

            const startBtn = document.querySelector("#startGame");
            startBtn.style.display = 'none';

            this.game.player2Grid.style.display = 'block';
            this.game.renderPlayer2Board(this.player2.playerGameboard);

            const resetBtn = document.querySelector("#resetBtn");
            resetBtn.style.display = 'block';
            console.log("second case")
        }
    }

    resetGame(){
        this.game.emptyGrid();

        this.game.resetBtn.style.display = 'none';
        this.game.player2Grid.style.display = 'none';        

        this.nextGame();
    }

    defaultShipPlacement(gameboard){
        gameboard.placeShip([0, 0], 3, 'horizontal');
        gameboard.placeShip([0, 7], 1, 'horizontal');
        gameboard.placeShip([2, 8], 1, 'horizontal');
        gameboard.placeShip([4, 3], 2, 'horizontal');
        gameboard.placeShip([5, 6], 4, 'horizontal');
        gameboard.placeShip([6, 0], 1, 'horizontal');
        gameboard.placeShip([6, 3], 2, 'vertical');
        gameboard.placeShip([7, 6], 2, 'horizontal');
        gameboard.placeShip([8, 0], 2, 'horizontal');
        gameboard.placeShip([9, 8], 1, 'horizontal');
    }

    playerAttack(player,opponent, row,col){
        player.attack(opponent.playerGameboard, row, col)

        if(opponent.playerGameboard.shipStatus()){
            this.playerPlaceholder.textContent = this.turn + " WINNER";
            return
        }

        // after attack we show opponent view
        // if(opponent.password === prompt(`Password ${opponent.name}`)){
            this.game.renderPlayer1Board(opponent.playerGameboard)
            this.game.renderPlayer2Board(player.playerGameboard)

            this.turn = opponent.name;
            this.playerPlaceholder.textContent = this.turn;
        // }
    }

    playWithComputer(player, opponent, row, col){

        player.attack(opponent.playerGameboard, row, col)
        this.game.renderPlayer2Board(opponent.playerGameboard)

        if(opponent.playerGameboard.shipStatus()){
            this.playerPlaceholder.textContent = this.turn + " WINNER";
            return
        }

        opponent.randomAttack(player.playerGameboard)
        this.game.renderPlayer1Board(player.playerGameboard)        

        if(opponent.playerGameboard.shipStatus()){
            this.playerPlaceholder.textContent = this.turn + " WINNER";
            return
        }       
        
    }

    handleTurn(row, col){
        if(this.player2.name !== 'computer'){
            if(this.turn === this.player1.name){
                this.playerAttack(this.player1, this.player2, row,col)
            } else if(this.turn === this.player2.name){
                this.playerAttack(this.player2, this.player1, row,col)
            }
        } else {
            this.playWithComputer(this.player1, this.player2, row, col);
        }
        
    }

    dropHandler(ev) {
        ev.preventDefault();
        const data = ev.dataTransfer.getData("text");
        const newStartRow = Number(ev.target.getAttribute('row'));
        const newStartCol = Number(ev.target.getAttribute('col'));
        let currentPlayer = null;
        
        if(this.turn === this.player1.name){
            currentPlayer = this.player1;
        } else {
            currentPlayer = this.player2;
        }
        
        const currentShipList = currentPlayer.playerGameboard.shipList
        const shipMoved = currentShipList.find((item) => item.id == data);
        
        currentPlayer.playerGameboard.removeShip(data);

        currentPlayer.playerGameboard.placeShip([newStartRow, newStartCol], shipMoved.ship.length, shipMoved.ship.direction)
        
        ev.target.appendChild(document.getElementById(data));
        this.game.renderPlayer1Board(currentPlayer.playerGameboard);
        this.game.dragAllShip();
    }
}


new GameController()




