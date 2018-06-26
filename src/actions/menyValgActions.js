import * as types from './actionTypes';
import * as api from '../api';

export function setBrevpakkeList(brevpakkeList){
    return {type: types.SET_BREVPAKKELIST, brevpakkeList: brevpakkeList};
}

export function selectEnv(env){

    return function(dispatch){
        return api.getBrevpakkeList(env).then(brevpakkeList => {
            dispatch(setBrevpakkeList(brevpakkeList));
        }).catch(error => {
            throw(error);
        });
    };
}