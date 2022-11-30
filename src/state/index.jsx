import errors from '../errors';

export const SHAPE_TEMPLATE = {
  id: 0,
  color: '',
  top: '',
  left: '',
};
export const GALLERY_TEMPLATE = {
  id: '',
  label: '',
  shapes: [],
};
export const AUTH_TEMPLATE = {
  username: '',
  password: '',
  isLoggedIn: false,
};
export const STATE_TEMPLATE = {
  auth: { ...AUTH_TEMPLATE },
  galleries: {
    currentId: '',
    all: [],
  },
  canvas: {
    mode: '', // transform | selected | unselected
    shapes: [],
  },
};

export function createStore() {
  let state = hydrate();

  function dispatch(action) {
    switch (action.type) {
      case 'REGISTER_USER':
        state = handleRegisterUser(state, action); break;
      case 'SAVE_SHAPES':
        state = handleSaveShapes(state, action); break;
      case 'REMOVE_GALLERY':
        state = handleRemoveGallery(state, action); break;
      case 'UPDATE_CURRENT_GALLERY':
        state = handleUpdateCurrentGallery(state, action); break;
      default:
        break;
    }
    localStorage.setItem('kahani', JSON.stringify(state)); // eslint-disable-line
    return state;
  }
  return [state, dispatch];
}

function hydrate() {
  const state = window.localStorage.getItem('kahani'); // eslint-disable-line
  if (state) {
    try {
      const parsedState = JSON.parse(state);
      const nextState = {
        ...STATE_TEMPLATE,
        ...parsedState,
        auth: {
          ...STATE_TEMPLATE.auth,
          ...parsedState.auth,
        },
        galleries: {
          ...STATE_TEMPLATE.galleries,
          ...parsedState.galleries,
        },
        canvas: {
          ...STATE_TEMPLATE.canvas,
          ...parsedState.canvas,
        },
      };
      return nextState;
    } catch (e) {
      console.error(errors.jsonParse('@state.hydrate()'));
    }
  }
  return { ...STATE_TEMPLATE };
}

function handleRegisterUser(state, action) {
  const newState = { ...state };
  if (!newState.auth) {
    newState.auth = { ...AUTH_TEMPLATE };
  }
  const [username, password] = action.payload;
  newState.auth.username = username;
  newState.auth.password = password;
  newState.auth.isLoggedIn = true;
  return newState;
}

function handleSaveShapes(state, action) {
  const newState = { ...state };
  const newGallery = { ...GALLERY_TEMPLATE };
  newGallery.id = Date.now();
  newGallery.shapes = action.payload.shapes;
  newGallery.title = action.payload.title;
  newState.galleries.currentId = newGallery.id;
  newState.galleries.all.push(newGallery);
  return newState;
}

function handleRemoveGallery(state, action) {
  const newState = { ...state };
  newState.galleries.all = newState.galleries.all.filter(
    (gallery) => gallery.id !== action.payload.id);
  if (newState.galleries.currentId === action.payload.id) {
    newState.galleries.currentId = '';
  }
  return newState;
}

function handleUpdateCurrentGallery(state, action) {
  const newState = { ...state };
  newState.galleries.currentId = action.payload.id;
  return newState;
}
