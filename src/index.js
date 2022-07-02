import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#cdd0d9',
      main: '#9c9fa8',
      dark: '#6e7179',
      contrastText: '#000',
    },
    secondary: {
      light: '#ff5f4e',
      main: '#ed1c24',
      dark: '#b20000',
      contrastText: '#fff',
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();

reportWebVitals();
