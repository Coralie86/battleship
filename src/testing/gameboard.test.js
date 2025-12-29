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
    expect(() => gameboard.placeShip(['A', 10], ['B', 11])).toThrow(Error);
})

test('place ship', () => {
    let gameboard = new Gameboard();
    gameboard.placeShip(['A',1], ['C',1]); 
    expect(gameboard.board).toEqual([[{"mark": 'X', "ship": {"hits": 0, "length": 3, "sunk": false}},{"mark": 'X', "ship": {"hits": 0, "length": 3, "sunk": false}},{"mark": 'X', "ship": {"hits": 0, "length": 3, "sunk": false}},'','','','','','',''],
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
    gameboard.placeShip(['A',1], ['C',1]);
    expect(gameboard.shipList).toEqual([{"ship": {"hits": 0, "length": 3, "sunk": false}, "coord": [['A',1], ['B',1], ['C',1]]}])
})

test('check if place already taken', () => {
    let gameboard = new Gameboard();
    gameboard.placeShip(['A',2], ['C',2]);    
    expect(() => gameboard.placeShip(['B',2], ['B',5])).toThrow(Error);
})

test('ship has been hit', () => {
    let gameboard = new Gameboard();
    gameboard.placeShip(['A',1], ['C',1]);
    gameboard.receiveAttack('B',1);
    gameboard.receiveAttack('C',1);
    expect(gameboard.board[0][1].ship.hits).toBe(2);
})

test('missed hit', () => {
    let gameboard = new Gameboard();
    gameboard.placeShip(['A',1], ['C',1]);
    gameboard.receiveAttack('E',4);
    expect(gameboard.board[3][4].mark).toBe('O');
})

test('all ship sunk', () => {
    let gameboard = new Gameboard();
    gameboard.placeShip(['A',1], ['C',1]);
    gameboard.receiveAttack('A',1);
    gameboard.receiveAttack('B',1);
    gameboard.receiveAttack('C',1);
    expect(gameboard.shipStatus()).toBeTruthy();
})

test('all ship sunk', () => {
    let gameboard = new Gameboard();
    gameboard.placeShip(['A',1], ['C',1]);
    gameboard.receiveAttack('A',1);
    gameboard.receiveAttack('C',1);
    expect(gameboard.shipStatus()).not.toBeTruthy();
})