const Ship = require('./src/Ship');
const GameBoard = require('./src/GameBoard');
const Player = require('./src/Player');
const Game = require('./src/Game');

test('Jest Works: 1 + 1 = 2', () => {
  expect(1 + 1).toBe(2);
});

test('Ship.Hit()', () => {
  const ship = Ship(2);
  ship.hit();
  expect(ship.getHealth()).toEqual(1);
});

test('Ship.getSize(2)', () => {
  const ship = Ship(2);
  expect(ship.getSize()).toEqual(2);
});

test('Ship.isSunk()', () => {
  const ship = Ship(1);
  ship.hit();
  expect(ship.isSunk()).toEqual(true);
});

test('GameBoard.placeShip() (Happy path)', () => {
  const ship = Ship(3);
  const gameBoard = GameBoard(5);
  expect(gameBoard.placeShip(ship, { x: 0, y: 0 }, 'vert')).toEqual(true);
  expect(gameBoard.placeShip(ship, { x: 1, y: 0 }, 'hori')).toEqual(true);
});

test('GameBoard.placeShip() (Sad path: Outside board)', () => {
  const ship = Ship(3);
  const gameBoard = GameBoard(1);
  expect(gameBoard.placeShip(ship, { x: 0, y: 0 }, 'vert')).toEqual(false);
});
test('GameBoard.placeShip() (Sad path: on other ship)', () => {
  const ship1 = Ship(2);
  const ship2 = Ship(2);
  const gameBoard = GameBoard(3);
  gameBoard.placeShip(ship1, { x: 0, y: 0 }, 'vert');
  expect(gameBoard.placeShip(ship2, { x: 0, y: 0 }, 'vert')).toEqual(false);
});

test('GameBoard.isFleetSunk() (happy path)', () => {
  const ship1 = Ship(1);
  const ship2 = Ship(1);
  ship1.hit();
  ship2.hit();
  const gameBoard = GameBoard(2);
  gameBoard.placeShip(ship1, { x: 0, y: 0 }, 'vert');
  gameBoard.placeShip(ship2, { x: 1, y: 0 }, 'vert');
  expect(gameBoard.isFleetSunk()).toEqual(true);
});

test('GameBoard.isFleetSunk() (sad path)', () => {
  const ship1 = Ship(1);
  const ship2 = Ship(1);
  ship1.hit();
  const gameBoard = GameBoard(2);
  gameBoard.placeShip(ship1, { x: 0, y: 0 }, 'vert');
  gameBoard.placeShip(ship2, { x: 1, y: 0 }, 'vert');
  expect(gameBoard.isFleetSunk()).toEqual(false);
});

test('GameBoard.shoot() (happy path)', () => {
  const ship = Ship(2);
  const gameBoard = GameBoard(2);
  gameBoard.placeShip(ship, { x: 0, y: 0 }, 'vert');
  expect(gameBoard.shoot({ x: 0, y: 0 })).toEqual(true);
  expect(ship.getHealth()).toEqual(1);
});

test('GameBoard.shoot() (sad path)', () => {
  const ship = Ship(2);
  const gameBoard = GameBoard(2);
  gameBoard.placeShip(ship, { x: 0, y: 0 }, 'vert');
  expect(gameBoard.shoot({ x: 1, y: 0 })).toEqual(false);
  expect(ship.getHealth()).toEqual(2);
});

test('Player.attack() (happy path)', () => {
  const ship = Ship(2);
  const enemyBoard = GameBoard(2);
  const player = Player(enemyBoard);
  enemyBoard.placeShip(ship, { x: 0, y: 0 }, 'vert');
  expect(player.attack({ x: 0, y: 0 })).toEqual(true);
});

test('Player.attack() (sad path : miss)', () => {
  const ship = Ship(2);
  const enemyBoard = GameBoard(2);
  const player = Player(enemyBoard);
  enemyBoard.placeShip(ship, { x: 0, y: 0 }, 'vert');
  expect(player.attack({ x: 1, y: 0 })).toEqual(false);
});

test('Player.attack() (sad path : outsideBoard)', () => {
  const enemyBoard = GameBoard(2);
  const player = Player(enemyBoard);
  expect(player.attack({ x: -1, y: 0 })).toEqual(false);
});

test('Game.playRound() (happy path)', () => {
  const board2 = GameBoard(2);
  board2.placeShip(Ship(2), { x: 0, y: 0 }, 'vert');
  const player1 = Player(board2);
  const game = Game([player1]);
  game.setPlayerChoice(0, { x: 0, y: 0 });
  game.playRound();
  game.setPlayerChoice(0, { x: 0, y: 1 });
  game.playRound();
  expect(board2.isFleetSunk()).toBe(true);
});

test('Game.playRound() (sad path)', () => {
  const board2 = GameBoard(10);
  board2.placeShip(Ship(3), { x: 0, y: 0 }, 'vert');
  const player1 = Player(board2);
  const game = Game([player1]);
  game.setPlayerChoice(0, { x: 0, y: 0 });
  game.playRound();
  game.setPlayerChoice(0, { x: 0, y: 1 });
  game.playRound();
  expect(board2.isFleetSunk()).toBe(false);
});
