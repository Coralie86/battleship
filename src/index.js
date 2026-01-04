import "./styles.css";
import { Player } from "./player";
import { GameUI } from "./gameui";


class GameController{
    
    constructor(){
        this.player1 = null;
        this.player2 = null;
        this.turn = null;

        this.game = new GameUI();

        this.nextGame = this.nextGame.bind(this);
        this.game.setNextHandler(this.nextGame);

        this.startGame = this.startGame.bind(this);
        this.game.setStartHandler(this.startGame);

        this.handleTurn = this.handleTurn.bind(this);
        this.game.setAttackHandler(this.handleTurn);

        this.dropHandler = this.dropHandler.bind(this);
        this.game.setDropHandler(this.dropHandler);

        this.game.setResetHandler(this.nextGame);

        this.rotateHandler = this.rotateHandler.bind(this);
        this.game.setRotateHandler(this.rotateHandler);
    }

    nextGame(){
        let players = this.game.playerName();
        if(players.player2.name === ""){
            players.player2 = {"name":'computer', "type": "computer"};
        }
        this.player1 = new Player(players.player1.name, players.player1.type);
        this.player2 = new Player(players.player2.name, players.player2.type);
        

        this.game.initGrid();

        this.turn = this.player1.name;
        this.game.playerPlaceholderUpdate(this.turn + " place your ships. Click on the ship to change the orientation.");
        
        this.defaultShipPlacement(this.player1.playerGameboard)
        this.defaultShipPlacement(this.player2.playerGameboard)

        this.game.renderPlayer1Board(this.player1.playerGameboard, true)
        this.game.renderPlayer2Board(this.player2.playerGameboard, false)
    }

    startGame(){
        this.game.errorMessageUpdate("");
        if((this.turn === this.player1.name) && (this.player2.name !== "computer")){
            this.turn = this.player2.name;

            this.game.renderPlayer1Board(this.player2.playerGameboard, true);
            this.game.playerPlaceholderUpdate(this.turn + " place your ships. Click on the ship to change the orientation.")
        } else {
            this.turn = this.player1.name;
            this.game.playerPlaceholderUpdate(this.turn + ", your turn.");
            this.game.renderPlayer1Board(this.player1.playerGameboard, false);
            this.game.renderPlayer2Board(this.player2.playerGameboard, false);

            this.game.inGameState();
        }
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
            this.game.playerPlaceholderUpdate(this.turn + " WINNER");
            return
        }

        // after attack we show opponent view
        if(opponent.password === prompt(`Password ${opponent.name}`)){
            this.game.renderPlayer1Board(opponent.playerGameboard, false)
            this.game.renderPlayer2Board(player.playerGameboard, false)

            this.turn = opponent.name;
            this.game.playerPlaceholderUpdate(this.turn + ", your turn.");
        }
    }

    playWithComputer(player, opponent, row, col){

        player.attack(opponent.playerGameboard, row, col)
        this.game.renderPlayer2Board(opponent.playerGameboard, false)

        if(opponent.playerGameboard.shipStatus()){
            this.game.playerPlaceholderUpdate(this.turn + " WINNER");
            return
        }

        opponent.randomAttack(player.playerGameboard)
        this.game.renderPlayer1Board(player.playerGameboard, false)        

        if(opponent.playerGameboard.shipStatus()){
            this.game.playerPlaceholderUpdate(this.turn + " WINNER");
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

        try{
            currentPlayer.playerGameboard.placeShip([newStartRow, newStartCol], shipMoved.ship.length, shipMoved.ship.direction);
            this.game.errorMessageUpdate("");
        } catch(e) {
            this.game.errorMessageUpdate(e.message);
            return 
        }
        
        currentPlayer.playerGameboard.removeShip(data);
        
        ev.target.appendChild(document.getElementById(data));
        this.game.renderPlayer1Board(currentPlayer.playerGameboard, true);
    }

    rotateHandler(shipId, gameboard){
        try{
            gameboard.rotateShip(shipId);
            this.game.renderPlayer1Board(gameboard, true);
            this.game.errorMessageUpdate("");
        } catch(e) {
            this.game.errorMessageUpdate(e.message);
            console.log(e)
            return
        }
    }
}


new GameController()




