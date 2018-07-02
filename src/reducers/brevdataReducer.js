import * as types from '../actions/actionTypes';

const initialState = {
    brevdata:""
};

export default function brevdataReducer(state =initialState, action) {
    switch (action.type) {
        case types.SAVE_BREVDATA:
            return Object.assign({}, state, {brevdata: action.brevdata});
        case types.SET_BREVDATA:
            return Object.assign({}, state, {brevdata: action.brevdata});
        default:
            return state;
    }
}

//creates a new object. ie. Object.assign({},state, {role:admin}) changes a new object and sets the state the same as earlier but changes the role
//If action.type is SAVE_BREVDATA, then returns a new object where the state is the input to the saveBrevdata() action