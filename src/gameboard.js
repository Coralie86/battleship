import { Ship } from "./ship";

export class Gameboard {
    board = new Array(10).fill(null).map(() => new Array(10).fill(''))
    shipList = [];

    placeShip([A,B], [C,D]){
        let a = this.translateColumn(A);
        let c = this.translateColumn(C);
        let b = this.translateRow(B);
        let d = this.translateRow(D);

        if(![a,b,c,d].every(x => x >= 0 && x <= 9)){
            throw new Error('Coordinates out of board 10 x 10')
        }

        if(!this.spaceAvailable([a,b], [c,d])){
            throw new Error('Space not available')
        }

        if(a === c){
            let ship = new Ship(d-b+1);
            let coord = [];
            for(let i = b; i<=d; i++){
                this.board[i][a] = 'X';
                coord.push([this.inverseTranslateColumn(a), this.inverseTranslateRow(i)])
            }
            this.shipList.push({"length":ship.length, "coord": coord})
        } else if(b === d){
            let ship = new Ship(c-a+1);
            let coord = [];
            for(let i = a; i <= c; i++){
                this.board[b][i] = 'X';
                coord.push([this.inverseTranslateColumn(i), this.inverseTranslateRow(b)])
            }
            this.shipList.push({"length":ship.length, "coord": coord})
        }

    }

    translateColumn(col){
        const colArr = "ABCDEFGHIJ".split('');
        return colArr.indexOf(col)
    }

    inverseTranslateColumn(col){
        const colArr = "ABCDEFGHIJ".split('');
        return colArr[col]
    }

    translateRow(row){
        const rowArr = [1,2,3,4,5,6,7,8,9,10];
        return rowArr.indexOf(row)
    }

    inverseTranslateRow(row){
        const rowArr = [1,2,3,4,5,6,7,8,9,10];
        return rowArr[row]
    }

    cellTaken([x,y]){
        if(this.board[x][y] !== ''){
            return true
        }else {
            return false
        }
    }

    spaceAvailable([a,b], [c,d]){
        for(let j = a; j <= c; j++){
            for(let i = b; i <= d; i++){
                if(this.board[i][j] !== ''){
                    return false
                }
        }
        return true
        }
    }
    
}
