import React from 'react';

const serverUrl='http:localhost:8080'

export function getBrevpakkeList(env){
    const url= '${serverUrl}/brevpakkeList';
    const test = get(url);
    console.log(test)
    return test;                   //  Får feilmedling om at brevpakkeList er et object så har prøvd å caste det til array, fungerer ikke
    //return Promise.resolve(["Arena","Foreldrepenger"]);
}

function get(url) {
    return fetch(url).then(function(response){return response.json();});
}

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