import * as api from "~/api";
import * as actions from "~/actions/brevdataActions";

export function selectBrevdata(brevdataId) {
    return function (dispatch) {
        return api.getBrevdata(brevdataId).then(brevdataXML => {
            dispatch(actions.setBrevdata(brevdataXML));
        }).catch(error => {
            throw(error);
        });
    };
}
