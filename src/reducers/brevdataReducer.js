import * as types from '../actions/actionTypes';

const initialState = {
    brevdata: ''
};

export default function brevdataReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_BREVDATA:
            console.log(action);
            return {
                ...state,
                brevdata: {
                    ...state.brevdata,
                    xmlInnhold: action.brevdataXML
                }
            };

        default:
            return state;
    }
}
