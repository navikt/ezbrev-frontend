import React from 'react';
import { Button } from 'react-bootstrap';
import { Space } from '../../common/Scaffolding';
import { connect } from 'react-redux';
import * as api from '../../../api/index';
import * as dokumentActionsUtil from '../../../actions/dokumentActionsUtil';
import {bindActionCreators} from "redux";

class BrevdataControl extends React.Component {
    render() {
        console.log(this.props.brevdata);
        const producing = false;
        return (
            <div className="container-fluid">
                <Button
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
                <Button
                    onClick={() =>
                        api.saveXMLAsNew(
                            this.props.brevpakke,
                            this.props.brevdata
                        )
                    }
                >
                    Lagre som ny
                </Button>
                <Space />
                <Button
                    onClick={() => {
                        const rediger = false;
                        this.props.utilActions.produceDokument(
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
                <Button>{producing ? 'Hent brev' : 'Rediger brev'}</Button>

                <Button className="pull-right">Godkjenn</Button>
                <Space />
                <Button className="pull-right brev-compare-btn">
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
        miljo: state.menyValg.miljo
    };
}

function mapDispatchToProps(dispatch) {
    return {
        utilActions: bindActionCreators(dokumentActionsUtil, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrevdataControl);
