import * as types from './actionTypes';

export function setBrevdata(brevdata) {
    return { type: types.SET_BREVDATA, brevdata: brevdata };
}

export function changeBrevdataXML(brevdataXML) {
    return { type: types.CHANGE_BREVDATA_XML, brevdataXML: brevdataXML };
}
export function changeBeskrivelse(beskrivelse) {
    return{ type: types.CHANGE_BESKRIVELSE, beskrivelse: beskrivelse};
}