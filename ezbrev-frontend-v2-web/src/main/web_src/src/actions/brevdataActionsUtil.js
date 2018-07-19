import * as api from '~/api';
import * as actions from '~/actions/brevdataActions';
import * as actionsMenyValg from '~/actions/menyValgActions';

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
                return brevdata;
            })
            .then(brevdata => dispatch(actionsMenyValg.addItemBrevdataList(brevdata)))
            .catch(error => {
                throw error;
            });
    };
}
