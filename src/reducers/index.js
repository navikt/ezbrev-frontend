import { combineReducers } from 'redux';
import brevdataReducer from './brevdataReducer';
import menyValg from './menyValgReducer';
import dokument from './dokumentReducer';
import error from './errorReducer';
import regressjonReducer from './regressionReducer';
import inspection from './inspectionReducer';
import inspectionDataReducer from './inspectionDataReducer';

const rootReducer = combineReducers({
    brevdataReducer,
    menyValg,
    dokument,
    error,
    regressjonReducer,
    inspection,
    inspectionDataReducer
});

export default rootReducer;
