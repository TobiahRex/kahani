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
