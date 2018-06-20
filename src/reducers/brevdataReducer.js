import * as types from '../actions/actionTypes';

export default function brevdataReducer(state = {}, action) {
    switch (action.type) {
        case types.SAVE_BREVDATA:
            return Object.assign({}, action.brevdata); //must change this to Object.assign({}, state,{brevdata: action.brevdata}) if add more variables to state?

        default:
            return state;
    }
}

//creates a new object. ie. Object.assign({},state, {role:admin}) changes a new object and sets the state the same as earlier but changes the role
//If action.type is SAVE_BREVDATA, then returns a new object where the state is the input to the saveBrevdata() action