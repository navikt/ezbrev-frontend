import * as types from './actionTypes';

export function setBrevdata(beskrivelse, brevdataId, changeStamp, xmlInnhold) {
    return {
        type: types.SET_BREVDATA,
        beskrivelse: beskrivelse,
        brevdataId: brevdataId,
        changeStamp: changeStamp,
        xmlInnhold: xmlInnhold,
    };
}

export function changeBrevdataXML(brevdataXML) {
    return { type: types.CHANGE_BREVDATA_XML, brevdataXML: brevdataXML };
}
export function changeBeskrivelse(beskrivelse) {
    return { type: types.CHANGE_BESKRIVELSE, beskrivelse: beskrivelse };
}

export function setIsRedigertInternal(isRedigertInternal) {
    return {
        type: types.SET_IS_REDIGERT_INTERNAL,
        isRedigertInternal: isRedigertInternal,
    };
}

export function resetBrevdataId(brevdataId) {
    return { type: types.RESET_BREVDATA_ID, brevdataId: brevdataId };
}
