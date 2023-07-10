import * as types from '../actions/actionTypes';

const initialState = {
    errorList: [],
    modalTitle: '',
    modalBody: '',
    showModal: false
};

export default function errorReducer(state = initialState, action) {
    switch (action.type) {
        case types.ADD_ERROR:
            return { ...state, errorList: [...state.errorList, action.error] };
        case types.SHOW_MODAL:
            return {
                ...state,
                modalTitle: action.title,
                modalBody: action.body,
                showModal: true
            };
        case types.HIDE_MODAL:
            return { ...state, showModal: false };
        default:
            return state;
    }
}
