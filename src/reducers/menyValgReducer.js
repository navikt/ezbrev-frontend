import * as types from "../actions/actionTypes";

const initialState = {
    miljoList: ["t0", "t1", "t2", "q0", "q1", "q2"],
    brevpakkeList: [],
    versjon: null,
    brevmalList: [],
    brevInfo:[],
    brevdataList:[]
};

function getBrevpakkeList(brevInfo){
    let brevpakkeList = [];
    for (var i = 0; i < brevInfo.length; i++) {
        brevpakkeList.push(brevInfo[i].brevPakke)
    }
    const brevpakkeListUnique = brevpakkeList.filter((x, i, a) => a.indexOf(x) == i);
    return brevpakkeListUnique;
};

function getBrevmalList({brevpakke,brevInfo}){ //prøvde her å gi det inn som et objekt men usikker
    let brevmalList=[];
    for (var i = 0; i < brevInfo.length; i++) {
        if (brevInfo[i].brevPakke==brevpakke){
            let brevmal= brevInfo[i].malID
            brevmalList.push(brevmal)
        }
    }
    return brevmalList
};


export default function menyValgReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_MILJOLIST:
            return Object.assign({}, state, {miljoList: action.miljoList});
        case types.SET_BREVPAKKELIST:
            return Object.assign({}, state, {brevpakkeList: action.brevpakkeList});
        case types.SET_BREVMALLIST:
            let brevpakke=action.brevpakke;
            let brevInfo=action.brevInfo
            return Object.assign({}, state, {brevmalList: getBrevmalList({brevpakke,brevInfo})});
        case types.SET_VERSJON:
            return Object.assign({}, state, {versjon: action.versjon});
        case types.SET_BREVINFO:
            return Object.assign({}, state, {brevInfo: action.brevInfo, brevpakkeList: getBrevpakkeList(action.brevInfo)});
        case types.SET_BREVDATALIST:
            return Object.assign({}, state, {brevdataList: action.brevdataList});
        default:
            return state;
    }
}