import React from 'react';
import {Button} from 'react-bootstrap';
import {Space} from '../../common/Scaffolding';
import {connect} from 'react-redux';
import * as api from '../../../api/index';
import * as dokumentActionsUtil from '../../../actions/dokumentActionsUtil';
import * as brevdataActionsUtil from '../../../actions/brevdataActionsUtil';
import {bindActionCreators} from 'redux';


class BrevdataControl extends React.Component {
    render() {
        console.log(this.props.brevdata);
        const producing = false;
        return (
            <div className="container-fluid">
                <Button className={"btn btn-primary"}
                    onClick={() =>
                        api.updateXML(
                            this.props.brevdata.brevdataId,
                            this.props.brevdata.xmlInnhold
                        )
                    }
                >
                    Oppdater
                </Button>
                <Space />
                <Button className={"btn btn-primary"}
                    onClick={() =>
                        this.props.utilActionsBrevdata.saveXMLAsNew(
                            this.props.brevpakke,
                            this.props.brevdata
                        )
                    }
                >
                    Lagre som ny
                </Button>
                <Space />
                <Button className={"btn btn-primary"}
                    onClick={() => {
                        const rediger = false;
                        this.props.utilActionsDok.produceDokument(
                            this.props.brevdata.dokumentmal.dokumenttypeId,
                            this.props.brevdata.xmlInnhold,
                            rediger,
                            this.props.miljo
                        );
                    }}
                >
                    Produser brev
                </Button>
                <Space />
                <Button className={"btn btn-primary"}
                    onClick={() => {
                        const rediger = true;
                        this.props.utilActionsDok.produceDokument(
                            this.props.brevdata.dokumentmal.dokumenttypeId,
                            this.props.brevdata.xmlInnhold,
                            rediger,
                            this.props.miljo
                        );
                    }}
                >{producing ? 'Hent brev' : 'Rediger brev'}</Button>
                <Button
                    className={"pull-right btn btn-success" }
                    onClick={() => {
                        console.log('journalpostId:',this.props.dokument.journalpostId)
                        console.log('dokumentInfoId:',this.props.dokument.dokumentInfoId)
                        api.approveDokument(
                            this.props.brevdata.brevdataId,
                            this.props.miljo,
                            this.props.brevdata.beskrivelse,
                            this.props.dokument.journalpostId,
                            this.props.dokument.dokumentInfoId
                        ),
                            api.updateXML(
                                this.props.brevdata.brevdataId,
                                this.props.brevdata.xmlInnhold
                            );
                    }}
                >
                    Godkjenn
                </Button>
                <Space />
                <Button className="pull-right brev-compare-btn btn btn-warning">
                    Sammenlign med godkjent
                </Button>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        brevdata: state.brevdataReducer.brevdata,
        brevpakke: state.menyValg.brevpakke,
        miljo: state.menyValg.miljo,
        dokument: state.dokument.dokument
    };
}

function mapDispatchToProps(dispatch) {
    return {
        utilActionsDok: bindActionCreators(dokumentActionsUtil, dispatch),
        utilActionsBrevdata: bindActionCreators(brevdataActionsUtil,dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrevdataControl);
