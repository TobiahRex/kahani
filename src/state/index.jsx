import errors from '../errors';

export const SHAPE_TEMPLATE = {}; // eslint-disable-line
export const LAYOUT_TEMPLATE = { // eslint-disable-line
  ownerId: '',
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
  layouts: [],
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
      default:
        break;
    }
    return state;
  }
  return [state, dispatch];
}

function hydrate() {
  const state = window.localStorage.getItem('kahani'); // eslint-disable-line
  if (state) {
    try {
      const parsedState = JSON.parse(state);
      return {
        ...STATE_TEMPLATE,
        ...parsedState,
      };
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
  localStorage.setItem('kahani', JSON.stringify(newState)); // eslint-disable-line
  return newState;
}
