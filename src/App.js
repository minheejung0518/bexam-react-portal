import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import ErrorBoundary from 'react-error-boundary';
import Routes from './router/routes';
import Error from './pages/Error';
import { history } from './redux/store';
import theme from './theme';


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary FallbackComponent={Error}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
