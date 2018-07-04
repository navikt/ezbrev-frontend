import * as types from '../actions/actionTypes';

const initialState = {
    miljo: '',
    brevpakke: '',
    brevmal: '',
    miljoList: ['t0', 't1', 't2', 'q0', 'q1', 'q2'],
    brevpakkeList: [],
    brevmalList: [],
    brevInfo: [],
    brevdataList: []
};

function getBrevpakkeList(brevInfo) {
    let brevpakkeList = [];
    for (let i = 0; i < brevInfo.length; i++) {
        brevpakkeList.push(brevInfo[i].brevPakke);
    }
    return brevpakkeList.filter((x, i, a) => a.indexOf(x) === i);
}

function getBrevmalList(brevpakke, brevInfo) {
    //prøvde her å gi det inn som et objekt men usikker på om det er nødvendig
    let brevmalList = [];
    for (let i = 0; i < brevInfo.length; i++) {
        if (brevInfo[i].brevPakke === brevpakke) {
            let brevmal = brevInfo[i].malID;
            brevmalList.push(brevmal);
        }
    }
    return brevmalList;
}

export default function menyValgReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_MILJOLIST:
            return {
                ...state,
                miljoList: action.miljoList
            };
        case types.SET_BREVPAKKELIST:
            return {
                ...state,
                brevpakkeList: action.brevpakkeList
            };
        case types.SET_BREVMALLIST:
            let brevpakke = action.brevpakke;
            let brevInfo = action.brevInfo;
            return {
                ...state,
                brevmalList: getBrevmalList(brevpakke, brevInfo)
            };
        case types.SET_BREVINFO:
            return {
                ...state,
                brevInfo: action.brevInfo,
                brevpakkeList: getBrevpakkeList(action.brevInfo)
            };
        case types.SET_BREVDATALIST:
            return {
                ...state,
                brevdataList: action.brevdataList
            };
        case types.SET_MILJO:
            return {
                ...state,
                miljo: action.miljo
            };
        case types.SET_BREVPAKKE:
            return {
                ...state,
                brevpakke: action.brevpakke
            };
        case types.SET_BREVMAL:
            return {
                ...state,
                brevmal: action.brevmal
            };
        default:
            return state;
    }
}
