import * as api from '~/api';
import * as actions from '~/actions/converterActions';
import { setIsLoading } from './loadingActions';

export function convertXML(inputXML) {
    return function (dispatch) {
        dispatch(setIsLoading(true));
        return api
            .getOutputXML(inputXML)
            .then((res) => {
                dispatch(actions.setOutputXML(res.xml));
            })
            .catch((error) => {
                dispatch(setIsLoading(false));
                throw error;
            });
    };
}
