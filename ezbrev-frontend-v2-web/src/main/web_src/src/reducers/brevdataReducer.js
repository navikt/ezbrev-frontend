import * as types from '../actions/actionTypes';

const initialState = {
    beskrivelse: '',
    brevdataId: '',
    changeStamp: '',
    xmlInnhold: ''
};

export default function brevdataReducer(state = initialState, action) {
    switch (
        action.type
    ) {
        case types.CHANGE_BREVDATA_XML:
            console.log(action);
            return {
                ...state,
                xmlInnhold: action.brevdataXML
            };
        case types.SET_BREVDATA:
            return {
                ...state,
                beskrivelse: action.beskrivelse,
                brevdataId: action.brevdataId,
                changeStamp: action.changeStamp,
                xmlInnhold: action.xmlInnhold
            };
        case types.CHANGE_BESKRIVELSE:
            return {
                ...state,
                beskrivelse: action.beskrivelse
            };

        default:
            return state;
    }
}
