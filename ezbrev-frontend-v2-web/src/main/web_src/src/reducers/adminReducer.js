import * as types from '../actions/actionTypes';

const initialState = {
    adminMiljoList: [],
    adminMiljo: '',
    adminBrevInfo: [],
    adminBrevpakkeList: [],
    adminBrevpakke: '',
    adminBrevmalList: [],
    adminBrevdataList: {},
    adminBrevpakkeVersjon:'',
    isAdmin:false,
    pngPages:'',
    activePage:'',
    masks:'',
    changed:''
    };

function getBrevpakkeList(brevInfo) {
    let brevpakkeList = [];
    for (let i = 0; i < brevInfo.length; i++) {
        brevpakkeList.push(brevInfo[i].brevPakke);
    }
    return brevpakkeList.filter((x, i, a) => a.indexOf(x) === i);
}

export default function adminReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_MILJOLIST:
            return Object.assign({}, state, { adminMiljoList: action.miljoList });
        case types.SET_ADMIN_MILJO:
            return Object.assign({}, state, { adminMiljo: action.miljo , adminBrevpakke: '', adminBrevmalList: [], adminBrevpakkeVersjon:''});
        case types.SET_ADMIN_BREVPAKKELIST:
            return Object.assign({}, state, {
                adminBrevpakkeList: action.brevpakkeList
            });
        case types.SET_ADMIN_BREVPAKKE:
            return Object.assign({}, state, { adminBrevpakke: action.brevpakke });
        case types.SET_ADMIN_BREVMALLIST:
            return Object.assign({}, state, {
                adminBrevmalList: action.brevmalList
            });
        case types.SET_ADMIN_BREVDATALIST:
            return Object.assign({}, state, {
                adminBrevdataList: action.brevdataList
            });
        case types.SET_ADMIN_BREVINFO:
            return Object.assign({}, state, {
                adminBrevInfo: action.brevInfo,
                adminBrevpakkeList: getBrevpakkeList(action.brevInfo)
            });
        case types.SET_ADMIN_BREVPAKKE_VERSJON:
            return Object.assign({}, state, { adminBrevpakkeVersjon: action.brevpakkeVersjon });
        case types.SET_ADMIN_MODAL:
            return Object.assign({}, state, { adminModal: action.adminModal });
        case types.DELETE_BREVDATA_INTERNAL:
            return {...state,
                adminBrevdataList:{...state.adminBrevdataList,
                [action.malId]: state.adminBrevdataList[action.malId].filter(({brevdataId}) => brevdataId !== action.brevdataId)
        } };
        case types.SET_IS_ADMIN:
            return{...state,isAdmin:action.isAdmin}
        default:
            return state;
    }
}
