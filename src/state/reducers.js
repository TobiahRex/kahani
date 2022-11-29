import { AUTH_TEMPLATE } from './index';

export default [
  handleRegisterUser,
];

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
