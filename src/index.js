import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import logger from 'redux-logger';

export const store = createStore(
    rootReducer,
    process.env.NODE_ENV === "production" ? applyMiddleware(thunk) : applyMiddleware(logger, thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

/* If you want your app to work offline and load faster, you can change
   unregister() to register() below. Note this comes with some pitfalls.
   Learn more about service workers: https://bit.ly/CRA-PWA */
serviceWorker.register();
