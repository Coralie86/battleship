

export class Ship {
    hits = 0;
    sunk = false;
    constructor(length){
        this.length = length;
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