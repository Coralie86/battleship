import "./styles.css";
import { Player } from "./player";
import { GameUI } from "./gameui";


class GameController{
    playerPlaceholder = document.querySelector("#playerName");

    constructor(){

        this.player1 = new Player(prompt("Name Player 1?"), 'real');
        this.player2 = new Player(prompt("Name Player 2?"), 'real');

        this.turn = this.player1.name;
        this.playerPlaceholder.textContent = this.turn;
        this.handleTurn = this.handleTurn.bind(this);

        this.game = new GameUI();
        this.game.initGrid();

        this.startGame();

        this.game.setAttackHandler(this.handleTurn)

    }

    startGame(){

        this.defaultShipPlacement(this.player1.playerGameboard)
        this.defaultShipPlacement(this.player2.playerGameboard)

        this.game.renderPlayer1Board(this.player1.playerGameboard)
        this.game.renderPlayer2Board(this.player2.playerGameboard)
    }

    defaultShipPlacement(gameboard){
    gameboard.placeShip(['A',1], ['C',1]);
    gameboard.placeShip(['H',1], ['H',1]);
    gameboard.placeShip(['I',3], ['I',3]);
    gameboard.placeShip(['D',5], ['E',5]);
    gameboard.placeShip(['G',6], ['J',6]);
    gameboard.placeShip(['A',7], ['A',7]);
    gameboard.placeShip(['D',7], ['D',8]);
    gameboard.placeShip(['G',8], ['I',8]);
    gameboard.placeShip(['A',9], ['B',9]);
    gameboard.placeShip(['I',10], ['I',10]);
    console.log(gameboard.shipList)
    }

    playerAttack(player,opponent, row,col){
        player.attack(opponent.playerGameboard, col, row)

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

    handleTurn(row, col){
        if(this.turn === this.player1.name){
            this.playerAttack(this.player1, this.player2, row,col)
        } else if(this.turn === this.player2.name){
            this.playerAttack(this.player2, this.player1, row,col)
        }
    }
}


new GameController()




