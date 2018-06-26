import * as types from "../actions/actionTypes";

const initialState = {
    miljoList: ["t0", "t1", "t2", "q0", "q1", "q2"],
    brevpakkeList: [],
    versjon: null,
    brevmalList: []
};

export default function menyValgReducer(state=initialState,action) {
    switch (action.type) {
        case types.SET_BREVPAKKELIST:
            //console.log("hei")
            return Object.assign({}, state, {brevpakkeList: action.brevpakkeList});
        case types.SET_MILJOLIST:
            return Object.assign({},state,{miljoList:action.miljoList});

        default:
            return state;
    }
}