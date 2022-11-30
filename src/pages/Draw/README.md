# Draw.js

## Dragging with Observables
1. We _streamify_ the `mousemove`, `mousedown`, `mouseup` DOM events to track the user's intentions.
2. Inheritently we should realize that these events, are occuring in a continous stream of events, contrast to a discrete batch of events. This major difference can be handled well by treating the continous stream as an asyncronous set of events we want to handle. If we treated the continous stream in a synchronous manner, we'd have some extra layers of complexity around janky updates, re-rendering components more than desired, and overall a less idiomatic solution. RxJS is the perfect tool to handle front-end streams and provides a hyper-declaritive API with Functional Programming paradigms.

## API overview & behavior

### Behavior
1. We subscribe to the DOM's mouse events.
2. The subscription will feed the events to our consumers via a RxJS stream.
3. As we consume the stream, we'll map the incoming mouse coordinates x & y coordinates to the element selected.
4. The element selected will be offset/transformed using the `top` & `left` CSS position properties.

### API
1. `createDragElements`: Builds the subscription pipeline
```javascript
// Import stylesheets
import './style.css';

import {
    fromEvent, // creation op
    combineLatest // join-creation op
} from 'rxjs';
import {
    switchMap, // transform op
    map, // transoform op
    takeUntil, // filter op
    last // filter op
    tap, // utility op
} from 'rxjs/operators';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `
  <h1>RxJS Drag and Drop</h1>
  <div class="draggable">0</div>
  <div class="draggable">1</div>
  <div class="draggable">2</div>
`;

const mouseMove$ = fromEvent(document, 'mousemove');
const mouseUp$ = fromEvent(document, 'mouseup');
const draggableElements = document.getElementsByClassName('draggable');

Array.from(draggableElements).forEach(createDraggableElement);

function createDraggableElement(element) {
  const mouseDown$ = fromEvent(element, 'mousedown'); // creates observable stream from the mousedown event
  const dragStart$ = mouseDown$;
  const dragMove$ = dragStart$.pipe(
    switchMap(startEv => // switchMap expects another observable as the return value
      mouseMove$.pipe(
        map(moveEv => ({
          originalEvent: moveEv,
          deltaX: moveEv.pageX - startEv.pageX,
          deltaY: moveEv.pageY - startEv.pageY,
          startOffsetX: startEv.offsetX,
          startOffsetY: startEv.offsetY
        })),
        takeUntil(mouseUp$) // once `mouseUp$` is seen, the stream will stop
      )
    )
  );
  const dragEnd$ = dragStart$.pipe( // only used for logging purposes. Not required for functionality
    switchMap(startEv =>
      mouseMove$.pipe(
        map(moveEv => ({
          originalEvent: moveEv,
          deltaX: moveEv.pageX - startEv.pageX,
          deltaY: moveEv.pageY - startEv.pageY,
          startOffsetX: startEv.offsetX,
          startOffsetY: startEv.offsetY
        })),
        takeUntil(mouseUp$),
        last(), // only returns the last `mouseUp$` event
      )
    )
  );

  combineLatest([
    dragStart$.pipe( // tap == forEach
      tap((event) => element.dispatchEvent(
        new CustomEvent('mydragstart', { detail: event })))
    ),
    dragMove$.pipe(
      tap((event) => element.dispatchEvent(
        new CustomEvent('mydragmove', { detail: event })))
    ),
    dragEnd$.pipe(
      tap((event) => element.dispatchEvent(
        new CustomEvent('mydragend', { detail: event })))
    )
  ]).subscribe();
  /*
  `combineLatest`:
    we combine these streams to explicitly emit events for logging. If we weren't logging then we wouldn't care to add this logic.
  */

  dragMove$.subscribe(move => {
    const offsetX = move.originalEvent.x - move.startOffsetX;
    const offsetY = move.originalEvent.y - move.startOffsetY;
    element.style.left = offsetX + 'px';
    element.style.top = offsetY + 'px';
  });
  /*
  `dragMove$.subscribe`
  This is the critical subscription, that will actually shift the position of the element we're trying to drag.
  */
}

Array
    .from(draggableElements)
    .forEach((element, i) => {
        element.addEventListener('mydragstart', () =>
            console.log(`mydragstart on element #${i}`)
        );

        element.addEventListener('mydragmove', event =>
            console.log(
            `mydragmove on element #${i}`,
            `delta: (${event.detail.deltaX}, ${event.detail.deltaY})`
            )
        );

        element.addEventListener('mydragend', event =>
            console.log(
            `mydragend on element #${i}`,
            `delta: (${event.detail.deltaX}, ${event.detail.deltaY})`
            )
        );
    });
    /*
    We add the event listener but we need to also remove the event listener.
    */
```