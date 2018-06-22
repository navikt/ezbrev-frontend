import {combineReducers} from 'redux';
import brevdata from './brevdataReducer';
import menyValg from './menyValgReducer';



const rootReducer = combineReducers({
    brevdata,
    menyValg
});

export default rootReducer;