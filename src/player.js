import { Gameboard } from "./gameboard";

export class Player {
    prev = [0,0];
    constructor(name, type){
        this.name = name;
        this.type = type;
        this.playerGameboard = new Gameboard();
    }

    attack(opponentBoard, row, col){
        opponentBoard.receiveAttack(row, col);        
    }

    randomAttack(opponentBoard){
        let col = null;
        let row = null;
        if(opponentBoard.board[this.prev[0]][this.prev[1]] === 'T'){
            col = this.prev[1] + Math.floor(Math.random() * 3) -1;
            row = this.prev[0] + Math.floor(Math.random() * 3) -1;
            while((col <0 )|| (row <0) || (opponentBoard.board[row][col] == 'T') || (opponentBoard.board[row][col] == 'O') ){
                col = this.prev[1] + Math.floor(Math.random() * 3) -1;
                row = this.prev[0] + Math.floor(Math.random() * 3) -1;
            }
        } else {
            col = Math.floor(Math.random() * 10);
            row = Math.floor(Math.random() * 10);
            while((opponentBoard.board[row][col] == 'T') || (opponentBoard.board[row][col] == 'O')){
                col = Math.floor(Math.random() * 10);
                row = Math.floor(Math.random() * 10);
            }
        }        
        
        this.prev = [row, col];
        opponentBoard.receiveAttack(row, col);
    }
}