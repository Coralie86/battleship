import { Gameboard } from "./gameboard";

export class Player {

    constructor(name, type){
        this.name = name;
        this.type = type;
        this.playerGameboard = new Gameboard();
        // this.password = prompt("Set password");
    }

    attack(opponentBoard, col, row){
        opponentBoard.receiveAttack(col, row);
    }

    randomAttack(opponentBoard){
        let col = opponentBoard.inverseTranslateColumn(Math.floor(Math.random * 10));
        let row = opponentBoard.inverseTranslateRow(Math.floor(Math.random * 10));
        opponentBoard.receiveAttack(col, row);
    }
}