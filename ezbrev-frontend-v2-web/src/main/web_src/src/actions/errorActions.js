import * as types from './actionTypes'

export function addError(error) {
    return {type: types.ADD_ERROR, error:error}
}