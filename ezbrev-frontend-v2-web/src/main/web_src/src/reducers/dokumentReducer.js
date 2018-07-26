import * as types from '../actions/actionTypes';

const initialState = {
    dokument: '',
    isRedigertExternal: false,
    sammenlignInfo: {
        sider: []
    },
    showModal: false
};

export default function brevdataReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_DOKUMENT:
            return {
                ...state,
                dokument: action.dokument,
                isRedigertExternal: false,
                sammenlignInfo: { sider: [] }
            };
        case types.SET_IS_REDIGERT_EXTERNAL:
            return { ...state, isRedigertExternal: action.isRedigertExternal };
        case types.SET_SAMMENLIGN_INFO:
            return { ...state, sammenlignInfo: action.sammenlignInfo };
        case types.SET_SHOW_MODAL:
            return { ...state, showModal: action.showModal };

        default:
            return state;
    }
}
