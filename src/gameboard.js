import { Ship } from "./ship";

export class Gameboard {
    board = new Array(10).fill(null).map(() => new Array(10).fill(''))
    shipList = [];

    constructor(){
        this.spaceAvailable = this.spaceAvailable.bind(this);
    }
    

    placeShip([row,col], length, direction){
        let end = [0,0];
        if(direction === 'vertical'){
            end[0] = row + Number(length) -1;
            end[1] = col;
        } else {
            end[1] = col + Number(length) -1;
            end[0] = row;
        }
        

        if(this.spaceAvailable([row,col], [end[0], end[1]], direction) === false){
            throw new Error('Space not available')
        }              

        if(![row,col,end[0],end[1]].every(x => x >= 0 && x <= 9)){
            throw new Error('Coordinates out of board 10 x 10')
        }

        this.removeShip(`ship-r${row}-c${col}`); //in case it already exists

        if(col === end[1]){
            let ship = new Ship(end[0]-row+1, direction);
            let coord = [];
            for(let i = row; i<=end[0]; i++){
                this.board[i][col] = 'X';
                coord.push([i, col])
            }
            this.shipList.push({"ship":ship, "id": `ship-r${row}-c${col}`, "coord": coord})
        } else if(row === end[0]){
            let ship = new Ship(end[1]-col+1, direction);
            let coord = [];
            for(let i = col; i <= end[1]; i++){
                this.board[row][i] = 'X';
                coord.push([row, i])
            }
            this.shipList.push({"ship":ship, "id": `ship-r${row}-c${col}`, "coord": coord})
        }
    }

    receiveAttack(row,col){
        let shipTouched = this.shipList.find((item) => {
            return (item.coord.find(([r,c]) => {
                return (r === row && c ===col);
            }))
        })
        
        if(shipTouched){
            shipTouched.ship.hit()
            this.board[row][col] = 'T';
        } else if(this.board[row][col] === ''){
            this.board[row][col] = 'O';
        }
    }

    shipStatus() {
        return this.shipList.every(x => x.ship.sunk )
    }

    spaceAvailable([a,b], [c,d], direction){
        if(direction === "vertical"){
            for(let i = a+1; i<=c; i++){
                if(this.board[i][b] !== ''){
                    return false
                }
            }
        } else if(direction === "horizontal"){
            for(let j = b+1; j <= d; j++){
                if(this.board[a][j] !== ''){
                    return false
                }
            }
        }
        return true
    }

    removeShip(shipId){        
        const shipRemoved = this.shipList.find((item) => item.id == shipId);
        if(shipRemoved){
            this.shipList.splice(this.shipList.indexOf(shipRemoved), 1);
            shipRemoved.coord.forEach(coor => this.board[coor[0]][coor[1]] = '');
        }
    }

    rotateShip(shipId){
        let ship = this.shipList.find((item) => item.id === shipId);
        let length = ship.ship.length;
        let end = [];
        let newDirection = "";
        if(ship.ship.direction === "vertical"){
            newDirection = "horizontal";
            end[0] = ship.coord[0][0] + Number(length) -1;
            end[1] = ship.coord[0][1];
        } else {
            newDirection = "vertical";
            end[1] = ship.coord[0][1] + Number(length) -1;
            end[0] = ship.coord[0][0];
        }
        
        if(this.spaceAvailable([ship.coord[0][0], ship.coord[0][1]], [end[0],end[1]], newDirection)){
            this.placeShip([ship.coord[0][0], ship.coord[0][1]], ship.ship.length, newDirection);
        } else{
            throw new Error('Space not available')
        }
    }
}

