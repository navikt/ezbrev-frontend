import * as types from '../actions/actionTypes';

const initialState = {
    miljo: '',
    miljoList: [],
    brevsystem: '',
    mottakerId: '',
    journalpostId: '',
    dokumentinfoId: ''
};

export default function inspectionReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_MILJOLIST:
            return Object.assign({}, state, { miljoList: action.miljoList });
        case types.SET_INSPECTION_MILJO:
            return {
                ...state,
                miljo: action.miljo
            };
        case types.SET_BREVSYSTEM:
            return {
                ...state,
                brevsystem: action.brevsystem
            };
        case types.SET_MOTTAKERID:
            return Object.assign({}, state, { mottakerId: action.mottakerId, journalpostId: "", dokumentinfoId: "" });
        case types.SET_JOURNALPOSTID:
            return Object.assign({}, state, { journalpostId: action.journalpostId, mottakerId: "", dokumentinfoId: "" });
        case types.SET_DOKUMENTINFOID:
            return Object.assign({}, state, { dokumentinfoId: action.dokumentinfoId, journalpostId: "", mottakerId: "" });
        default:
            return state;
    }
}
