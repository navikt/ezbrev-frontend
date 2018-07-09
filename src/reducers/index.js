import { combineReducers } from 'redux';
import brevdataReducer from './brevdataReducer';
import menyValg from './menyValgReducer';
import dokumentReducer from './dokumentReducer';
import error from './errorReducer';



const rootReducer = combineReducers({
    brevdataReducer,
    menyValg,
    dokumentReducer,
    error
});

export default rootReducer;
