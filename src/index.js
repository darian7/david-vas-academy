import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './scenes/App';
import reportWebVitals from './reportWebVitals';
import "./i18n/i18n";

import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import initStore from './store/Store';
export const history = createBrowserHistory();
export const store = initStore(history);

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
/* reportWebVitals(); */
serviceWorker.unregister();
