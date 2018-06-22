import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';  //fjerne denne før produksjon, øker kjøretiden
import thunk from  'redux-thunk';

export default function configureStore() {
    return createStore(
        rootReducer,
        applyMiddleware(thunk, reduxImmutableStateInvariant())
    );
}