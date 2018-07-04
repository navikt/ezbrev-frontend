import { combineReducers } from 'redux';
import brevdataReducer from './brevdataReducer';
import menyValg from './menyValgReducer';
import dokument from './dokumentReducer'



const rootReducer = combineReducers({
    brevdataReducer,
    menyValg,
    dokument
});

export default rootReducer;
