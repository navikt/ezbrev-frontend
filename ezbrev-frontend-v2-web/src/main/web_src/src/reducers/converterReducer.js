import * as types from '../actions/actionTypes';

const initialState = {
    inputXML: "",
    outputXML:""
};

export default function converterReducer(state = initialState, action) {
    switch (
        action.type
        ) {
        case types.SET_INPUT_XML:
            return { ...state, inputXML:action.inputXML};

        case types.SET_OUTPUT_XML:
            return { ...state, outputXML:action.outputXML};

        default:
            return state;
    }
}
