import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import appReducer from './containers/store/reducers';
import { createBrowserHistory } from "history";
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import './index.css';
import App from './App';
import { login } from './containers/store/actions'
// import registerServiceWorker from './registerServiceWorker';
const persistReducer1 = persistReducer(persistConfig, login)
const store = createStore(persistReducer1, applyMiddleware())
const history = createBrowserHistory();

const persistor = persistStore(store); // used to create the persisted store, persistor will be used in the next step
const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['logged_in'] // only navigation will be persisted
  };
  
const app = (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}> 
    <BrowserRouter history={history}>
        <App />
    </BrowserRouter>
    </PersistGate>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
export {store, persistor}
// registerServiceWorker();
