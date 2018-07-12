import * as types from './actionTypes'

export function setDokument(dokument) {
    return {type: types.SET_DOKUMENT, dokument:dokument}
}

export function setIsRedigertExternal(isRedigertExternal) {
    return {type: types.SET_IS_REDIGERT_EXTERNAL, isRedigertExternal:isRedigertExternal}
}

export function setSammenlignInfo(sammenlignInfo) {
    return {type: types.SET_SAMMENLIGN_INFO, sammenlignInfo:sammenlignInfo}
}
export function setShowModal(showModal) {
    return {type: types.SET_SHOW_MODAL, showModal:showModal}
}