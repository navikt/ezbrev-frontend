import * as regressionActionsUtil from '~/actions/regressionActionsUtil';
import * as menyValgActionsUtil from '~/actions/menyValgActionsUtil';

export function setAdminBrevdataList(brevpakke, brevmalList, brevmalIds,action) {
    return regressionActionsUtil.setBrevdataList(brevpakke,brevmalList,brevmalIds,action);
}
export function fetchAdminBrevpakkeVersjon(miljo,brevpakke,action){
    return menyValgActionsUtil.fetchBrevpakkeVersjon(miljo,brevpakke,action);
}

export function selectAdminMiljo(miljo, action) {
    return menyValgActionsUtil.selectMiljo(miljo, action);
}

