import { combineReducers } from 'redux';
import brevdataReducer from './brevdataReducer';
import menyValg from './menyValgReducer';



const rootReducer = combineReducers({
    brevdataReducer,
    menyValg
});

export default rootReducer;
