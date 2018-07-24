import * as regressionActionsUtil from '~/actions/regressionActionsUtil';
import * as menyValgActionsUtil from '~/actions/menyValgActionsUtil';
import * as adminActions from '~/actions/adminActions';
import * as api from '~/api';

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
        api.getAdminPngPages(miljo, brevdataId)
            .then(pngPages => dispatch(adminActions.setAdminPngPages(pngPages)))
            .catch(error => {
                throw error;
            });
    };
}

export function fetchMaskList(brevdataId) {
    return function(dispatch) {
        api.getMaskList(brevdataId)
            .then(maskList => dispatch(adminActions.setMaskList(maskList)))
            .catch(error => {
                throw error;
            });
    };
}

