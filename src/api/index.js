import React from 'react';

const serverUrl = 'http://localhost:8080'

export function getBrevPakke_BrevMal(miljo) {
    const url = `/rest/t4/dokumenttypeinfo`;
    return get(url)
        .then(res => res.json())                            //må sjekke om res.ok er true før vi gjør om til json
        .then(json => json);                                //kan her gjøre endringer på json-objektet
    //return Promise.resolve(["Arena","Foreldrepenger"]);
}


//http://localhost:8080/rest/t4/dokumenttypeinfo
//Må sortere denne infoen for å finne brevpakker og tilhørende brevmaler
//Må også kalle for å finne lagrede brevmaldata til venstre

function compareFunction(a, b) {
    if (a.charAt(0) > b.charAt(0)) {
        return 1;
    }
    else if (a.charAt(0) == b.charAt(0)) {
        let a_num = Number(a.substring(1));
        let b_num = Number(b.substring(1));
        if (a_num > b_num) {
            return 1;
        }
    } else {
        return -1;
    }
}

export function getMiljoList() {
    const url = `${serverUrl}/rest/env`;
    return get(url)
        .then(res => res.json())
        .then(json => json.sort(function(a, b){
        if (a.charAt(0) > b.charAt(0)) {
            return 1;
        }
        else if (a.charAt(0) == b.charAt(0)) {
            let a_num = Number(a.substring(1));
            let b_num = Number(b.substring(1));
            if (a_num > b_num) {
                return 1;
            }
        } else {
            return -1;
        }
    }
))
}

//localhost avviser tilkoblingsforsøket

function get(url) {
    let a = fetch(url);  //returnerer et promise
    console.log(a)
    return a
}


