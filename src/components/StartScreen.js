import { createElement } from '../../src/createHtmlFromTemplate';

import SkewedComponent from '../components/SkewedComponent';

const templateNode = createElement(
  `
  <main id="startScreen">
    <h1 id="logo">battleship</h1>
  </main>
`
);

const input = createElement(
  `<input type="text" placeholder="Enter Name" min="3" max="12" id="nameInput" required></input>`
);

const startButton = createElement(`<button id="startButton">start</button>`);

const StartScreen = () => {
  const secondary = document.createElement('form');
  const content = templateNode.cloneNode(true);
  const start = startButton.cloneNode(true);
  const nameInput = input.cloneNode(true);

  secondary.append(SkewedComponent(nameInput));
  secondary.id = 'startForm';
  secondary.append(start);

  content.append(secondary);

  return content;
};

export default StartScreen;
