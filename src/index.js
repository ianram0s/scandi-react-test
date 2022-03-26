import React from 'react';
import ReactDOM from 'react-dom';
import './style/default.scss';

import App from './component/App';

const app = React.createElement(App);
ReactDOM.render(
  app,
  document.getElementById('root'),
);
