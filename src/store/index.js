import {applyMiddleware, compose, createStore} from 'redux';
import {createLogger} from 'redux-logger'

import thunk from 'redux-thunk'; // needed to be able to return functions as actions, those function actions will run asynchronously
import {rootReducer} from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, createLogger())));
};
