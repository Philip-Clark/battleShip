import './style.css';
import { createElement } from './createHtmlFromTemplate';
import SkewedComponent from './components/SkewedComponent';
import fade from './fade';
import StartScreen from './components/StartScreen';
import GameBoardComponent from './components/GameBoardComponent';
import GameBoard from './GameBoard';
import setupScreen from './components/setupScreen';

const fadeScreens = (from, to) => {
  fade(from, false, 200);
  fade(to, true, 200, 300);
};

const Main = () => {
  const content = document.createElement('main');
  const startScreen = StartScreen();
  const setup = setupScreen();

  startScreen.querySelector('#startForm').addEventListener('submit', (e) => {
    e.preventDefault();
    fadeScreens(startScreen, setup);
  });

  setup.querySelector('#startGame').addEventListener('click', (e) => {
    e.preventDefault();
    fadeScreens(setup, undefined);
  });

  content.append(startScreen);
  content.append(setup);
  return content;
};

const grungeOverlay = document.createElement('div');
grungeOverlay.id = 'overlay';

document.body.append(Main());
document.body.append(grungeOverlay);
