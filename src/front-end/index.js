//Dependencies
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import BlueBird from 'bluebird';
import { Provider } from 'react-redux';

//Routes
import AppRoutes from './routes';
//Assets
import './index.css';

//Configure Store
import  configureStore from '../lib/configureStore';

//Reducers
import rootReducer from './reducers';

//Bluebird config
window.Promise=BlueBird;

BlueBird.config({ warnings: false });

window.addEventListener('unhandledrejection', error => {
    error.preventDefault();
    if (process.env.NODE_ENV !== 'production') {
        console.warn('Unhandled promise rejection warning', error.detail);
    }
});

// configure redux store
const store = configureStore({
    initialState: window.initialState
}, rootReducer);

render(
    <Provider store={store}>
        <Router>
            <AppRoutes />
        </Router>
    </Provider>
    , document.getElementById('root')
);