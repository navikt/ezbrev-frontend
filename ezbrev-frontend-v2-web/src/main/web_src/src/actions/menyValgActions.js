import * as types from './actionTypes';

export function setMiljo(miljo){
  return {type:types.SET_MILJO, miljo:miljo}
};

export function setBrevpakke(brevpakke){
    return {type:types.SET_BREVPAKKE, brevpakke:brevpakke}
};
export function setBrevmal(brevmal){
    return {type:types.SET_BREVMAL, brevmal: brevmal}
};

export function setMiljoList(miljoList) {
    return {type: types.SET_MILJOLIST, miljoList: miljoList};
}

export function setBrevpakkeVersjon(brevpakkeVersjon) {
    return {type: types.SET_BREVPAKKE_VERSJON, brevpakkeVersjon: brevpakkeVersjon};
}
export function setBrevpakkeList(brevpakkeList) {
    return { type: types.SET_BREVPAKKELIST, brevpakkeList: brevpakkeList };
}


export function setBrevmalList(brevpakke, brevInfo) {
    return {type: types.SET_BREVMALLIST, brevpakke: brevpakke, brevInfo:brevInfo};
}

export function setBrevInfo(json) {
    return {type: types.SET_BREVINFO, brevInfo: json}
}
export function setBrevdataList(brevdataList) {
    return {type: types.SET_BREVDATALIST, brevdataList:brevdataList}
}

export function addItemBrevdataList(brevdata){
    return {type: types.ADD_ITEM_BREVDATALIST, brevdata: brevdata}
}