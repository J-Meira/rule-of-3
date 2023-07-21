import { Provider } from 'react-redux';
import { store } from './redux';

import { Loading } from './components';
import { MuiProvider } from './MuiProvider';
import { Main } from './Main';

export const App = () => (
  <Provider store={store}>
    <MuiProvider>
      <Main />
      <Loading />
    </MuiProvider>
  </Provider>
);
