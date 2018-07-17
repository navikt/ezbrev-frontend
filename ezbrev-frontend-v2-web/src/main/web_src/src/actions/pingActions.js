import * as types from './actionTypes';

export function setPing(ping) {
    return {type: types.SET_PING, ping:ping};
}
