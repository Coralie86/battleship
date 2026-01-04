import { Gameboard } from "../gameboard";

test('is a board', () => {
    let gameboard = new Gameboard();
    expect(gameboard.board).toEqual([['','','','','','','','','',''],
                                     ['','','','','','','','','',''],
                                     ['','','','','','','','','',''],
                                     ['','','','','','','','','',''],
                                     ['','','','','','','','','',''],
                                     ['','','','','','','','','',''],
                                     ['','','','','','','','','',''],
                                     ['','','','','','','','','',''],
                                     ['','','','','','','','','',''],
                                     ['','','','','','','','','','']])
})

test('place ship out of board', () => {
    let gameboard = new Gameboard();
    expect(() => gameboard.placeShip([0, 10], [1, 11])).toThrow(Error);
})

test('place ship - Board', () => {
    let gameboard = new Gameboard();
    gameboard.placeShip([0,0], 3, "horizontal"); 
    expect(gameboard.board).toEqual([['X', 'X', 'X','','','','','','',''],
                                     ['','','','','','','','','',''],
                                     ['','','','','','','','','',''],
                                     ['','','','','','','','','',''],
                                     ['','','','','','','','','',''],
                                     ['','','','','','','','','',''],
                                     ['','','','','','','','','',''],
                                     ['','','','','','','','','',''],
                                     ['','','','','','','','','',''],
                                     ['','','','','','','','','','']])
})

test('place ship', () => {
    let gameboard = new Gameboard();
    gameboard.placeShip([0,0], 3, "vertical");
    expect(gameboard.shipList).toEqual([{"ship": {"hits": 0, "length": 3, "sunk": false, "direction": "vertical"}, "id":"ship-r0-c0", "coord": [[0,0], [1,0], [2,0]]}])
})

test('check if place already taken', () => {
    let gameboard = new Gameboard();
    gameboard.placeShip([1,0], 3, "horizontal");    
    expect(() => gameboard.placeShip([0,1], 3, "vertical")).toThrow(Error);
})

test('ship has been hit', () => {
    let gameboard = new Gameboard();
    gameboard.placeShip([0,0], 3, "vertical");
    gameboard.receiveAttack(1,0);
    gameboard.receiveAttack(2,0);
    let ship = gameboard.shipList.find((item) => item.id === "ship-r0-c0")
    expect(ship.ship.hits).toBe(2);
})

test('missed hit', () => {
    let gameboard = new Gameboard();
    gameboard.placeShip([0,0], 3, "horizontal");
    gameboard.receiveAttack(4,3);
    expect(gameboard.board[4][3]).toBe('O');
})

test('all ship sunk true', () => {
    let gameboard = new Gameboard();
    gameboard.placeShip([0,0], 3, "vertical");
    gameboard.receiveAttack(0,0);
    gameboard.receiveAttack(1,0);
    gameboard.receiveAttack(2,0);
    expect(gameboard.shipStatus()).toBeTruthy();
})

test('all ship sunk false', () => {
    let gameboard = new Gameboard();
    gameboard.placeShip([0,0], 3, "vertical");
    gameboard.receiveAttack(0,0);
    gameboard.receiveAttack(2,0);
    expect(gameboard.shipStatus()).not.toBeTruthy();
})