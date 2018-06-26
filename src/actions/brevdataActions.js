import * as types from './actionTypes';

export function saveBrevdata(brevdata) {
    return { type: types.SAVE_BREVDATA, brevdata: brevdata };
}
