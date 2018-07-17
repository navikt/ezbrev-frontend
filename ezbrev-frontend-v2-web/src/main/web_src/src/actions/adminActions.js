import * as types from './actionTypes';

export function setAdminMiljo(miljo) {
    return { type: types.SET_ADMIN_MILJO, miljo: miljo };
}

export function setAdminBrevpakke(brevpakke) {
    return { type: types.SET_ADMIN_BREVPAKKE, brevpakke: brevpakke };
}

export function setAdminBrevInfo(brevInfo) {
    return { type: types.SET_ADMIN_BREVINFO, brevInfo: brevInfo };
}
export function setAdminBrevdataList(brevdataList) {
    return {
        type: types.SET_ADMIN_BREVDATALIST,
        brevdataList: brevdataList
    };
}

export function setAdminBrevmalList(brevmalList) {
    return {
        type: types.SET_ADMIN_BREVMALLIST,
        brevmalList: brevmalList
    };
}

export function setAdminBrevpakkeVersjon(brevpakkeVersjon) {
    return {type: types.SET_ADMIN_BREVPAKKE_VERSJON, brevpakkeVersjon: brevpakkeVersjon};
}
export function setAdminModal(adminModal) {
    return {
        type: types.SET_ADMIN_MODAL,
        adminModal: adminModal
    };
}

export function deleteBrevdataInternal(brevdataId, malId) {
    return {
        type: types.DELETE_BREVDATA_INTERNAL,
        brevdataId:brevdataId,
        malId:malId
    };
}