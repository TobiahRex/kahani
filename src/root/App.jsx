import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import './App.css';
import StateContext from '../state/context';

function App() {
  const { state: { auth } } = useContext(StateContext);
  const navigate = useNavigate();
  React.useEffect(
    () => {
      if (!auth.isLoggedIn) {
        navigate('register');
      }
    },
    [auth.isLoggedIn],
  );
  return (
    <div id="app-container">
      {`Welcome ${auth.username}`}
    </div>
  );
}

export default App;
