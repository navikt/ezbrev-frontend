import * as actions from '~/actions/menyValgActions';
import * as api from '~/api';
import { getBrevdataInBrevpakke } from '~/api';

export function fetchMiljoList() {
    return function(dispatch) {
        return api
            .getMiljoList()
            .then(miljoList => {
                dispatch(actions.setMiljoList(miljoList));
            })
            .catch(error => {
                throw error;
            });
    };
}

export function selectMiljo(miljo) {
    return function(dispatch) {
        return api
            .getBrevInfo(miljo)
            .then(json => {
                dispatch(actions.setBrevInfo(json));
            })
            .catch(error => {
                throw error;
            });
    };
}

export function selectBrevpakke(brevpakke, brevInfo) {
    return actions.setBrevmalList(brevpakke, brevInfo);
}

export function selectBrevmal(brevmal, brevpakke) {
    return function(dispatch) {
        return api
            .getBrevdataList(brevmal, brevpakke)
            .then(brevdataList => {
                dispatch(actions.setBrevdataList(brevdataList));
            })
            .catch(error => {
                throw error;
            });
    };
}

export function setBrevdataList(brevpakke, brevmalList, brevmalIds) {
    return function(dispatch) {
        getBrevdataInBrevpakke(brevpakke, {
            brevmalIds: brevmalIds
        })
            .then(json => {
                let object = {};
                brevmalIds.forEach(malid => (object[malid] = []));
                json.forEach(brevdata => {
                    let malid = brevdata.dokumentmal.dokumenttypeId;
                    malid in object
                        ? object[malid].push(brevdata)
                        : (object[malid] = [brevdata]);
                });
                dispatch(actions.setBrevdataList(object));
            })
            .catch(error => {
                throw error;
            });
    };
}

export function addBrevdata(brevmal, brevpakke) {
    return function(dispatch) {
        return api
            .getBrevdataList(brevmal, brevpakke)
            .then(brevdataList => {
                dispatch(actions.addBrevdataList(brevdataList, brevmal));
            })
            .catch(error => {
                throw error;
            });
    };
}
