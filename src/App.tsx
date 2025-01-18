import { Provider } from 'react-redux';

import { Loading, PWABadge } from './components';

import { MuiProvider } from './MuiProvider';
import { Main } from './Main';

import { store } from './redux';

export const App = () => (
  <Provider store={store}>
    <MuiProvider>
      <Main />
      <Loading />
      <PWABadge />
    </MuiProvider>
  </Provider>
);
