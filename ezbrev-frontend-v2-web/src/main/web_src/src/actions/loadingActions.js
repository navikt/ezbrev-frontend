import * as types from './actionTypes';

export function setIsLoading(isLoading) {
    return { type: types.SET_IS_LOADING, isLoading: isLoading };
}
