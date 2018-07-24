import * as regressionActionsUtil from '~/actions/regressionActionsUtil';
import * as menyValgActionsUtil from '~/actions/menyValgActionsUtil';
import * as adminActions from '~/actions/adminActions';
import * as api from '~/api';
import {setIsLoading} from "./loadingActions";

export function setAdminBrevdataList(brevpakke, brevmalList, brevmalIds,action) {
    return regressionActionsUtil.setBrevdataList(brevpakke,brevmalList,brevmalIds,action);
}
export function fetchAdminBrevpakkeVersjon(miljo,brevpakke,action){
    return menyValgActionsUtil.fetchBrevpakkeVersjon(miljo,brevpakke,action);
}

export function selectAdminMiljo(miljo, action) {
    return menyValgActionsUtil.selectMiljo(miljo, action);
}

export function fetchAdminPngPages(miljo, brevdataId) {
    return function(dispatch) {
        dispatch(setIsLoading(true));
        api.getAdminPngPages(miljo, brevdataId)
            .then(pngPages => dispatch(adminActions.setAdminPngPages(pngPages)))
            .catch(error => {
                dispatch(setIsLoading(false));
                throw error;
            });
    };
}

export function fetchMaskList(brevdataId) {
    return function(dispatch) {
        dispatch(setIsLoading(true));
        api.getMaskList(brevdataId)
            .then(maskList => dispatch(adminActions.setMaskList(maskList)))
            .catch(error => {
                dispatch(setIsLoading(false));
                throw error;
            });
    };
}

