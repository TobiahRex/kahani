import React from 'react';

import StateContext from '../../state/context';
import { selectCurrentShapes } from '../../state/selectors';
import { useDraggable } from './hooks';
import { Shapes, DrawControls, SaveModal } from './components';
import { collectShapeInfo, DEFAULT_COLORS } from './utils';
import './draw.css';

export default function Draw() {
  const { state, dispatch } = React.useContext(StateContext);
  const currentShapes = selectCurrentShapes(state);
  const [shapes, setShapes] = React.useState(currentShapes.shapes);
  const [targetShape, setTargetShape] = React.useState(null);
  const [showSaveModal, setShowSaveModal] = React.useState(false);

  const handleAddShape = React.useCallback(
    () => {
      const randomIx = Math.floor(Math.random() * DEFAULT_COLORS.length);
      const newShapes = shapes.concat({
        id: Date.now(),
        color: DEFAULT_COLORS[randomIx],
        top: '',
        left: '',
      });
      setShapes(newShapes);
    },
    [shapes, setShapes],
  );
  const handleRemoveShape = React.useCallback(
    () => {
      if (targetShape) {
        const targetId = parseInt(targetShape.innerText, 10);
        setShapes(shapes.filter((shapeId) => shapeId !== targetId));
        setTargetShape(null);
      }
    },
    [targetShape, shapes, setShapes],
  );
  const handleSelectColor = React.useCallback(
    (evt) => {
      const targetColor = evt.target.getAttribute('data-color');
      targetShape.style.backgroundColor = targetColor;
    },
    [shapes, setShapes, targetShape],
  );
  const handleClearShapes = React.useCallback(
    () => setShapes([]),
    [shapes, setShapes],
  );
  const handleSelectShape = React.useCallback(
    (evt) => {
      setTargetShape(evt.target);
      const listener = (futureEvt) => {
        if (futureEvt.target !== evt.target) {
          setTargetShape(null);
        } else if (!targetShape) {
          setTargetShape(futureEvt.target);
        }
      };
      window.addEventListener('click', listener);
      return () => window.removeEventListener('click', listener);
    },
    [targetShape, setTargetShape],
  );
  const handleShowSaveModal = React.useCallback(
    () => setShowSaveModal(!showSaveModal),
    [showSaveModal, setShowSaveModal],
  );
  const handleSaveShapes = React.useCallback(
    (shouldSave, title) => {
      setShowSaveModal(!showSaveModal);
      if (shouldSave) {
        const shapesToSave = collectShapeInfo();
        dispatch({
          type: 'SAVE_SHAPES',
          payload: { title, shapes: shapesToSave },
        });
      }
    },
    [setShowSaveModal, showSaveModal, collectShapeInfo, dispatch],
  );
  useDraggable(shapes);
  return (
    <div id="draw-container">
      <h3>Draw</h3>
      <DrawControls
        handleAddShape={handleAddShape}
        handleRemoveShape={handleRemoveShape}
        handleSelectColor={handleSelectColor}
        handleClearShapes={handleClearShapes}
        handleShowSaveModal={handleShowSaveModal}
        shapes={shapes}
        shapeSelected={Boolean(targetShape)}
      />
      <Shapes shapes={shapes} handleSelectShape={handleSelectShape} />
      <SaveModal
        title={currentShapes.title}
        showSaveModal={showSaveModal}
        shapes={shapes}
        handleSaveShapes={handleSaveShapes}
      />
    </div>
  );
}
