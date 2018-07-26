import * as types from './actionTypes';

export function setPing(obj) {
    return {
        type: types.SET_PING,
        ping: obj.json,
        env: obj.env,
        error: obj.json.error
    };
}
