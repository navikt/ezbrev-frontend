import * as types from './actionTypes'

export function addError(error) {
    return {type: types.ADD_ERROR, error:error}
}
export function displayError(body, title) {
    return {type: types.SHOW_MODAL, body: body, title: title}
}
export function hideError() {
    return {type: types.HIDE_MODAL}
}