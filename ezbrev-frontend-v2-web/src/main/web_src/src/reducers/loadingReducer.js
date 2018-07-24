import * as types from '../actions/actionTypes';

const initialState = {
    isLoading: false
};

export default function loadingReducer(state = initialState, action) {
    switch (
        action.type //tror vi må ha en action til her for når vi legger inn hele brevdata for første gang
    ) {
        case types.SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading };
        case types.SET_MILJOLIST:
        case types.SET_ADMIN_BREVDATALIST:
        case types.SET_ADMIN_BREVINFO:
        case types.SET_ADMIN_BREVPAKKE_VERSJON:
        case types.SET_BREVDATA:
        case types.SET_OUTPUT_XML:
        case types.SET_DOKUMENT:
        case types.SET_SAMMENLIGN_INFO:
        case types.SET_INSPECTION_DATA:
        case types.SET_BREVPAKKE_VERSJON:
        case types.SET_BREVINFO:
        case types.SET_BREVDATALIST:
        case types.SET_REGRESSION_SIMILARITY:
        case types.SET_REGRESSION_BREVDATALIST:
        case types.SET_REGRESSION_BREVINFO:
        case types.SET_ADMIN_PNGPAGES:
        case types.REPLACE_ADMIN_PNGPAGE:
            return { ...state, isLoading: false };
        default:
            return state;
    }
}
