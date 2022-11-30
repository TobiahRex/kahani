import React from 'react';
import { fromEvent } from 'rxjs';
import * as ops from 'rxjs/operators';

import './draw.css';

export default function Draw() {
  useDraggable();

  return (
    <div id="draw-container">
      <h3>Draw</h3>
      <div key="1" className="square draggable">1</div>
      <div key="2" className="square draggable">2</div>
    </div>
  );
}

function useDraggable() {
  React.useEffect(
    () => {
      const mouseMove$ = fromEvent(document, 'mousemove');
      const mouseUp$ = fromEvent(document, 'mouseup');
      const draggableEls = Array.from(document.getElementsByClassName('draggable'));
      const draggables$ = draggableEls.map(
        (el) => createDraggable(el, mouseMove$, mouseUp$));
      return () => draggables$.forEach(
        (draggable$) => draggable$.unsubscribe());
    },
    [],
  );
}

function createDraggable(el, mouseMove$, mouseUp$) {
  const dragStart$ = fromEvent(el, 'mousedown');
  const dragMove$ = dragStart$.pipe(
    ops.switchMap(
      (dragStart) => mouseMove$.pipe(
        ops.map((mouseMove) => ({
          originalEvent: mouseMove,
          deltaX: mouseMove.pageX - dragStart.pageX,
          deltaY: mouseMove.pageY - dragStart.pageY,
          startOffsetX: dragStart.offsetX,
          startOffsetY: dragStart.offsetY,
        })),
        ops.takeUntil(mouseUp$),
      ),
    ),
  );
  const dragSub$ = dragMove$.subscribe((moveEvt) => {
    const offsetX = moveEvt.originalEvent.x - moveEvt.startOffsetX;
    const offsetY = moveEvt.originalEvent.y - moveEvt.startOffsetY;
    /* eslint-disable no-param-reassign */
    el.style.left = `${offsetX}px`;
    el.style.top = `${offsetY}px`;
    /* eslint-enable no-param-reassign */
  });
  return dragSub$;
}
