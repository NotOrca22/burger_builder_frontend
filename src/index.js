import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import appReducer from './containers/store/reducers';
import { createBrowserHistory } from "history";

import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
const store = createStore(appReducer)
const history = createBrowserHistory();

const app = (
    <Provider store={store}>
    <BrowserRouter history={history}>
        <App />
    </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
// registerServiceWorker();
