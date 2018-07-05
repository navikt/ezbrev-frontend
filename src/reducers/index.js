import { combineReducers } from 'redux';
import brevdataReducer from './brevdataReducer';
import menyValg from './menyValgReducer';
import dokument from './dokumentReducer';
import error from './errorReducer';



const rootReducer = combineReducers({
    brevdataReducer,
    menyValg,
    dokument,
    error
});

export default rootReducer;
