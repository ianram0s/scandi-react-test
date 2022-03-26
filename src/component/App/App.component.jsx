import { PureComponent } from 'react';
import { Provider } from 'react-redux';
import Router from '../Router';

import { store } from '../../store';

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
