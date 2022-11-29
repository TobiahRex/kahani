import React from 'react';
import { useNavigate } from 'react-router-dom';

import Header from './components/Header';
import StateContext from '../../state/context';

export default function Register() {
  const { state, dispatch } = React.useContext(StateContext);
  const navigate = useNavigate();
  const [password, handleSetPassword] = React.useState(state.auth.password);
  const [username, handleSetUsername] = React.useState(state.auth.username);
  const handleSubmitForm = React.useCallback((e) => {
    e.preventDefault();
    dispatch({ type: 'REGISTER_USER', payload: [username, password] });
    navigate('/');
  }, [password, username]);
  return (
    <div className="register--parent">
      <div className="register--title">
        <Header username={username} isLoggedIn={state.auth.isLoggedIn} />
      </div>
      <form onSubmit={handleSubmitForm} className="form-example">
        <div className="form-example">
          <label htmlFor="name">
            Enter your name:&nbsp;
            <input
              type="text"
              name="name"
              id="name"
              required
              onChange={(e) => handleSetUsername(e.target.value)}
              value={username}
            />
          </label>
        </div>
        <div className="form-example">
          <label htmlFor="password">
            Enter your password:
            <input
              type="password"
              name="password"
              id="password"
              required
              onChange={(e) => handleSetPassword(e.target.value)}
              value={password}
            />
          </label>
        </div>
        <div className="form-example">
          <input type="submit" value="Subscribe!" />
        </div>
      </form>
    </div>
  );
}
