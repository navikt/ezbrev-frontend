import * as types from "../actions/actionTypes";

const initialState = {
    miljoList: ["t0", "t1", "t2", "q0", "q1", "q2"],
    brevpakkeList: [],
    versjon: null,
    brevmalList: [],
    brevInfo:[],
    brevdataList:[]
};

export default function menyValgReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_MILJOLIST:
            return Object.assign({}, state, {miljoList: action.miljoList});
        case types.SET_BREVPAKKELIST:
            return Object.assign({}, state, {brevpakkeList: action.brevpakkeList});
        case types.SET_BREVMALLIST:
            return Object.assign({}, state, {brevmalList: action.brevmalList});
        case types.SET_VERSJON:
            return Object.assign({}, state, {versjon: action.versjon});
        case types.SET_BREVINFO:
            return Object.assign({}, state, {brevInfo: action.brevInfo});
        case types.SET_BREVDATALIST:
            return Object.assign({}, state, {brevdataList: action.brevdataList});
        default:
            return state;
    }
}