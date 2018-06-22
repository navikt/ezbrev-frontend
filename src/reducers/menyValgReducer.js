import * as types from "../actions/actionTypes";

const initialState = {
    miljoList: ["t0", "t1", "t2", "q0", "q1", "q2"],
    brevpakkeList: [],
    versjon: null,
    brevmalListe: []
};

export default function menyValgReducer(state=initialState,action) {
    switch (action.type) {
        case types.SET_BREVPAKKELIST:
            //console.log("hei")
            return Object.assign({}, state, {brevpakkeList: action.brevpakkeList});
        default:
            return state;
    }
}