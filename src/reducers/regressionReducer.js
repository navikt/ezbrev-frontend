import * as types from '../actions/actionTypes';
import { getBrevdataList } from '~/api';
//import { getBrevmalList, getBrevpakkeList } from '../reducers/menyValgReducer';

const initialState = {
    regressjonMiljoList: [],
    regressjonMiljo: ' - ',
    regressjonBrevInfo: [],
    regressjonBrevpakkeList: [],
    regressjonBrevpakke: ' - ',
    regressjonBrevmalList: [],
    regressjonBrevdataList: {},
    regressionSimilarity: {},
    regressionModal: false
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
            return Object.assign({}, state, { regressjonMiljoList: action.miljoList });
        case types.SET_REGRESSION_MILJO:
            return Object.assign({}, state, { regressjonMiljo: action.miljo });
        case types.SET_REGRESSION_BREVPAKKELIST:
            return Object.assign({}, state, {
                regressjonBrevpakkeList: action.brevpakkeList
            });
        case types.SET_REGRESSION_BREVPAKKE:
            return Object.assign({}, state, { regressjonBrevpakke: action.brevpakke });
        case types.SET_REGRESSION_BREVMALLIST:
            return Object.assign({}, state, {
                regressjonBrevmalList: action.brevmalList
            });
        case types.SET_REGRESSION_BREVDATALIST:
            return Object.assign({}, state, {
                regressjonBrevdataList: action.brevdataList
            });
        case types.SET_REGRESSION_BREVINFO:
            return Object.assign({}, state, {
                regressjonBrevInfo: action.brevInfo,
                regressjonBrevpakkeList: getBrevpakkeList(action.brevInfo)
            });
        case types.SET_REGRESSION_SIMILARITY:
            return Object.assign({}, state, { regressionSimilarity: action.regressionSimilarity });
        case types.SET_REGRESSION_MODAL:
            return Object.assign({}, state, { regressionModal: action.regressionModal });
        default:
            return state;
    }
}
