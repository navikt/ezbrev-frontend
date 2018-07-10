import * as types from '../actions/actionTypes';

const initialState = {
    inputXML: "",
    outputXML:""
};

export default function converterReducer(state = initialState, action) {
    switch (
        action.type //tror vi må ha en action til her for når vi legger inn hele brevdata for første gang
        ) {
        case types.ADD_ERROR:
            return { ...state, errorList:[...state.errorList,action.error]};

        default:
            return state;
    }
}
