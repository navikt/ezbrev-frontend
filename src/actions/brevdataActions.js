import * as types from './actionTypes';

export function saveBrevdata(brevdata) {
    return { type: types.SAVE_BREVDATA, brevdata: brevdata };
}
export function setBrevdata(brevdata){
    return {type: types.SET_BREVDATA, brevdata: brevdata};
    }
