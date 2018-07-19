import * as actions from '~/actions/dokumentActions';
import * as errorActions from '~/actions/errorActions';
import * as api from '~/api';
import { setIsRedigertExternal } from '~/actions/dokumentActions';

export function displayBase64PDF(base64) {
    // Create src url.
    let s = 'data:' + 'application/pdf' + ';base64,' + base64;
    // Open a new window for the base64 PDF.
    let pdfwindow = window.open('');
    // Insert it into an iframe in the new window.
    pdfwindow.document.write(
        "<iframe src='" +
            s +
            "' style='display:block; margin: 0px; padding: 0px; border: 0px; width: 100%; height: 100%' />"
    );
    // Set the margins to 0px, since the browser sets it to 8px after the iframe-insertion.
    pdfwindow.document.body.style.margin = '0px 0px 0px 0px';
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
                if ('error' in dokument) {
                    dispatch(errorActions.displayError(dokument.message, dokument.status + " " + dokument.error));
                } else {
                    return dokument.metawriteUri !== null
                        ? (window.open(dokument.metawriteUri()),
                          dispatch(actions.setIsRedigertExternal(true)))
                        : displayBase64PDF(dokument.document);
                }
            })
            .catch(error => {
                throw error;
            });
    };
}

export function showLastApprovedPDF(brevdataId) {
    return function() {
        return api
            .getLastApprovedPDF(brevdataId)
            .then(PDF => displayBase64PDF(PDF.document))
            .catch(error => {
                throw error;
            });
    };
}

export function showRedigertBrev(miljo, journalpostId, dokumentInfoId) {
    return function() {
        return api
            .getRedigertBrev(miljo, journalpostId, dokumentInfoId)
            .then(PDF => displayBase64PDF(PDF.document))
            .catch(error => {
                throw error;
            });
    };
}

export function showSammenlignMedGodkjent(
    miljo,
    journalpostId,
    dokumentInfoId,
    brevdataId
) {
    return function(dispatch) {
        return api
            .getSammenlignMedGodkjent(
                miljo,
                journalpostId,
                dokumentInfoId,
                brevdataId
            )
            .then(sammenlignInfo => {
                dispatch(actions.setSammenlignInfo(sammenlignInfo));
            });
    };
}
