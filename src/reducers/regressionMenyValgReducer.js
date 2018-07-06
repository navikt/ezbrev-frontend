import * as types from '../actions/actionTypes';
import { getBrevdataList } from '~/api';
//import { getBrevmalList, getBrevpakkeList } from '../reducers/menyValgReducer';

const initialState = {
    miljoList: [],
    miljo: ' - ',
    brevInfo: [],
    brevpakkeList: [],
    brevpakke: ' - ',
    brevmalList: [],
    brevdataList: {}
};

function getBrevpakkeList(brevInfo) {
    let brevpakkeList = [];
    for (let i = 0; i < brevInfo.length; i++) {
        brevpakkeList.push(brevInfo[i].brevPakke);
    }
    return brevpakkeList.filter((x, i, a) => a.indexOf(x) === i);
}

export default function regresjonMenyValgReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_MILJOLIST:
            return Object.assign({}, state, { miljoList: action.miljoList });
        case types.SET_MILJO:
            return Object.assign({}, state, { miljo: action.miljo });
        case types.SET_BREVPAKKELIST:
            return Object.assign({}, state, {
                brevpakkeList: action.brevpakkeList
            });
        case types.SET_BREVPAKKE:
            return Object.assign({}, state, { brevpakke: action.brevpakke });
        case types.SET_BREVMALREGRESSIONLIST:
            return Object.assign({}, state, {
                brevmalList: action.brevmalList
            });
        case types.SET_BREVDATALIST:
            return Object.assign({}, state, {
                brevdataList: action.brevdataList
            });
        case types.SET_BREVINFO:
            return Object.assign({}, state, {
                brevInfo: action.brevInfo,
                brevpakkeList: getBrevpakkeList(action.brevInfo)
            });
        default:
            return state;
    }
}
