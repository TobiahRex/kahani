import React from 'react';
import { useNavigate } from 'react-router-dom';

import StateContext from '../../state/context';

export default function Gallery() {
  const navigate = useNavigate();
  const { state, dispatch } = React.useContext(StateContext);

  const handleDeleteLayout = React.useCallback(
    (e) => {
      const targetId = e.target.parentElement.getAttribute('data-id');
      dispatch({
        type: 'REMOVE_GALLERY',
        payload: { id: parseInt(targetId, 10) },
      });
    },
    [state.galleries],
  );
  const handleLoadGallery = React.useCallback(
    (e) => {
      const targetId = e.target.parentElement.getAttribute('data-id');
      dispatch({
        type: 'UPDATE_CURRENT_GALLERY',
        payload: { id: parseInt(targetId, 10) },
      });
      navigate(`/draw:${targetId}`);
    },
    [dispatch],
  );
  return (
    <div className="parent--gallery">
      <h2>Gallery</h2>
      <ul className="gallery-list--wrapper">
        {
          state.galleries.all.map((gallery) => (
            <li className="list-item--wrapper" key={gallery.id} data-id={gallery.id}>
              <h5 className="">
                {gallery.title}
                -
                {gallery.id}
              </h5>
              <span className="shape-count">
                {gallery.shapes.length}
                {' '}
                Shapes&nbsp;
              </span>
              <button type="button" onClick={handleDeleteLayout}>
                Delete
              </button>
              <button type="button" onClick={handleLoadGallery}>
                Load
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
