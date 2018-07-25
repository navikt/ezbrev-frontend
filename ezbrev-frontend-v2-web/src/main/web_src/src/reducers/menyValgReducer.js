import * as types from '../actions/actionTypes';

const initialState = {
    miljo: '',
    brevpakke: '',
    brevmal: '',
    miljoList: [],
    brevpakkeVersjon: '',
    brevpakkeList: [],
    brevmalList: [],
    brevInfo: [],
    brevdataList: [],
    redigerbar: false,
    registerCheckbox: false
};

function getBrevpakkeList(brevInfo) {
    let brevpakkeList = [];
    for (let i = 0; i < brevInfo.length; i++) {
        brevpakkeList.push(brevInfo[i].brevPakke);
    }
    return brevpakkeList.filter((x, i, a) => a.indexOf(x) === i).sort();
}

function sortBevmalList(list) {
    list.sort(function(a, b) {
        if (a.malID > b.malID) {
            return 1;
        } else {
            return -1;
        }
    });
}
function compareFunction(a, b, sortingKey) {
    if (sortingKey === 1) {
        return (
            new Date(b.changeStamp.opprettetDato) -
            new Date(a.changeStamp.opprettetDato)
        );
    } else {
        return (
            new Date(a.changeStamp.opprettetDato) -
            new Date(b.changeStamp.opprettetDato)
        );
    }
}

function getBrevmalList(brevpakke, brevInfo) {
    let brevmalList = [];
    for (let i = 0; i < brevInfo.length; i++) {
        if (brevInfo[i].brevPakke === brevpakke) {
            let brevmal = brevInfo[i];
            brevmalList.push(brevmal);
        }
    }
    sortBevmalList(brevmalList);
    return brevmalList;
}

export default function menyValgReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_MILJOLIST:
            return {
                ...state,
                miljoList: action.miljoList
            };
        case types.SET_BREVPAKKE_VERSJON:
            return {
                ...state,
                brevpakkeVersjon: action.brevpakkeVersjon
            };
        case types.SET_BREVPAKKELIST:
            return {
                ...state,
                brevpakkeList: action.brevpakkeList
            };
        case types.SET_BREVMALLIST:
            let brevpakke = action.brevpakke;
            let brevInfo = action.brevInfo;
            return {
                ...state,
                brevmalList: getBrevmalList(brevpakke, brevInfo)
            };
        case types.SET_BREVINFO:
            return {
                ...state,
                brevInfo: action.brevInfo,
                brevpakkeList: getBrevpakkeList(action.brevInfo)
            };
        case types.SET_BREVDATALIST:
            return {
                ...state,
                brevdataList: action.brevdataList
            };
        case types.ADD_ITEM_BREVDATALIST:
            return {
                ...state,
                brevdataList: [...state.brevdataList, action.brevdata]
            };
        case types.SET_MILJO:
            localStorage.setItem('miljo', action.miljo);
            return {
                ...state,
                miljo: action.miljo,
                brevpakke: '',
                brevmal: '',
                brevpakkeVersjon: '',
                brevmalList: [],
                brevdataList: [],
                brevpakkeList: []
            };
        case types.SET_BREVPAKKE:
            localStorage.setItem('brevpakke', action.brevpakke);
            if (state.brevdataList.length !== 0) {
                return {
                    ...state,
                    brevpakke: action.brevpakke,
                    brevmal: '',
                    brevdataList: [],
                    brevmalList: []
                };
            } else {
                return {
                    ...state,
                    brevpakke: action.brevpakke
                };
            }
        case types.SET_BREVMAL:
            localStorage.setItem('brevmal', JSON.stringify(action.brevmal));
            return {
                ...state,
                brevmal: action.brevmal,
                redigerbar:
                    action.brevmal === '' ? false : action.brevmal.redigerbar
            };
        case types.SORT_BREVDATALIST:
            let sortingKey = action.sortingKey;
            let list = [...state.brevdataList];
            list.sort(function(a, b) {
                const dateA = new Date(a.changeStamp.opprettetDato);
                const dateB = new Date(b.changeStamp.opprettetDato);
                if (sortingKey === '1') {
                    return dateB - dateA;
                } else {
                    return dateA - dateB;
                }
            });
            return {
                ...state,
                brevdataList: list
            };
        case types.SET_REGISTER_CHECKBOX:
            return {
                ...state,
                registerCheckbox: action.registerCheckbox
            };
        default:
            return state;
    }
}
