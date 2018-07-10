import { getBrevdataInBrevpakke } from '~/api';
import * as regressionActions from '~/actions/RegressionActions';
import * as menyValgActionsUtil from '~/actions/menyValgActionsUtil';

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
                dispatch(regressionActions.setRegressionBrevdataList(object));
            })
            .catch(error => {
                throw error;
            });
    };
}

export function selectMiljo(miljo, action) {
    return menyValgActionsUtil.selectMiljo(miljo, action);
}
