import { combineReducers } from 'redux';
import brevdataReducer from './brevdataReducer';
import menyValg from './menyValgReducer';
import dokumentReducer from './dokumentReducer';
import error from './errorReducer';
import converter from './converterReducer';



const rootReducer = combineReducers({
    brevdataReducer,
    menyValg,
    dokumentReducer,
    error,
    converter
});

export default rootReducer;
