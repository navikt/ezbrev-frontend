import React from 'react';


export function getBrevpakkeList(env){
    /*const url=${rootUrl}$;
    return get(url)*/
    return Promise.resolve(["Arena","Foreldrepenger"]);   //kanskje feil
}

// function get(url) {
//     return fetch(url).then()
// }
//
// const get = (url) => url


/*
export function get = url async  => {
    const response= await fetch(url,{
        method:'GET',
        headers: {'Authorization': 'Basic TjE1MzkzMzpTb21tZXJAVmlzbWE='}
    });
    return response.json();
}
*/