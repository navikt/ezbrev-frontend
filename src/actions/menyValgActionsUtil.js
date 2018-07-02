import * as actions from "~/actions/menyValgActions";
import * as api from "~/api";

export function fetchMiljoList() {
    return function (dispatch) {
        return api.getMiljoList().then(miljoList => {
            dispatch(actions.setMiljoList(miljoList));
        }).catch(error => {
            throw(error);
        });
    };
};


export function selectMiljo(miljo) {

    return function (dispatch) {
        return api.getBrevInfo(miljo).then(json => {
            dispatch(actions.setBrevInfo(json));
        }).catch(error => {
            throw(error);
        });
    };
};

export function selectBrevpakke(brevpakke,brevInfo) {
    return actions.setBrevmalList(brevpakke,brevInfo);
}


export function selectBrevmal(brevmal, brevpakke) {
    return function (dispatch) {
        return api.getBrevdataList(brevmal, brevpakke).then(brevdataList => {
            dispatch(actions.setBrevdataList(brevdataList));
        }).catch(error => {
            throw(error);
        });
    };
};