import { MuiThemeProvider } from "@material-ui/core/styles";
import React from "react";

import Baseline from "../../Baseline";
import createTheme from "../../theme";
import {  light } from "./themes";
export const ThemeContext = React.createContext();
const ThemeProvider = ({
  children
}) => {
 
  const theme = createTheme( light);

  return (
    <ThemeContext.Provider>
    
      <MuiThemeProvider theme={theme}>
        <Baseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
