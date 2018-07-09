import * as types from './actionTypes';

export function setRegressionMiljo(miljo){
    return {type:types.SET_REGRESSION_MILJO, miljo: miljo}
};

export function setRegressionBrevpakke(brevpakke){
    return {type:types.SET_REGRESSION_BREVPAKKE, brevpakke:brevpakke}
};
export function setRegressionBrevmal(brevmal){
    return {type:types.SET_REGRESSION_BREVMAL, brevmal: brevmal}
};

export function setRegressionBrevpakkeList(brevpakkeList) {
    return { type: types.SET_REGRESSION_BREVPAKKELIST, brevpakkeList: brevpakkeList };
}

export function setRegressionBrevInfo(json) {
    return { type: types.SET_REGRESSION_BREVINFO, brevInfo: json };
}
export function setRegressionBrevdataList(brevdataList) {
    return {type: types.SET_REGRESSION_BREVDATALIST, brevdataList:brevdataList}
}

export function setRegressionBrevmalList(brevmalList) {
    return {
        type: types.SET_REGRESSION_BREVMALLIST,
        brevmalList: brevmalList
    };
}