
export class GameUI {
    constructor(){
        this.player1Grid = document.querySelector("#player1grid");
        this.player2Grid = document.querySelector("#player2grid");

        this.attackHandler = null;
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

    initGrid(){
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
}