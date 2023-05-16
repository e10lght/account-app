import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Header } from './components/Header';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes/Router';
import { Provider } from 'react-redux';
import store from './store/index';
import { theme } from './theme/theme';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
