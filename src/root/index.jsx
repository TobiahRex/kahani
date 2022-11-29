import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import NavigationRoutes from '../navigation';
import Banner from '../pages/Banner';
import Navbar from '../pages/Navbar';
import StateContext from '../state/context';
import { createStore } from '../state';

const [store, dispatch] = createStore();

export default function RootProvider() {
  const [state, setState] = React.useState(store);
  const handleDispatch = React.useCallback((action) => {
    const newState = dispatch(action);
    setState(newState);
  }, [state, setState]);
  const stateContextValue = React.useMemo(
    () => ({ state, dispatch: handleDispatch }),
    [handleDispatch, state],
  );

  return (
    <StateContext.Provider value={stateContextValue}>
      <BrowserRouter>
        <Banner />
        <Navbar auth={state.auth} />
        {NavigationRoutes}
      </BrowserRouter>
    </StateContext.Provider>
  );
}
