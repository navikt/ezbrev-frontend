import React from 'react';
import { Button } from 'react-bootstrap';
import { Space } from '../../common/Scaffolding';
import { connect } from 'react-redux';
import * as api from '../../../api/index';
import * as dokumentActionsUtil from '../../../actions/dokumentActionsUtil';
import * as brevdataActionsUtil from '../../../actions/brevdataActionsUtil';
import * as dokumentActions from '../../../actions/dokumentActions';
import * as brevdataActions from '../../../actions/brevdataActions';
import * as menyValgActions from '../../../actions/menyValgActions';
import { tempAlert } from '../../common/tempAlert';
import { bindActionCreators } from 'redux';

class BrevdataControl extends React.Component {
    redigerBrev = () => {
        const rediger = true;
        return (
            this.props.utilActionsDok.produceDokument(
                this.props.brevmal.malID,
                this.props.xmlInnhold,
                rediger,
                this.props.miljo
            ),
            this.props.actionsDok.setIsRedigertExternal(true)
        );
    };
    hentBrev = () => {
        return (
            this.props.utilActionsDok.showRedigertBrev(
                this.props.miljo,
                this.props.dokument.journalpostId,
                this.props.dokument.dokumentInfoId
            ),
            this.props.actionsDok.setIsRedigertExternal(false)
        );
    };

    render() {
        return (
            <div>
                <Button
                    className={'btn'}
                    onClick={() => {
                        api.updateXML(
                            this.props.brevdataId,
                            this.props.xmlInnhold
                        )
                            .then(
                                this.props.actionsMenyvalg.setBrevdata(
                                    this.props.brevdataBeskrivelse,
                                    this.props.brevdataId,
                                    this.props.changeStampBrevdata,
                                    this.props.xmlInnhold
                                )
                            )
                            .then(
                                this.props.actionsMenyValg.setBrevdataList(
                                    this.props.brevdataList
                                )
                            );
                        tempAlert('Brevdata ble oppdatert.', 5000);
                    }}
                    disabled={
                        this.props.brevmal === '' ||
                        this.props.xmlInnhold === ''
                    }
                >
                    Oppdater
                </Button>
                <Button
                    className={'btn'}
                    onClick={() => {
                        this.props.utilActionsBrevdata.saveXMLAsNew(
                            this.props.brevpakke,
                            this.props.brevdataBeskrivelse,
                            this.props.xmlInnhold,
                            this.props.brevmal
                        );
                        tempAlert('Brevdata ble lagret som ny.', 5000);
                    }}
                    disabled={
                        this.props.xmlInnhold === '' ||
                        this.props.brevdataBeskrivelse === '' ||
                        this.props.brevmal === ''
                    }
                >
                    Lagre som ny
                </Button>
                <Button
                    className={'btn'}
                    onClick={() => {
                        const rediger = false;
                        this.props.utilActionsDok.produceDokument(
                            this.props.brevmal.malID,
                            this.props.xmlInnhold,
                            rediger,
                            this.props.miljo
                        );
                        this.props.actionsBrevdata.setIsRedigertInternal(false);
                    }}
                    disabled={
                        this.props.xmlInnhold === '' ||
                        this.props.brevmal === ''
                    }
                >
                    Produser brev
                </Button>
                <Button
                    className={'btn'}
                    onClick={
                        this.props.isRedigertExternal
                            ? () => this.hentBrev()
                            : () => this.redigerBrev()
                    }
                    disabled={
                        this.props.xmlInnhold === '' || !this.props.redigerbar
                    }
                >
                    {this.props.isRedigertExternal
                        ? 'Hent brev'
                        : 'Rediger brev'}
                </Button>
                <Button
                    className={'pull-right btn'}
                    onClick={() => {
                        api.approveDokument(
                            this.props.brevdataId,
                            this.props.miljo,
                            this.props.brevdataBeskrivelse,
                            this.props.dokument.journalpostId,
                            this.props.dokument.dokumentInfoId
                        );
                        api.updateXML(
                            this.props.brevdataId,
                            this.props.xmlInnhold
                        );
                        tempAlert('Brevet ble godkjent.', 4000);
                    }}
                    disabled={
                        this.props.dokument === '' ||
                        this.props.isRedigertInternal
                    }
                >
                    Godkjenn
                </Button>
                <Button
                    className="pull-right brev-compare-btn btn"
                    onClick={() => {
                        if (this.props.dokument === '') {
                            this.props.utilActionsDok.showSammenlignMedGodkjent(
                                this.props.miljo,
                                null,
                                null,
                                this.props.brevdataId,
                                this.props.brevmal.malID,
                                this.props.xmlInnhold,
                                false
                            );
                        } else {
                            this.props.utilActionsDok.showSammenlignMedGodkjent(
                                this.props.miljo,
                                this.props.journalpostId,
                                this.props.dokumentInfoId,
                                this.props.brevdataId,
                                this.props.brevmal.malID,
                                this.props.xmlInnhold,
                                false
                            );
                        }
                    }}
                    disabled={
                        this.props.brevmal === '' ||
                        this.props.xmlInnhold === ''
                    }
                >
                    Sammenlign med godkjent
                </Button>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        brevdataBeskrivelse: state.brevdataReducer.beskrivelse,
        brevdataId: state.brevdataReducer.brevdataId,
        xmlInnhold: state.brevdataReducer.xmlInnhold,
        changeStampBrevdata: state.brevdataReducer.changeStamp,
        brevpakke: state.menyValg.brevpakke,
        miljo: state.menyValg.miljo,
        dokument: state.dokumentReducer.dokument,
        isRedigertExternal: state.dokumentReducer.isRedigertExternal,
        isRedigertInternal: state.brevdataReducer.isRedigertInternal,
        redigerbar: state.menyValg.redigerbar,
        brevmal: state.menyValg.brevmal,
        brevdataList: state.menyValg.brevdataList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        utilActionsDok: bindActionCreators(dokumentActionsUtil, dispatch),
        utilActionsBrevdata: bindActionCreators(brevdataActionsUtil, dispatch),
        actionsDok: bindActionCreators(dokumentActions, dispatch),
        actionsBrevdata: bindActionCreators(brevdataActions, dispatch),
        actionsMenyvalg: bindActionCreators(menyValgActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrevdataControl);
