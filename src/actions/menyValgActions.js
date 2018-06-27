import * as types from './actionTypes';


export function setMiljoList(miljoList) {
    return {type: types.SET_MILJOLIST, miljoList: miljoList};
}


export function setBrevpakkeList(brevpakkeList) {
    return {type: types.SET_BREVPAKKELIST, brevpakkeList: brevpakkeList};
}


export function setBrevmalList(brevmalList) {
    return {type: types.SET_BREVMALLIST, brevmalList: brevmalList};
}

export function setVersjon(versjon) {
    return {type: types.SET_VERSJON, versjon: versjon};
}

export function setBrevInfo(json) {
    return {type: types.SET_BREVINFO, brevInfo: json}
}