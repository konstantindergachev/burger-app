import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './js/App';
import { Provider } from './js/provider/Provider';
import './main.scss';

const app = (
    <Provider>
        <BrowserRouter>
            <App />
      </BrowserRouter>
  </Provider>
);

ReactDOM.render(
    app,
    document.getElementById('root')
);
