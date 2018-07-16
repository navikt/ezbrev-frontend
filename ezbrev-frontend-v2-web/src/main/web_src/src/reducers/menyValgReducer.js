import * as types from '../actions/actionTypes';

const initialState = {
    miljo: '',
    brevpakke: '',
    brevmal: '',
    miljoList: [],
    brevpakkeVersjon: '',
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
    return brevpakkeList.filter((x, i, a) => a.indexOf(x) === i).sort();
}

function sortBevmalList(list){
    list.sort(function(a, b) {
        if (a.malID > b.malID) {
            return 1;
        } else {
            return -1;
        }
    });
}

function getBrevmalList(brevpakke, brevInfo) {
    let brevmalList = [];
    for (let i = 0; i < brevInfo.length; i++) {
        if (brevInfo[i].brevPakke === brevpakke) {
            let brevmal = brevInfo[i];
            brevmalList.push(brevmal);
        }
    }
    sortBevmalList(brevmalList);
    return brevmalList;
}

export default function menyValgReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_MILJOLIST:
            return {
                ...state,
                miljoList: action.miljoList
            };
        case types.SET_BREVPAKKE_VERSJON:
            return {
                ...state,
                brevpakkeVersjon: action.brevpakkeVersjon
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
                miljo: action.miljo,
                brevpakke: '',
                brevmal: '',
                brevpakkeVersjon: ''
            };
        case types.SET_BREVPAKKE:
            return {
                ...state,
                brevpakke: action.brevpakke,
                brevmal: ''
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
