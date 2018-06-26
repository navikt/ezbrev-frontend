import * as types from './actionTypes';
import * as api from '../api';



export function setMiljolist(miljoList){
    return {type: types.SET_MILJOLIST, miljolistList: miljoList};
}


export function fetchMiljolist(){

    return function(dispatch){
        return api.getMiljoList().then(miljoList => {
            dispatch(setMiljolist(miljoList));
        }).catch(error => {
            throw(error);
        });
    };
}

export function setBrevpakkeList(brevpakkeList){
    return {type: types.SET_BREVPAKKELIST, brevpakkeList: brevpakkeList};
}


export function selectMiljo(miljo){

    return function(dispatch){
        return api.getBrevpakkeList(miljo).then(brevpakkeList => {
            dispatch(setBrevpakkeList(brevpakkeList));
        }).catch(error => {
            throw(error);
        });
    };
}

export function selectBrevpakke(miljo){return {type: null}}
export function selectMal(brevpakke){return {type: null}}
