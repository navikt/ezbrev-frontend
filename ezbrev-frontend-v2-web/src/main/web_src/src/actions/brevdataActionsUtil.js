import * as api from '~/api';
import * as actions from '~/actions/brevdataActions';

export function selectBrevdata(brevdataId) {
    return function(dispatch) {
        return api
            .getBrevdata(brevdataId)
            .then(brevdata => {
                dispatch(
                    actions.setBrevdata(
                        brevdata.beskrivelse,
                        brevdata.brevdataId,
                        brevdata.changeStamp,
                        brevdata.xmlInnhold
                    )
                );
            })
            .catch(error => {
                throw error;
            });
    };
}

export function saveXMLAsNew(
    brevpakke,
    brevdataBeskrivelse,
    xmlInnhold,
    brevmal
) {
    return function(dispatch) {
        return api
            .postBrevdataAsNew(
                brevpakke,
                brevdataBeskrivelse,
                xmlInnhold,
                brevmal
            )
            .then(brevdata => {
                dispatch(
                    actions.setBrevdata(
                        brevdata.beskrivelse,
                        brevdata.brevdataId,
                        brevdata.changeStamp,
                        brevdata.xmlInnhold
                    )
                );
            })
            .catch(error => {
                throw error;
            });
    };
}
