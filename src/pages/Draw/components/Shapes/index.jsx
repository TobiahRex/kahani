import React from 'react';
import {
  arrayOf, number, func, shape, string,
} from 'prop-types';

import './shapes.css';

export default function Shapes(props) {
  const { shapes, handleSelectShape } = props;
  return (
    <div id="shape-container">
      {shapes.map((data) => (
        <button
          type="button"
          key={data.id}
          className="square draggable"
          data-id={data.id}
          style={{
            top: data.top,
            left: data.left,
            backgroundColor: data.color || 'red',
          }}
          onClick={(evt) => handleSelectShape(evt)}
        >
          {data.id % 100}
        </button>
      ))}
    </div>
  );
}
Shapes.defaultProps = {
  shapes: [],
};
Shapes.propTypes = {
  shapes: arrayOf(shape({
    id: number,
    top: string,
    left: string,
  })),
  handleSelectShape: func.isRequired,
};
