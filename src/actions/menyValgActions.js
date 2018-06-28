import * as types from './actionTypes';


export function setMiljoList(miljoList) {
    return {type: types.SET_MILJOLIST, miljoList: miljoList};
}


export function setBrevpakkeList(brevpakkeList) {
    return {type: types.SET_BREVPAKKELIST, brevpakkeList: brevpakkeList};
}


export function setBrevmalList({brevpakke, brevInfo}) {
    return {type: types.SET_BREVMALLIST, brevpakke: brevpakke, brevInfo:brevInfo};
}

export function setVersjon(versjon) {
    return {type: types.SET_VERSJON, versjon: versjon};
}

export function setBrevInfo(json) {
    return {type: types.SET_BREVINFO, brevInfo: json}
}
export function setBrevdataList(brevdata) {
    return {type: types.SET_BREVDATALIST,brevdata:brevdata}
}