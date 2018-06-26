import React from 'react';

const serverUrl='http://localhost:8080'

export function getBrevpakkeList(env){
    const url= `${serverUrl}/brevpakkeList`;
    return get(url)
        .then(res => res.json())                            //må sjekke om res.ok er true før vi gjør om til json
        .then(json => json);                                //kan her gjøre endringer på json-objektet
    //return Promise.resolve(["Arena","Foreldrepenger"]);
}

function get(url) {
    return fetch(url);  //returnerer et promise
}


/*
export function get = url async  => {
    const response= await fetch(url,{
        method:'GET',
        headers: {'Authorization': 'Basic TjE1MzkzMzpTb21tZXJAVmlzbWE='}
    });
    return response.json();
}
*/