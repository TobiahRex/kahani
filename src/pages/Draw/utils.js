export const stub = (_) => _;

export const DEFAULT_COLORS = [
  'red',
  'blue',
  'green',
  'orange',
];

export function collectShapeInfo() {
  const shapes = Array.from(document.getElementsByClassName('draggable'));
  return shapes.map((data) => ({
    id: parseInt(data.getAttribute('data-id'), 10),
    color: data.style.backgroundColor,
    top: data.style.top,
    left: data.style.left,
  }));
}
