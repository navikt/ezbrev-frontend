import * as types from '../actions/actionTypes';

const initialState = {
    regressjonMiljoList: [],
    regressjonMiljo: '',
    regressjonBrevInfo: [],
    regressjonBrevpakkeList: [],
    regressjonBrevpakke: '',
    regressjonBrevmalList: [],
    regressjonBrevdataList: {},
    regressionSimilarity: {}
};

function getBrevpakkeList(brevInfo) {
    let brevpakkeList = [];
    for (let i = 0; i < brevInfo.length; i++) {
        brevpakkeList.push(brevInfo[i].brevPakke);
    }
    return brevpakkeList.filter((x, i, a) => a.indexOf(x) === i).sort();
}

export default function regresjonMenyValgReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_MILJOLIST:
            return Object.assign({}, state, { regressjonMiljoList: action.miljoList });
        case types.SET_REGRESSION_MILJO:
            localStorage.setItem("regressionMiljo", action.miljo);
            return Object.assign({}, state, { regressjonMiljo: action.miljo , regressjonBrevpakke: '', regressjonBrevmalList: []});
        case types.SET_REGRESSION_BREVPAKKELIST:
            return Object.assign({}, state, {
                regressjonBrevpakkeList: action.brevpakkeList
            });
        case types.SET_REGRESSION_BREVPAKKE:
            localStorage.setItem("regressionBrevpakke", action.brevpakke);
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
        default:
            return state;
    }
}
