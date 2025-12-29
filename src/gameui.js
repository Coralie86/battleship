
export class GameUI {
    constructor(){
        this.player1Grid = document.querySelector("#player1grid");
        this.player2Grid = document.querySelector("#player2grid");
        this.playerBox = document.querySelector("#playerBox");
        this.secondPage = document.querySelector("#game");

        this.attackHandler = null;
        this.startHandler = null;

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

        const startBtn = document.querySelector("#start");
        startBtn.addEventListener('click', () =>{this.startHandler()})

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
                cell.classList.add("cell");
                if(hidden !== false){
                    cell.classList.add("cell-oponent");
                    cell.addEventListener('click', () => {this.attackHandler(i, j)})
                }
            row.appendChild(cell);
            }
        grid.appendChild(row);
        }       
    }

    setAttackHandler(handler) {
        this.attackHandler = handler;
    }

    setStartHandler(handler){
        this.startHandler = handler;
    }

    initGrid(){
        this.playerBox.style.display = 'none';
        this.secondPage.style.display = 'block';
        this.createGrid(this.player1Grid, false);
        this.createGrid(this.player2Grid, true);
    }   

    renderPlayer1Board(gameboard){
        let cells = this.player1Grid.querySelectorAll(".cell");
        cells.forEach(cell => {
            this.updateCell(cell, gameboard, true)
        })
    }

    renderPlayer2Board(gameboard){
        let cells = this.player2Grid.querySelectorAll(".cell");
        cells.forEach(cell => {
            this.updateCell(cell, gameboard, false)
        })
    }

    updateCell(cell, gameboard, showShip){
        let row = cell.getAttribute('row');
        let col = cell.getAttribute('col');

        if(showShip === false && gameboard.board[row][col].mark != 'X'){
            cell.textContent = gameboard.board[row][col].mark;
        }else if(showShip === true){
            cell.textContent = gameboard.board[row][col].mark;
        }
    }

    maskShip(gameboard){
    }
    
    playerName(){
        let player1 = {"name": document.querySelector("#player1").value, "type": 'real'};
        let player2 = {"name": document.querySelector("#player2").value, "type":'real'};
        
        if(player2.name === ""){
            player2 = {"name":'computer', "type": "computer"}
        }
        return {player1, player2}
    }
}