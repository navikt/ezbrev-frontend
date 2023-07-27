import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension/lib/esm/developmentOnly';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

import rootReducer from '../reducers';

export default function configureStore(history) {
    const reduxImmutableStateInvariantMiddleware =
        reduxImmutableStateInvariant();
    const allMiddleware = [
        reduxImmutableStateInvariantMiddleware,
        thunkMiddleware,
    ];

    const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(...allMiddleware)),
    );

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
