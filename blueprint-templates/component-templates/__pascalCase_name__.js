import { createElement } from '../../src/createHtmlFromTemplate';

const templateNode = createElement(
  `
  <div id="{{camelCase name}}">
  </div>
`
);

const {{pascalCase name}} = (name) => {
  const content = templateNode.cloneNode(true);
  return content;
};

export default {{pascalCase name}};
