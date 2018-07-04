import * as types from './actionTypes'

export function setDokument(dokument) {
    return {type: types.SET_DOKUMENT, dokument:dokument}
}