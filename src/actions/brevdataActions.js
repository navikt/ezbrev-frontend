import * as types from './actionTypes';

export function saveBrevdata(brevdata) {                    //actions are just plain objects containing a description of an event. Her brevdata bare en variabel vi har definert
    return { type: types.SAVE_BREVDATA, brevdata: brevdata};
}