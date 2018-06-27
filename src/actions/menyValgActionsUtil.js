import {setBrevpakkeList, setMiljoList, setBrevInfo} from "~/actions/menyValgActions";
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

export function selectBrevpakke(miljo) {
    return {type: null}
}

export function selectBrevMal(brevpakke) {
    return {type: null}
}