import { combineReducers } from 'redux';
import brevdataReducer from './brevdataReducer';
import menyValg from './menyValgReducer';
import dokumentReducer from './dokumentReducer';
import error from './errorReducer';
import converter from './converterReducer';
import regressjonReducer from './regressionReducer';
import inspection from './inspectionReducer';
import inspectionDataReducer from './inspectionDataReducer';



const rootReducer = combineReducers({
    brevdataReducer,
    menyValg,
    dokumentReducer,
    error,
    converter
    regressjonReducer,
    inspection,
    inspectionDataReducer
});

export default rootReducer;
