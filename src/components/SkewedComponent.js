import { createElement } from '../createHtmlFromTemplate';
import '../components/styles/skewed.css';

const templateNode = createElement(
  `
  <div id="skewedComponent">
  </div>
`
);

const skewedComponent = (innerComponent) => {
  const content = templateNode.cloneNode(true);
  content.append( innerComponent );
  return content;
};

export default skewedComponent;
