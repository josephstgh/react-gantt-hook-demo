import React, { createContext, useReducer, useEffect } from 'react';
import { reducer } from './reducers';
import { useActions } from './actions';

const initialState = {
  workspaceId: 1,
  username: 'user',
};

const AppStoreContext = createContext();

const AppStoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // Pass in the current state
  const actions = useActions(state, dispatch);

  useEffect(() => {
    console.log(`Current State: ${JSON.stringify(state)}`);
  }, [state]);

  return (
    <AppStoreContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </AppStoreContext.Provider>
  );
};

export { AppStoreContext, AppStoreProvider };