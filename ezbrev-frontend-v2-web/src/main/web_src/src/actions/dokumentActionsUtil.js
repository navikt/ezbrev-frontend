import * as actions from '~/actions/dokumentActions';
import * as dokumentActions from '~/actions/dokumentActions';
import * as errorActions from '~/actions/errorActions';
import * as api from '~/api';
import { setIsRedigertExternal } from '~/actions/dokumentActions';
import { setIsLoading } from './loadingActions';

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

export function produceDokument(brevmal, xml, rediger, miljo, utledRegisterInfo) {
    return function(dispatch) {
        dispatch(setIsLoading(true));
        return api
            .getDokument(brevmal, xml, rediger, miljo, utledRegisterInfo)
            .then(dokument => {
                dispatch(actions.setDokument(dokument));
                return dokument;
            })
            .then(dokument => {
                dokument.metawriteUri !== null
                    ? (window.open(dokument.metawriteUri),
                      dispatch(actions.setIsRedigertExternal(true)))
                    : displayBase64PDF(dokument.document);
            })
            .catch(error => {
                dispatch(setIsLoading(false));
                throw error;
            });
    };
}

export function showLastApprovedPDF(brevdataId) {
    return function(dispatch) {
        dispatch(setIsLoading(true));
        return api
            .getLastApprovedPDF(brevdataId)
            .then(PDF => {displayBase64PDF(PDF.document);
                dispatch(setIsLoading(false));
            })
            .catch(error => {
                dispatch(setIsLoading(false));
                throw error;
            });
    };
}

export function showRedigertBrev(miljo, journalpostId, dokumentInfoId) {
    return function(dispatch) {
        dispatch(setIsLoading(true));
        return api
            .getRedigertBrev(miljo, journalpostId, dokumentInfoId)
            .then(PDF => {displayBase64PDF(PDF.document);
                dispatch(setIsLoading(false))})
            .catch(error => {
                dispatch(setIsLoading(false));
                throw error;
            });
    };
}

export function showSammenlignMedGodkjent(
    miljo,
    journalpostId,
    dokumentInfoId,
    brevdataId,
    brevmal,
    xml,
    rediger
) {
    return function(dispatch) {
        dispatch(setIsLoading(true));
        return api
            .getSammenlignMedGodkjent(
                miljo,
                journalpostId,
                dokumentInfoId,
                brevdataId,
                brevmal,
                xml,
                rediger
            )
            .then(sammenlignInfo => {
                if ('error' in sammenlignInfo) {
                    dispatch(
                        errorActions.displayError(
                            sammenlignInfo.message,
                            sammenlignInfo.status + ' ' + sammenlignInfo.error
                        )
                    );
                } else {
                    dispatch(actions.setSammenlignInfo(sammenlignInfo));
                    dispatch(dokumentActions.setShowModal(true));
                }
            })
            .catch(error => {
                dispatch(setIsLoading(false));
                throw error;
            });
    };
}
