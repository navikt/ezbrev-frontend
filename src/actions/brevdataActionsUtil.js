import * as api from '~/api';
import * as actions from '~/actions/brevdataActions';
import * as actionsMenyValg from '~/actions/menyValgActions';
import { tempAlert } from '~/components/common/tempAlert';
import { setIsLoading } from './loadingActions';

export function selectBrevdata(brevdataId) {
    return function (dispatch) {
        dispatch(setIsLoading(true));
        return api
            .getBrevdata(brevdataId)
            .then((brevdata) => {
                dispatch(
                    actions.setBrevdata(
                        brevdata.beskrivelse,
                        brevdata.brevdataId,
                        brevdata.changeStamp,
                        brevdata.xmlInnhold,
                    ),
                );
            })
            .catch((error) => {
                dispatch(setIsLoading(false));
                throw error;
            });
    };
}

export function saveXMLAsNew(
    brevpakke,
    brevdataBeskrivelse,
    xmlInnhold,
    brevmal,
) {
    return function (dispatch) {
        dispatch(setIsLoading(true));
        return api
            .postBrevdataAsNew(
                brevpakke,
                brevdataBeskrivelse,
                xmlInnhold,
                brevmal,
            )
            .then((brevdata) => {
                dispatch(
                    actions.setBrevdata(
                        brevdata.beskrivelse,
                        brevdata.brevdataId,
                        brevdata.changeStamp,
                        brevdata.xmlInnhold,
                    ),
                );
                return brevdata;
            })
            .then((brevdata) => {
                dispatch(actionsMenyValg.addItemBrevdataList(brevdata));
                tempAlert('Brevdata ble lagret som ny.', 5000);
                return brevdata;
            })
            .catch((error) => {
                dispatch(setIsLoading(false));
                throw error;
            });
    };
}
