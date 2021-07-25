import {createStore, combineReducers, applyMiddleware, compose } from 'redux'
import sessionReducer from './session';
import spotReducer from './spot';
import imageReducer from './image';
import tripReducer from './trips';
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    session: sessionReducer,
    spot:spotReducer,
    image:imageReducer,
    trip:tripReducer,
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
    window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer)
}

export default configureStore;
