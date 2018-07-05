import * as actions from '~/actions/dokumentActions';
import * as api from '~/api';
import * as err from './errorActions';
import { store } from '../index.js';
import { dispatch } from 'redux';

export function displayBase64PDF(base64) {
    // Create src url.
    let s = 'data:' + 'application/pdf' + ';base64,' + base64;
    // Open a new window for the base64 PDF.
    let pdfwindow = window.open('');
    if (pdfwindow === null) {
        store.dispatch(
            err.addError(
                'Forgrunnsvinduer er blokkert. Må tillate dette i browserinstillinger.'
            )
        );
    } else {
        // Insert it into an iframe in the new window.
        pdfwindow.document.write(
            "<iframe src='" +
                s +
                "' style='display:block; margin: 0px; padding: 0px; border: 0px; width: 100%; height: 100%' />"
        );
        // Set the margins to 0px, since the browser sets it to 8px after the iframe-insertion.
        pdfwindow.document.body.style.margin = '0px 0px 0px 0px';
    }
}

export function produceDokument(brevmal, xml, rediger, miljo) {
    return function(dispatch) {
        return api
            .getDokument(brevmal, xml, rediger, miljo)
            .then(dokument => {
                dispatch(actions.setDokument(dokument));
                return dokument;
            })
            .then(dokument => {
                displayBase64PDF(dokument.document);
            })
            .catch(error => {
                throw error;
            });
    };
}

export function showLastApprovedPDF(brevdataId) {
    return function(dispatch) {
        return api
            .getLastApprovedPDF(brevdataId)
            .then(dokument => displayBase64PDF(dokument.document))
            .catch(error => {
                throw error;
            });
    };
}
