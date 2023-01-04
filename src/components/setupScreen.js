import { createElement } from '../createHtmlFromTemplate';
import GameBoard from '../GameBoard';
import GameBoardComponent from './GameBoardComponent';
import ShipComponent from './ShipComponent';
import SkewedComponent from './SkewedComponent';
import Ship from '../Ship';

const templateNode = createElement(
  `
  <div id="setup">
  </div>
`
);

const setupScreen = () => {
  const content = templateNode.cloneNode(true);
  const title = document.createElement('h2');
  const start = document.createElement('button');
  title.innerText = 'Setup';
  start.id = 'startGame';
  start.innerText = 'start';
  const playerBoard = GameBoard(10);
  content.append(SkewedComponent(title));
  content.append(GameBoardComponent(playerBoard, 'setupBoard', false));

  content.append(start);

  return content;
};

export default setupScreen;
