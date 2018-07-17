import {getBrevdataInBrevpakke, getSimilarity} from '~/api';
import * as regressionActions from '~/actions/regressionActions';
import * as menyValgActionsUtil from '~/actions/menyValgActionsUtil';

export function setBrevdataList(brevpakke, brevmalList, brevmalIds, action=regressionActions.setRegresionBrevdataList) {
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
                dispatch(action(object));
            })
            .catch(error => {
                throw error;
            });
    };
}

export function selectMiljo(miljo, action) {
    return menyValgActionsUtil.selectMiljo(miljo, action);
}

export function startRegressionTest(regressionObjects, env) {
    return function(dispatch) {
        let prosenter = {};
        for (let i = 0; i < regressionObjects.length; i++) {
            getSimilarity(env, regressionObjects[i]).then(object => {
                const json = object.json;
                const input = object.input;
                'error' in json
                    ? (prosenter[input.brevdataId] = json.message)
                    : (prosenter[json.brevdataId] = json.percentage);
                dispatch(
                    regressionActions.setRegressionSimilarity(
                        JSON.parse(JSON.stringify(prosenter))
                    )
                );
            });
        }
    };
}
