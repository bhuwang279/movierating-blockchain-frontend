import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ThemeProvider from "./components/Theme"
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import MessageManagerProvider from "./components/Messages";
const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById('jss-insertion-point'),
});


ReactDOM.render(
    <JssProvider jss={jss} generateClassName={generateClassName}>
    <ThemeProvider>
    <MessageManagerProvider>
    <App />

    
    </MessageManagerProvider>
     
    </ThemeProvider>
    
    </JssProvider>,
  document.getElementById('root')
);


