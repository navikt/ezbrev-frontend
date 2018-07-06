import { combineReducers } from 'redux';
import brevdata from './brevdataReducer';
import menyValg from './menyValgReducer';
import regressjonMenyValg from './regressionMenyValgReducer';



const rootReducer = combineReducers({
    brevdata,
    menyValg,
    regressjonMenyValg
});

export default rootReducer;
