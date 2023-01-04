export const createElement = (HTML) =>
  document.createRange().createContextualFragment(HTML).firstElementChild;
