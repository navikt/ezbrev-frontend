import * as types from './actionTypes';

export function setRegressionMiljo(miljo) {
    return { type: types.SET_REGRESSION_MILJO, miljo: miljo };
}

export function setRegressionBrevpakke(brevpakke) {
    return { type: types.SET_REGRESSION_BREVPAKKE, brevpakke: brevpakke };
}

export function setRegressionBrevInfo(brevInfo) {
    return { type: types.SET_REGRESSION_BREVINFO, brevInfo: brevInfo };
}
export function setRegressionBrevdataList(brevdataList) {
    return {
        type: types.SET_REGRESSION_BREVDATALIST,
        brevdataList: brevdataList
    };
}

export function setRegressionSimilarity(regressionSimilarity) {
    return {
        type: types.SET_REGRESSION_SIMILARITY,
        regressionSimilarity: regressionSimilarity
    };
}

export function setRegressionBrevmalList(brevmalList) {
    return {
        type: types.SET_REGRESSION_BREVMALLIST,
        brevmalList: brevmalList
    };
}
export function setRegressionModal(regressionModal) {
    return {
        type: types.SET_REGRESSION_MODAL,
        regressionModal: regressionModal
    };
}
