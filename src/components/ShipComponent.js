import { customAlphabet } from 'nanoid';
const ShipComponent = (board, ship, image, pos, rotation) => {
  const content = document.createElement('img');
  const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 10);
  const UID = nanoid();
  content.classList = 'ship';
  content.src = image;
  content.style.width = 0;
  content.id = UID;
  let dragging = false;

  const updateValues = () => {
    const cellWidth = document.querySelector('.cell').clientWidth;
    content.style.width = cellWidth + 'px';
    console.log(cellWidth + 'px');
  };

  setTimeout(() => {
    board.placeShip(ship, pos, rotation);
    document.getElementById(`${pos.x},${pos.y}`).appendChild(content);
    rotate = rotation == 'hori';
    content.style.transform = `rotate(${rotate ? '-90' : '0'}deg) translate(${rotate ? -100 : 0}%)`;

    updateValues();
  }, 100);

  window.addEventListener('resize', () => updateValues());

  let rotate = false;

  window.addEventListener('contextmenu', (e) => {
    if (!dragging) return;
    e.preventDefault();
    rotate = !rotate;
  });
  let target = undefined;
  let oldParent = undefined;
  const startDrag = (e) => {
    dragging = true;
    e.preventDefault();
    target = e.target;
    const offset = target.offsetWidth / 2;

    target.style.top = e.clientY - offset - target.parentNode.offsetTop + 'px';
    target.style.left = e.clientX - offset - target.parentNode.offsetLeft + 'px';
    document.addEventListener('pointerup', endDrag);
    document.addEventListener('pointermove', drag);
  };

  const drag = (e) => {
    e.preventDefault();
    const offset = target.offsetWidth / 2;
    target.style.pointerEvents = 'none';
    target.style.touchAction = 'none';
    target.style.top = e.clientY - offset - target.parentNode.offsetTop + 'px';
    target.style.left = e.clientX - offset - target.parentNode.offsetLeft + 'px';
    target.style.transform = `rotate(${rotate ? '-90' : '0'}deg) translate(${rotate ? -100 : 0}%)`;
  };

  const endDrag = (e) => {
    dragging = false;
    e.preventDefault();
    target.style.pointerEvents = 'all';
    target.style.touchAction = 'all';
    dropShip(e.clientX, e.clientY);
    document.removeEventListener('pointermove', drag);
    document.removeEventListener('pointerup', endDrag);
  };

  const dropShip = (posX, posY) => {
    let cells = document.elementsFromPoint(posX, posY);
    cells = cells.filter((element) => element.classList.contains('cell'));
    target.style.top = 0 + 'px';
    target.style.left = 0 + 'px';
    if (cells[0] === undefined || cells[0].hasChildNodes()) return;

    const coords = cells[0].id.split(',');

    if (
      board.placeShip(
        ship,
        { x: parseInt(coords[0]), y: parseInt(coords[1]) },
        rotate ? 'hori' : 'vert'
      )
    ) {
      cells[0].appendChild(target);
    }
  };
  content.addEventListener('pointerdown', startDrag);

  return content;
};

export default ShipComponent;
