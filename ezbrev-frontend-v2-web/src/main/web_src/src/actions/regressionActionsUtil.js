import { getBrevdataInBrevpakke, getSimilarity } from '~/api';
import * as regressionActions from '~/actions/regressionActions';
import * as menyValgActionsUtil from '~/actions/menyValgActionsUtil';
import { setIsLoading } from './loadingActions';

export function setBrevdataList(
    brevpakke,
    brevmalList,
    brevmalIds,
    action = regressionActions.setRegressionBrevdataList
) {
    return function(dispatch) {
        dispatch(setIsLoading(true));
        let promises = [];
        for (let i = 0; i < brevmalIds.length; i++) {
            promises.push(
                getBrevdataInBrevpakke(brevpakke, {
                    brevmalIds: [brevmalIds[i]]
                })
            );
        }

        Promise.all(promises).then(resolvedPromises => {
            let object = {};
            brevmalIds.forEach(malid => (object[malid] = []));
            resolvedPromises.forEach(res => {
                res.forEach(brevdata => {
                    let malid = brevdata.dokumentmal.dokumenttypeId;
                    malid in object
                        ? object[malid].push(brevdata)
                        : (object[malid] = [brevdata]);
                });
            });
            dispatch(setIsLoading(false));
            dispatch(action(object));
        });
    };
}

export function selectMiljo(miljo, action) {
    return menyValgActionsUtil.selectMiljo(miljo, action);
}

export function fetchBrevpakkeVersjon(miljo,brevpakke,action){
    return menyValgActionsUtil.fetchBrevpakkeVersjon(miljo,brevpakke,action);
}

export function startRegressionTest(
    regressionObjects,
    env,
    numberOfBrevtadaToTestSimultaneously = 2
) {
    return function(dispatch) {
        let prosenter = {};
        for (let i = 0; i < regressionObjects.length; i++) {
            prosenter[regressionObjects[i].brevdataId] = 'Henter data...';
        }
        dispatch(
            regressionActions.setRegressionSimilarity(
                JSON.parse(JSON.stringify(prosenter))
            )
        );
        chainMultipleRegressionObjects(
            regressionObjects,
            numberOfBrevtadaToTestSimultaneously,
            env,
            prosenter,
            dispatch
        );
    };
}
function chainMultipleRegressionObjects(
    regressionObjects,
    numberOfObj,
    env,
    prosenter,
    dispatch
) {
    let chain = Promise.resolve();
    for (let i = 0; i < regressionObjects.length; i = i + numberOfObj) {
        chain = chain.then(function() {
            let promise = promiseRegressionObjects(
                i,
                numberOfObj,
                regressionObjects,
                env,
                prosenter
            );
            return promise;
        });
        chain.then(x =>
            dispatch(
                regressionActions.setRegressionSimilarity(
                    JSON.parse(JSON.stringify(prosenter))
                )
            )
        );
    }
}

//If you want to test multiple regression objects at a time.
function promiseRegressionObjects(
    start,
    numberOfObj,
    regressionObjects,
    env,
    prosenter
) {
    return new Promise(function(resolve, dispatch) {
        let promises = [];
        const length = regressionObjects.length;
        for (let j = start; j < start + numberOfObj && j < length; j++) {
            promises.push(getSimilarity(env, regressionObjects[j]));
        }
        Promise.all(promises).then(resolvedPromises => {
            resolvedPromises.forEach(res => {
                'error' in res.json
                    ? (prosenter[res.input.brevdataId] = res.json.message)
                    : (prosenter[res.json.brevdataId] = res.json.percentage);
                prosenter[res.json.brevdataId] = res.json.percentage;
            });
            resolve(prosenter);
        });
    });
}
