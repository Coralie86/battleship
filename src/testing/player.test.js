import { Player } from "../player";

test('player created', () => {
    let player1 = new Player('Coralie', 'real')
    expect(player1.name).toBe('Coralie');
    expect(player1.type).toBe('real')
})