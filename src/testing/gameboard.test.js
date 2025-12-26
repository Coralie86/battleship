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
    expect(gameboard.board).toEqual([['X','X','X','','','','','','',''],
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
    expect(gameboard.shipList).toEqual([{"length": 3, "coord": [['A',1], ['B',1], ['C',1]]}])
})

test('check if place already taken', () => {
    let gameboard = new Gameboard();
    gameboard.placeShip(['A',2], ['C',2]);    
    expect(() => gameboard.placeShip(['B',2], ['B',5])).toThrow(Error);
})
