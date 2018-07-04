import * as types from '../actions/actionTypes';

const initialState = {
    dokument: ''
};

export default function brevdataReducer(state = initialState, action) {
    switch (
        action.type //tror vi må ha en action til her for når vi legger inn hele brevdata for første gang
    ) {
        case types.SET_DOKUMENT:
            return { ...state, dokument: action.dokument };

        default:
            return state;
    }
}
