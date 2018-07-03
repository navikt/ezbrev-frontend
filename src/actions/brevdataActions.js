import * as types from './actionTypes';


export function setBrevdata(brevdataXML) {
    return { type: types.SET_BREVDATA, brevdataXML: brevdataXML };
}



