import * as actions from '~/actions/menyValgActions';
import * as adminActions from '~/actions/adminActions';
import * as api from '~/api';
import { getBrevdataInBrevpakke } from '~/api';
import * as regressionActions from '~/actions/regressionActions';
import {setIsLoading} from "./loadingActions";
import * as actionsDok from '~/actions/dokumentActions';

export function fetchMiljoList() {
    return function(dispatch) {
        dispatch(setIsLoading(true));
        return api
            .getMiljoList()
            .then(miljoList => {
                dispatch(actions.setMiljoList(miljoList));
            })
            .catch(error => {
                dispatch(setIsLoading(false));
                throw error;
            });
    };
}

export function fetchIsAdmin() {
    return function(dispatch) {
        return api
            .getIsAdmin()
            .then(isAdmin => {
                dispatch(adminActions.setIsAdmin(isAdmin));
            })
            .catch(error => {
                throw error;
            });
    };
}


export function fetchBrevpakkeVersjon(miljo, brevpakke,action=actions.setBrevpakkeVersjon){
    return function(dispatch) {
        dispatch(setIsLoading(true));
        return api
            .getBrevpakkeVersjon(miljo,
                brevpakke)
            .then(brevpakkeversjon => {
                dispatch(action(brevpakkeversjon.version));
            })
            .catch(error => {
                dispatch(setIsLoading(false));
                throw error;
            });
    };
}

export function selectMiljo(miljo, action = actions.setBrevInfo) {
    return function(dispatch) {
        dispatch(setIsLoading(true));
        return api
            .getBrevInfo(miljo)
            .then(json => {
                dispatch(action(json));
                dispatch(actionsDok.setDokument(''));
            })
            .catch(error => {
                dispatch(setIsLoading(false));
                throw error;
            });
    };
}

export function selectBrevpakke(brevpakke, brevInfo) {
    return actions.setBrevmalList(brevpakke, brevInfo);
}

export function selectBrevmal(brevmal, brevpakke) {
    return function(dispatch) {
        dispatch(setIsLoading(true));
        return api
            .getBrevdataList(brevmal, brevpakke)
            .then(brevdataList => {
                dispatch(actions.setBrevdataList(brevdataList));
                dispatch(actionsDok.setDokument(''));
            })
            .catch(error => {
                dispatch(setIsLoading(false));
                throw error;
            });
    };
}
