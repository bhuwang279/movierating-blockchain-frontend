import React from "react";
import appStateReducer  from "./reducer";
import {initialAppState} from "./state";

export const AppStateContext = React.createContext([initialAppState, () => undefined])

const AppStateProvider = ({children}) => {

    const stateAndDispatch = React.useReducer(appStateReducer, initialAppState);
    const [state, dispatch] = stateAndDispatch;


  React.useEffect(() => {
    if (!!state.error) {
      dispatch({
        payload: {
          error: undefined
        },
        type: "displayError"
      });
    }
  }, []);

  return (
    <AppStateContext.Provider value={stateAndDispatch}>
      {children}
    </AppStateContext.Provider>
  );
}

export const { Consumer } = AppStateContext;

export default AppStateProvider;