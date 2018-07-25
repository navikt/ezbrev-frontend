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

export function setAdminBrevdataId(brevdataId) {
    return {
        type: types.SET_ADMIN_BREVDATA_ID,
        brevdataId: brevdataId
    };
}

export function setAdminBrevmalList(brevmalList) {
    return {
        type: types.SET_ADMIN_BREVMALLIST,
        brevmalList: brevmalList
    };
}

export function setAdminBrevpakkeVersjon(brevpakkeVersjon) {
    return {
        type: types.SET_ADMIN_BREVPAKKE_VERSJON,
        brevpakkeVersjon: brevpakkeVersjon
    };
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
        brevdataId: brevdataId,
        malId: malId
    };
}

export function setIsAdmin(isAdmin) {
    return {
        type: types.SET_IS_ADMIN,
        isAdmin: isAdmin
    };
}

export function setAdminPngPages(pngPages) {
    return {
        type: types.SET_ADMIN_PNGPAGES,
        pngPages: pngPages
    };
}
export function replaceAdminPngPage(pngPage) {
    return {
        type: types.REPLACE_ADMIN_PNGPAGE,
        pngPage: pngPage
    };
}

export function setAdminActivePage(activePage) {
    return {
        type: types.SET_ADMIN_ACTIVE_PAGE,
        activePage: activePage
    };
}


export function setAdminChanged(changed) {
    return {
        type: types.SET_ADMIN_CHANGED,
        changed: changed
    };
}

export function setAdminShowModal(showModal) {
    return {
        type: types.SET_ADMIN_SHOW_MODAL,
        showModal: showModal
    };
}
export function setMask(mask) {
    return {
        type: types.SET_ADMIN_MASK,
        mask: mask
    };
}