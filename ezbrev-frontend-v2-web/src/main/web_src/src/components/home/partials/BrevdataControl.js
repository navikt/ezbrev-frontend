import React from 'react';
import { Button } from 'react-bootstrap';
import { Space } from '../../common/Scaffolding';
import { connect } from 'react-redux';
import * as api from '../../../api/index';
import * as dokumentActionsUtil from '../../../actions/dokumentActionsUtil';
import * as brevdataActionsUtil from '../../../actions/brevdataActionsUtil';
import * as dokumentActions from '../../../actions/dokumentActions';
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
            <div className="container-fluid">
                <Button
                    className={'btn btn-primary'}
                    onClick={() =>
                        api.updateXML(
                            this.props.brevdataId,
                            this.props.xmlInnhold
                        )
                    }
                    disabled={this.props.brevdataId === ''}
                >
                    Oppdater
                </Button>
                <Space />
                <Button
                    className={'btn btn-primary'}
                    onClick={() =>
                        this.props.utilActionsBrevdata.saveXMLAsNew(
                            this.props.brevpakke,
                            this.props.beskrivelse,
                            this.props.xmlInnhold,
                            this.props.brevmal
                        )
                    }
                    disabled={
                        this.props.xmlInnhold === '' ||
                        this.props.brevdataBeskrivelse === ''
                    }
                >
                    Lagre som ny
                </Button>
                <Space />
                <Button
                    className={'btn btn-primary'}
                    onClick={() => {
                        const rediger = false;
                        this.props.utilActionsDok.produceDokument(
                            this.props.brevmal.malID,
                            this.props.xmlInnhold,
                            rediger,
                            this.props.miljo
                        );
                    }}
                    disabled={
                        this.props.xmlInnhold === '' ||
                        this.props.brevmal === ''
                    }
                >
                    Produser brev
                </Button>
                <Space />
                <Button
                    className={'btn btn-primary'}
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
                    className={'pull-right btn btn-success'}
                    onClick={() => {
                        api.approveDokument(
                            this.props.brevdataId,
                            this.props.miljo,
                            this.props.beskrivelse,
                            this.props.dokument.journalpostId,
                            this.props.dokument.dokumentInfoId
                        ),
                            api.updateXML(
                                this.props.brevdataId,
                                this.props.xmlInnhold
                            );
                    }}
                    disabled={this.props.dokument === ''}
                >
                    Godkjenn
                </Button>
                <Space />
                <Button
                    className="pull-right brev-compare-btn btn btn-warning"
                    onClick={() => {
                        this.props.actionsDok.setShowModal(true);
                        this.props.utilActionsDok.showSammenlignMedGodkjent(
                            this.props.miljo,
                            this.props.dokument.journalpostId,
                            this.props.dokument.dokumentInfoId,
                            this.props.brevdataId
                        );
                    }}
                    disabled={
                        this.props.dokument === '' ||
                        this.props.isRedigertExternal
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
        brevpakke: state.menyValg.brevpakke,
        miljo: state.menyValg.miljo,
        dokument: state.dokumentReducer.dokument,
        isRedigertExternal: state.dokumentReducer.isRedigertExternal,
        redigerbar: state.menyValg.redigerbar,
        brevmal: state.menyValg.brevmal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        utilActionsDok: bindActionCreators(dokumentActionsUtil, dispatch),
        utilActionsBrevdata: bindActionCreators(brevdataActionsUtil, dispatch),
        actionsDok: bindActionCreators(dokumentActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrevdataControl);
