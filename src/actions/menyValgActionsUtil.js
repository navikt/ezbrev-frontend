import {setBrevpakkeList, setMiljoList, setBrevInfo, setBrevdataList, setBrevmalList} from "~/actions/menyValgActions";
import * as api from "~/api";

export function fetchMiljoList() {
    return function (dispatch) {
        return api.getMiljoList().then(miljoList => {
            dispatch(setMiljoList(miljoList));
        }).catch(error => {
            throw(error);
        });
    };
};


export function selectMiljo(miljo) {

    return function (dispatch) {
        return api.getBrevInfo(miljo).then(json => {
            dispatch(setBrevInfo(json));
        }).catch(error => {
            throw(error);
        });
    };
};

export function selectBrevpakke({brevpakke,brevInfo}) {
    return setBrevmalList({brevpakke,brevInfo});
}


export function selectBrevmal({brevmal, brevpakke}) {
    return function (dispatch) {
        return api.getBrevdataList({brevmal, brevpakke}).then(brevdataList => {
            dispatch(setBrevdataList(brevdataList));
        }).catch(error => {
            throw(error);
        });
    };
};