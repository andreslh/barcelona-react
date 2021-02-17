import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'material-ui-snackbar-provider';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider SnackbarProps={{ autoHideDuration: 2000 }}>
      <Router>
        <Provider store={store}>
          <MuiThemeProvider theme={theme}>
            <App />
          </MuiThemeProvider>
        </Provider>
      </Router>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
