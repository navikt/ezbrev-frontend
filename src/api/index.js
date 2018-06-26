import React from 'react';

const serverUrl='http://localhost:8080'

export function getBrevPakke_BrevMal(miljo){
    const url= `/rest/t4/dokumenttypeinfo`;
    return get(url)
        .then(res => res.json())                            //må sjekke om res.ok er true før vi gjør om til json
        .then(json => json);                                //kan her gjøre endringer på json-objektet
    //return Promise.resolve(["Arena","Foreldrepenger"]);
}


//http://localhost:8080/rest/t4/dokumenttypeinfo
//Må sortere denne infoen for å finne brevpakker og tilhørende brevmaler
//Må også kalle for å finne lagrede brevmaldata til venstre

export function getMiljoList() {
    const url = `'${serverUrl}/rest/t4`;
    return get(url)
        .then(res => res.json())                            //må sjekke om res.ok er true før vi gjør om til json
        .then(json => json);
}

//localhost avviser tilkoblingsforsøket

function get(url) {
    return fetch(url);  //returnerer et promise
}


