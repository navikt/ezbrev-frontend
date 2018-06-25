import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

import rootReducer from '../reducers';

export default function configureStore(history) {
    const reduxImmutableStateInvariantMiddleware = reduxImmutableStateInvariant();
    const allMiddleware = [routerMiddleware(history), reduxImmutableStateInvariantMiddleware, thunkMiddleware];

    const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...allMiddleware)));

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
