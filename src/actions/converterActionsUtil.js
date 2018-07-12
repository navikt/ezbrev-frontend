import * as api from "~/api";
import * as actions from "~/actions/converterActions";

export function convertXML(inputXML) {
    return function(dispatch) {
        return api
            .getOutputXML(inputXML)
            .then(res => {
                dispatch(actions.setOutputXML(res.xml));
            })
            .catch(error => {
                throw error;
            });
    };
}