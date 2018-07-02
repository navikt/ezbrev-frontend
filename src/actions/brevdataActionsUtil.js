import * as api from "~/api";
import * as actions from "~/actions/brevdataActions";

export function selectBrevdata(brevdataID) {
    return function (dispatch) {
        return api.getBrevdata(brevdataID).then(brevdata => {
            dispatch(actions.setBrevdata(brevdata));
        }).catch(error => {
            throw(error);
        });
    };
}