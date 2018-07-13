import * as types from '../actions/actionTypes';

const initialState = {
    brevdata: ''
};

export default function brevdataReducer(state = initialState, action) {
    switch (
        action.type //tror vi må ha en action til her for når vi legger inn hele brevdata for første gang
    ) {
        case types.CHANGE_BREVDATA_XML:
            console.log(action);
            return {
                ...state,
                brevdata: {
                    ...state.brevdata,
                    xmlInnhold: action.brevdataXML
                }
            };
        case types.SET_BREVDATA:
            return { ...state, brevdata: action.brevdata };
        case types.CHANGE_BESKRIVELSE:
            return {
                ...state,
                brevdata: {
                    ...state.brevdata,
                    beskrivelse: action.beskrivelse
                }
            };

        default:
            return state;
    }
}
