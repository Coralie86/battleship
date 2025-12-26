import { Ship } from "../ship";

test('nb of hits', () => {
    let ship = new Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.hits).not.toBe(1);
})

test('is sunk', () => {
    let ship = new Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBeTruthy();
})