import * as api from "~/api";
import * as actions from "~/actions/brevdataActions";

export function selectBrevdata(brevdataId) {
    return function (dispatch) {
        return api.getBrevdata(brevdataId).then(brevdata => {
            dispatch(actions.setBrevdata(brevdata));
        }).catch(error => {
            throw(error);
        });
    };
}

export function saveXMLAsNew(brevpakkenavn,brevdata) {
    return function (dispatch) {
        return api.postBrevdataAsNew(brevpakkenavn,brevdata).then(brevdata => {
            dispatch(actions.setBrevdata(brevdata));
        }).catch(error => {
            throw(error);
        });
    };
}

