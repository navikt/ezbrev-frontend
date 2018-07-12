import * as types from './actionTypes';

export function setMiljo(miljo){
    return {type:types.SET_INSPECTION_MILJO, miljo: miljo}
};

export function setMottakerId(mottakerId){
    return {type:types.SET_MOTTAKERID, mottakerId:mottakerId}
};
export function setJournalpostId(journalpostId){
    return {type:types.SET_JOURNALPOSTID, journalpostId:journalpostId}
};
export function setDokumentinfoId(dokumentinfoId){
    return {type:types.SET_DOKUMENTINFOID, dokumentinfoId:dokumentinfoId}
};
export function setBrevsystem(brevsystem){
    return {type:types.SET_BREVSYSTEM, brevsystem:brevsystem}
};
export function setInspectionData(inspectionData){
    return {type:types.SET_INSPECTION_DATA, inspectionData:inspectionData}
};
