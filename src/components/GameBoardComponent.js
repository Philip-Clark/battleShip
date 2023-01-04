import { createElement } from '../../src/createHtmlFromTemplate';
import Ship from '../Ship';
import './styles/gameBoard.css';
import interact from 'interactjs';
import ShipComponent from './ShipComponent';
import Patrol from '../assets/images/Patrol.png';
import Submarine from '../assets/images/Submarine.png';
import Destroyer from '../assets/images/Destroyer.png';
import BattleShip from '../assets/images/BattleShip.png';
import Carrier from '../assets/images/Carrier.png';
const board = createElement(
  `
  <div class="gameBoard">
  </div>
`
);

const cell = createElement(
  `
  <div class="cell"></div>
`
);

const GameBoardComponent = (gameBoard, id, intractable = true) => {
  const content = board.cloneNode(true);
  content.id = id;

  const boardWidth = gameBoard.getSize();
  content.style.setProperty('--size', boardWidth);

  for (let i = 0; i < boardWidth; i++) {
    for (let j = 0; j < boardWidth; j++) {
      const newCell = cell.cloneNode(true);
      newCell.id = `${j},${i}`;

      content.appendChild(newCell);

      if (!intractable) continue;

      newCell.addEventListener('click', () => {
        // if (newCell.getAttribute('type') !== null) return;
        const hit = gameBoard.shoot({ x: j, y: i });
        newCell.setAttribute('type', hit ? 'hit' : 'miss');
        console.log(hit);
      });
    }
  }

  const ships = [Ship(2), Ship(3), Ship(3), Ship(4), Ship(5)];
  const images = [Patrol, Submarine, Destroyer, BattleShip, Carrier];
  const randomBoard = gameBoard.getRandomizedBoard(ships);
  console.log(randomBoard);
  randomBoard.forEach((randData, index) => {
    ShipComponent(gameBoard, ships[index], images[index], randData.origin, randData.rotation);
  });

  return content;
};

export default GameBoardComponent;
