import { Provider } from 'react-redux';
import { store } from './redux';

import { MuiProvider } from './MuiProvider';
import { Main } from './Main';

export const App = () => (
  <Provider store={store}>
    <MuiProvider>
      <Main />
    </MuiProvider>
  </Provider>
);
