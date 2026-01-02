
export class GameUI {
    constructor(){
        this.player1Grid = document.querySelector("#player1grid");
        this.player2Grid = document.querySelector("#player2grid");
        this.playerBox = document.querySelector("#playerBox");
        this.secondPage = document.querySelector("#game");
        this.startBtn = document.querySelector("#startGame");
        this.resetBtn = document.querySelector("#resetBtn");

        this.attackHandler = null;
        this.nextHandler = null;
        this.startHandler = null;
        this.dropHandler = null;
        this.resetHandler = null;

        this.startBtn.addEventListener('click', () => {this.startHandler()});
        this.resetBtn.addEventListener('click', () =>{this.resetHandler()})

        this.createFirstPage();
    }

    createFirstPage(){        
        this.secondPage.style.display = 'none';

        let player2div = document.querySelector("#player2field");

        const checkbox = document.querySelector("#option")
        checkbox.addEventListener('change', function () {
            if(this.checked){
                player2div.style.display = 'block';
            } else {
                player2div.style.display = 'none';
            }
        })

        const nextBtn = document.querySelector("#nextBtn");
        nextBtn.addEventListener('click', () =>{this.nextHandler()})
    }

    createGrid(grid, hidden){
        if(hidden === false){
            grid.classList.add('visible');
        } else {
            grid.classList.add('hidden');
        }

        const placeholder = document.createElement("div");
        placeholder.classList.add("placeholder");
        if(hidden === false){
            placeholder.textContent = "Your Grid";
        }else {
            placeholder.textContent = "Opponent's Grid";
        }    
        grid.appendChild(placeholder)

        for(let i = 0; i <= 9; i++){
            let row = document.createElement("div");
            row.classList.add('row');    
            for(let j = 0; j <= 9; j++){
                let cell = document.createElement("div");
                cell.setAttribute('col', j);
                cell.setAttribute('row', i);
                cell.id = `cell-r${cell.getAttribute('row')}-c${cell.getAttribute('col')}`;
                cell.classList.add("cell");
                if(hidden !== false){
                    cell.classList.add("cell-oponent");
                    cell.addEventListener('click', () => {this.attackHandler(i, j)})
                } else{
                    cell.addEventListener('dragover', (ev) => {this.dragoverHandler(ev)});
                    cell.addEventListener('drop', (ev) => {this.dropHandler(ev)});
                }
            row.appendChild(cell);
            }
        grid.appendChild(row);
        }       
    }

    setAttackHandler(handler) {
        this.attackHandler = handler;
    }

    setNextHandler(handler){
        this.nextHandler = handler;
    }

    setStartHandler(handler){
        this.startHandler = handler;
    }

    setDropHandler(handler){
        this.dropHandler = handler;
    }

    setResetHandler(handler){
        this.resetHandler = handler;
    }

    initGrid(){
        this.playerBox.style.display = 'none';
        this.secondPage.style.display = 'block';
        this.startBtn.style.display = 'block';

        this.createGrid(this.player1Grid, false);
        this.createGrid(this.player2Grid, true);
    }   

    renderPlayer1Board(gameboard){
        let cells = this.player1Grid.querySelectorAll(".cell");
        cells.forEach(cell => {
            if(cell.querySelector(".ship") !== null){
                cell.removeChild(cell.querySelector(".ship"))
            }
            this.updateCell(cell, gameboard)
        })
        this.maskShip(gameboard)
    }

    renderPlayer2Board(gameboard){
        let cells = this.player2Grid.querySelectorAll(".cell");
        cells.forEach(cell => {
            this.updateCell(cell, gameboard)
        })
    }

    updateCell(cell, gameboard){
        let row = cell.getAttribute('row');
        let col = cell.getAttribute('col');
        cell.classList.remove('touched');
        cell.classList.remove('missed')

        if(gameboard.board[row][col] === 'T'){
            cell.classList.add('touched')
        } else if (gameboard.board[row][col] === 'O'){
            cell.classList.add('missed')
        }
    }

    maskShip(gameboard){
        gameboard.shipList.forEach(ship => {
            let length = ship.ship.length;
            let start = ship.coord[0];
            let row = String(start[0]);
            let col = String(start[1]);
            let cellStart = this.player1Grid.querySelector(`#cell-r${row}-c${col}`)            
            
            let shipMask = document.createElement("div");
            shipMask.id = ship.id;
            shipMask.classList.add("ship");

            if(ship.ship.direction === 'horizontal'){
                shipMask.style.width = `${length * 42}px`;
                shipMask.style.height = '42px';
            } else {
                shipMask.style.width = '42px';
                shipMask.style.height = `${length * 42}px`;                
            }
            shipMask.addEventListener('click', () => {
                if(ship.ship.direction === 'vertical'){
                    ship.ship.direction = 'horizontal';
                    shipMask.style.width = `${length * 42}px`;
                    shipMask.style.height = '42px';
                    gameboard.removeShip(ship.id);
                    gameboard.placeShip([Number(row), Number(col)],ship.ship.length, ship.ship.direction)                    
                } else {
                    ship.ship.direction = 'vertical';
                    shipMask.style.width = '42px';
                    shipMask.style.height = `${length * 42}px`;
                    gameboard.removeShip(ship.id);
                    gameboard.placeShip([Number(row), Number(col)],ship.ship.length, ship.ship.direction)                    
                }
            })
            cellStart.appendChild(shipMask);   
        })
    }

    dragAllShip(){
        const ships = this.player1Grid.querySelectorAll(".ship")
        ships.forEach((ship) => {
            ship.draggable = true;
            ship.style.cursor = 'pointer';
            ship.addEventListener('dragstart', (ev) => {this.dragStartHandler(ev)});
        })
    }

    playerName(){
        let player1 = {"name": document.querySelector("#player1").value, "type": 'real'};
        let player2 = {"name": document.querySelector("#player2").value, "type":'real'};
        
        if(player2.name === ""){
            player2 = {"name":'computer', "type": "computer"}
        }
        return {player1, player2}
    }

    dragStartHandler(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    dragoverHandler(ev) {
        ev.preventDefault();
    }

    emptyGrid(){
        const grid1Placeholder = this.player1Grid.querySelector(".placeholder")
        this.player1Grid.removeChild(grid1Placeholder)
        this.player1Grid.querySelectorAll(".row").forEach( (div) => {
            this.player1Grid.removeChild(div);
        })

        const grid2Placeholder = this.player2Grid.querySelector(".placeholder")
        this.player2Grid.removeChild(grid2Placeholder)
        this.player2Grid.querySelectorAll(".row").forEach( (div) => {
            this.player2Grid.removeChild(div);
        })
    }
}