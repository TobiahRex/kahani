import React from 'react';
import {
  arrayOf, number, func, bool, string, shape,
} from 'prop-types';

import './saveModal.css';

export default function SaveModal(props) {
  const {
    shapes, handleSaveShapes, showSaveModal, title: _title,
  } = props;
  const [title, setTitle] = React.useState(_title);
  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      handleSaveShapes(true, title);
    },
    [handleSaveShapes, title],
  );
  if (!showSaveModal) {
    return null;
  }
  return (
    <div className="parent--save-modal">
      <div className="save-modal--wrapper">
        <h3>Save Gallery</h3>
        <hr />
        <form className="save-form--save-modal" onSubmit={handleSubmit}>
          <div className="save-modal--dialogue">
            <span>
              You will save
              {' '}
              {shapes.length}
              {' '}
              shapes.
            </span>
            <br />
            <label htmlFor="name">
              Title:&nbsp;
              <input
                type="text"
                name="name"
                id="name"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>
          </div>
          <div className="save-form--submit-btns">
            <input className="submit-btn" type="submit" />
            <input className="submit-btn" type="button" onClick={() => handleSaveShapes(false)} value="Cancel" />
          </div>
        </form>
      </div>
    </div>
  );
}
SaveModal.defaultProps = {
  shapes: [],
  title: '',
};

SaveModal.propTypes = {
  title: string,
  shapes: arrayOf(shape({
    id: number,
    top: string,
    left: string,
  })),
  handleSaveShapes: func.isRequired,
  showSaveModal: bool.isRequired,
};
