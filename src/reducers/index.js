import { combineReducers } from 'redux';
import brevdataReducer from './brevdataReducer';
import menyValg from './menyValgReducer';
import dokument from './dokumentReducer';
import error from './errorReducer';
import regressjonReducer from './regressionReducer';

const rootReducer = combineReducers({
    brevdataReducer,
    menyValg,
    dokument,
    error,
    regressjonReducer
});

export default rootReducer;
