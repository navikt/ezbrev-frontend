import * as types from '../actions/actionTypes';

const initialState = {
    brevdata: ''
};

export default function brevdataReducer(state = initialState, action) {
    switch (action.type) {
        case types.SAVE_BREVDATA:
            return Object.assign({}, state, { brevdata: action.brevdata });
        case types.SET_BREVDATA:
            return Object.assign({}, state, { brevdata: action.brevdata });
        case types.CHANGE_XML:
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
