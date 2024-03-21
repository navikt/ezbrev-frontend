const serverUrl = 'https://ezbrev-backend.dev.intern.nav.no';

function sortList(list) {
    let sortedList = [];
    for (let i = 0; i < list.length; i++) {
        if (list[i][0] === 'q' || list[i][0] === 't') {
            sortedList.push(list[i]);
        }
    }
    sortedList.sort(function (a, b) {
        if (a[0] > b[0]) {
            return 1;
        } else if (a[0] < b[0]) {
            return -1;
        } else if (parseInt(a.slice(1), 10) > parseInt(b.slice(1), 10)) {
            return 1;
        } else {
            return -1;
        }
    });
    return sortedList;
}

export function getMiljoList() {
    const url = `${serverUrl}/rest/env`;
    return get(url)
        .then((res) => res.json())
        .then((json) => sortList(json));
}

export function getBrevInfo(miljo) {
    const url = `${serverUrl}/rest/brevmaler/${miljo}`;
    return get(url).then((res) => res.json());
}

export function getBrevpakkeVersjon(miljo, brevpakke) {
    const url = `${serverUrl}/rest/brevpakkeversjon/${brevpakke}/${miljo}`;
    return get(url).then((res) => res.json());
}

export function getBrevdataList(brevmalId, brevpakke) {
    const url = `${serverUrl}/rest/${brevpakke}/${brevmalId}/brevdata`;
    return get(url).then((res) => res.json());
}

export function getBrevdata(brevdataID) {
    const url = `${serverUrl}/rest/getbrevdatabyid/${brevdataID}`;
    return get(url).then((res) => res.json());
}

export function updateXML(brevdataId, xml, beskrivelse) {
    const url = `${serverUrl}/rest/updatebrevdata`;
    let data = { brevdataId, xml, beskrivelse };
    return post(url, data).then((res) => {
        return res.json();
    });
}

export function postBrevdataAsNew(brevpakkenavn, beskrivelse, Xml, brevmal) {
    const url = `${serverUrl}/rest/postbrevdata`;
    const dokumentmal = brevmal.malID;
    const tittel = brevmal.dokumentTittel;
    const redigerbar = brevmal.redigerbar;
    const data = {
        brevpakkenavn,
        dokumentmal,
        tittel,
        redigerbar,
        beskrivelse,
        Xml,
    };
    return post(url, data).then((res) => {
        return res.json();
    });
}

export function getDokument(brevmal, xml, rediger, miljo, utledRegisterInfo) {
    const url = `${serverUrl}/rest/bestill/${miljo}`;
    const data = { brevmal, xml, rediger, utledRegisterInfo };
    return post(url, data).then((res) => {
        return res.json();
    });
}

export function getRedigertBrev(miljo, jounralpostId, dokumentInfoId) {
    const url = `${serverUrl}/rest/brev/${miljo}/${jounralpostId}/${dokumentInfoId}`;
    return get(url).then((res) => {
        return res.json();
    });
}

export function getSammenlignMedGodkjent(
    env,
    journalpostId,
    dokumentInfoId,
    brevdataId,
    brevmal,
    xml,
    rediger,
) {
    const url = `${serverUrl}/rest/sammenlign`;
    const data = {
        env,
        journalpostId,
        dokumentInfoId,
        brevdataId,
        brevmal,
        xml,
        rediger,
    };
    return post(url, data).then((res) => {
        return res.json();
    });
}

export function getBrevdataInBrevpakke(brevpakkeNavn, maler) {
    const url = `${serverUrl}/rest/${brevpakkeNavn}/getBrevdatasByDokumentmalIds`;
    return post(url, maler).then((res) => res.json());
}

export function approveDokument(
    brevdataId,
    env,
    beskrivelse,
    journalpostId,
    dokumentInfoId,
) {
    const url = `${serverUrl}/rest/brevdata/godkjenn`;
    let data = { brevdataId, env, beskrivelse, journalpostId, dokumentInfoId };
    return post(url, data).then((res) => {
        return res.json();
    });
}
export function getLastApprovedPDF(brevdataId) {
    const url = `${serverUrl}/rest/brevdata/hentLastGodkjent/${brevdataId}`;
    return get(url).then((dokument) => dokument.json());
}

export function getOutputXML(xml) {
    const url = `${serverUrl}/rest/xmlconverter/convert`;
    const data = { xml };
    return post(url, data).then((res) => {
        return res.json();
    });
}

export function getSimilarity(env, sammenlignPercentageObject) {
    const url = `${serverUrl}/rest/sammenlignprosent/${env}`;
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(sammenlignPercentageObject),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    })
        .then((res) => res.json())
        .then((json) => ({ json: json, input: sammenlignPercentageObject }));
}

export function getXmlByJournalpostId(env, brevsystem, journalpostId) {
    const url = `${serverUrl}/rest/inspect/${env}/${brevsystem}/jpid/${journalpostId}`;
    return get(url).then((res) => res.json());
}

export function getXmlByDokumentInfoId(env, brevsystem, dokumentInfoId) {
    const url = `${serverUrl}/rest/inspect/${env}/${brevsystem}/dokid/${dokumentInfoId}`;
    return get(url).then((res) => res.json());
}

export function getXmlByMottakerId(env, brevsystem, mottakerId) {
    const url = `${serverUrl}/rest/inspect/${env}/${brevsystem}/mottaker/${mottakerId}`;
    return get(url).then((res) => res.json());
}

export function bestillbrevdata(brevdataId, brevmal, miljo) {
    const url = `${serverUrl}/rest/bestill/${miljo}/${brevdataId}`;
    const data = { brevmal, rediger: false };
    return post(url, data).then((res) => {
        return res.json();
    });
}

export function getPing() {
    const url = `${serverUrl}/rest/selftest`;
    return get(url).then((res) => res.json());
}

export function getPingByEnv(env) {
    const url = `${serverUrl}/rest/selftest/${env}`;
    return fetch(url, {
        credentials: 'include',
    })
        .then((res) => res.json())
        .then((json) => ({ json, env: env }));
}

export function post(url, data) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    }).then((res) => {
        if (!res.ok) {
            res.json().then((error) => printErrorMessage(url, error));
            throw res;
        } else {
            return res;
        }
    });
}

function get(url) {
    return fetch(url, {
        credentials: 'include',
    }).then((res) => {
        if (!res.ok) {
            res.json().then((error) => printErrorMessage(url, error));
            throw res;
        } else {
            return res;
        }
    });
}

export function printErrorMessage(url, error) {
    console.warn(
        'URL: ' +
            url +
            '\n' +
            'Error: ' +
            error.error +
            '\n' +
            'Status: ' +
            error.status +
            '\n' +
            'Feilmelding: ' +
            error.message,
    );
}
