import * as types from '../actions/actionTypes';

const initialState = {
    beskrivelse: '',
    brevdataId: '',
    changeStamp: '',
    xmlInnhold: '',
    isRedigertInternal: false
};

export default function brevdataReducer(state = initialState, action) {
    switch (action.type) {
        case types.CHANGE_BREVDATA_XML:
            return {
                ...state,
                xmlInnhold: action.brevdataXML,
                isRedigertInternal: true
            };
        case types.SET_BREVDATA:
            return {
                ...state,
                beskrivelse: action.beskrivelse,
                brevdataId: action.brevdataId,
                changeStamp: action.changeStamp,
                xmlInnhold: action.xmlInnhold,
                isRedigertInternal: false
            };
        case types.CHANGE_BESKRIVELSE:
            return {
                ...state,
                beskrivelse: action.beskrivelse,
                isRedigertInternal: true
            };
        case types.SET_IS_REDIGERT_INTERNAL:
            return {
                ...state,
                isRedigertInternal: action.isRedigertInternal
            };

        default:
            return state;
    }
}
