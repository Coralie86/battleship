

export class Ship {
    hits = 0;
    sunk = false;
    constructor(length, direction){
        this.length = length;
        this.direction= direction;
    }

    hit(){
        this.hits += 1;
        this.isSunk();
    }

    isSunk(){
        if(this.length === this.hits){
            this.sunk = true;
        }
    }

}