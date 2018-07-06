import { combineReducers } from 'redux';
import brevdataReducer from './brevdataReducer';
import menyValg from './menyValgReducer';
import dokument from './dokumentReducer';
import error from './errorReducer';
import regressjonMenyValgReducer from './regressionMenyValgReducer';



const rootReducer = combineReducers({
    brevdataReducer,
    menyValg,
    dokument,
    error,
    regressjonMenyValgReducer
});

export default rootReducer;
