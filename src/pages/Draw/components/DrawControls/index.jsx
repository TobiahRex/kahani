import React from 'react';
import {
  arrayOf, func, shape, bool, string, number,
} from 'prop-types';

import './drawControls.css';

export default function DrawControls(props) {
  const {
    handleAddShape, handleRemoveShape, handleSelectColor, handleClearShapes, handleShowSaveModal,
    shapes, shapeSelected,
  } = props;
  return (
    <div id="draw-controls">
      <div className="parent--ctrl-buttons">
        <button
          type="button"
          className="ctrl-button add-shape"
          onClick={handleAddShape}
          disabled={shapeSelected}
        >
          Add Shape
        </button>
        <button
          type="button"
          className="ctrl-button remove-shape"
          onClick={handleRemoveShape}
          disabled={!shapeSelected}
        >
          Remove Shape
        </button>
        <button
          type="button"
          className="ctrl-button clear-all"
          onClick={handleClearShapes}
          disabled={!shapes.length}
        >
          Clear All
        </button>
        <button
          type="button"
          className="ctrl-button clear-all"
          onClick={handleShowSaveModal}
          disabled={!shapes.length}
        >
          Save Shapes
        </button>
        <div className="parent--color-buttons">
          <button
            type="button"
            className="clr-button"
            data-color="blue"
            aria-label="blue button"
            onClick={handleSelectColor}
            disabled={!shapeSelected}
          />
          <button
            type="button"
            className="clr-button"
            data-color="red"
            aria-label="red button"
            onClick={handleSelectColor}
            disabled={!shapeSelected}
          />
          <button
            type="button"
            className="clr-button"
            data-color="green"
            aria-label="green button"
            onClick={handleSelectColor}
            disabled={!shapeSelected}
          />
          <button
            type="button"
            className="clr-button"
            data-color="orange"
            aria-label="orange button"
            onClick={handleSelectColor}
            disabled={!shapeSelected}
          />
        </div>
      </div>
    </div>
  );
}
DrawControls.defaultProps = {
  shapes: [],
  shapeSelected: false,
};
DrawControls.propTypes = {
  shapes: arrayOf(shape({
    id: number,
    top: string,
    left: string,
  })),
  shapeSelected: bool,
  handleAddShape: func.isRequired,
  handleRemoveShape: func.isRequired,
  handleSelectColor: func.isRequired,
  handleClearShapes: func.isRequired,
  handleShowSaveModal: func.isRequired,
};
