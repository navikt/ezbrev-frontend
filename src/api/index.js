import React from 'react';

//@CrossOrigin(origins = "http://localhost:3000")     //dette må skrives inn i den aktuelle controlleren i back end

const serverUrl = 'http://localhost:8080';
//const serverUrl = 'https://ezbrev-backend-t4.nais.preprod.local';

//http://localhost:8080/rest/t4/dokumenttypeinfo
//Må sortere denne infoen for å finne brevpakker og tilhørende brevmaler
//Må også kalle for å finne lagrede brevmaldata til venstre

export function getMiljoList() {
    const url = `${serverUrl}/rest/env`;
    return get(url)
        .then(res => res.json())
        .then(json =>
            json.sort(function(a, b) {
                //evt lage egen funksjon for sort? og ha den et annet sted
                if (a.charAt(0) > b.charAt(0)) {
                    return 1;
                } else if (a.charAt(0) === b.charAt(0)) {
                    let a_num = Number(a.substring(1));
                    let b_num = Number(b.substring(1));
                    if (a_num > b_num) {
                        return 1;
                    }
                } else {
                    return -1;
                }
            })
        );
}

export function getBrevInfo(miljo) {
    const url = `${serverUrl}/rest/brevmaler/${miljo}`;
    return get(url).then(res => res.json()); //må sjekke om res.ok er true før vi gjør om til json
}

export function getBrevpakkeVersjon(miljo,brevpakkenavn){
    const url=`${serverUrl}/rest/brevpakkeversjon/${brevpakkenavn}/${miljo}`
    return get(url).then(res=>res.json());
}

export function getBrevdataList(brevmal, brevpakke) {
    const url = `${serverUrl}/rest/${brevpakke}/${brevmal}/brevdata`;
    return get(url).then(res => res.json()); //må sjekke om res.ok er true før vi gjør om til json
}

export function getBrevdata(brevdataID) {
    const url = `${serverUrl}/rest/getbrevdatabyid/${brevdataID}`;
    return get(url).then(res => res.json()); //må sjekke om res.ok er true før vi gjør om til json
}

export function updateXML(brevdataId, xml) {
    const url = `${serverUrl}/rest/updatebrevdata`;
    let data = { brevdataId, xml };
    return post(url, data).then(res => {
        return res.json();
    });
}

export function postBrevdataAsNew(brevpakkenavn, brevdata) {
    const url = `${serverUrl}/rest/postbrevdata`;
    const { dokumenttypeId, tittel, redigerbar } = brevdata.dokumentmal;
    const dokumentmal = dokumenttypeId;
    const Xml = brevdata.xmlInnhold; //Må matche navn i backend
    const beskrivelse = brevdata.beskrivelse;
    const data = {
        brevpakkenavn,
        dokumentmal,
        tittel,
        redigerbar,
        beskrivelse,
        Xml
    };
    return post(url, data).then(res => {
        return res.json();
    });
}

export function getDokument(brevmal, xml, rediger, miljo) {
    const url = `${serverUrl}/rest/bestill/${miljo}`;
    const data = { brevmal, xml, rediger };
    return post(url, data).then(res => {
        return res.json();
    });
}

export function getRedigertBrev(miljo, jounralpostId, dokumentInfoId) {
    const url = `${serverUrl}/rest/brev/${miljo}/${jounralpostId}/${dokumentInfoId}`;
    return get(url).then(res => {
        return res.json();
    });
}

export function getSammenlignMedGodkjent(env,journalpostId,dokumentInfoId,brevdataId){
    const url=`${serverUrl}/rest/sammenlign`
    const data={env,journalpostId,dokumentInfoId,brevdataId}
    return post(url,data).then(res=>{return res.json()})
}

export function getBrevdataInBrevpakke(brevpakkeNavn, maler) {
    const url = `${serverUrl}/rest/${brevpakkeNavn}/getBrevdatasByDokumentmalIds`;
    return post(url, maler).then(json => json);
}

export function post(url, data) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
}
export function approveDokument(
    brevdataId,
    env,
    beskrivelse,
    journalpostId,
    dokumentInfoId
) {
    const url = `${serverUrl}/rest/brevdata/godkjenn`;
    let data = { brevdataId, env, beskrivelse, journalpostId, dokumentInfoId };
    return post(url, data).then(res => {
        return res.json();
    });
}
export function getLastApprovedPDF(brevdataId) {
    const url = `${serverUrl}/rest/brevdata/hentLastGodkjent/${brevdataId}`;
    return get(url).then(dokument => dokument.json());
}

export function getOutputXML(xml){
    const url=`${serverUrl}/rest/xmlconverter/convert`;
    const data={xml}
    return post(url,data).then(res => {
        return res.json();
    });
}

export function post(url, data) {
    console.log(data);
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    });
}

function get(url) {
    return fetch(url); //returnerer et promise
}

export function getSimilarity(env, sammenlignPercentageObject) {
    const url = `${serverUrl}/rest/sammenlignprosent/${env}`;
    return post(url, sammenlignPercentageObject).then(res => ({
        json: res,
        input: sammenlignPercentageObject
    }));
}

export function getXmlByJournalpostId(env, brevsystem, journalpostId) {
    const url = `${serverUrl}/rest/inspect/${env}/${brevsystem}/jpid/${journalpostId}`;
    return get(url).then(res => res.json()); //må sjekke om res.ok er true før vi gjør om til json
}

export function getXmlByDokumentInfoId(env, brevsystem, dokumentInfoId) {
    const url = `${serverUrl}/rest/inspect/${env}/${brevsystem}/dokid/${dokumentInfoId}`;
    return get(url).then(res => res.json()); //må sjekke om res.ok er true før vi gjør om til json
}

export function getXmlByMottakerId(env, brevsystem, mottakerId) {
    const url = `${serverUrl}/rest/inspect/${env}/${brevsystem}/mottaker/${mottakerId}`;
    return get(url).then(res => res.json()); //må sjekke om res.ok er true før vi gjør om til json
}
