import React from 'react';
import {Button} from 'react-bootstrap';
import {Space} from '../../common/Scaffolding';
import {connect} from "react-redux";
import * as api from "../../../api/index";


class BrevdataControl extends React.Component {
    render() {
        console.log(this.props.brevdata);
        const producing = false;
        return (
            <div className="container-fluid">
                <Button onClick={ () => api.updateXML(this.props.brevdata.brevdataId,this.props.brevdata.xmlInnhold)}>Oppdater</Button>
                <Space />
                <Button onClick={ () => api.saveXMLAsNew(this.props.brevpakke,this.props.brevdata)}>Lagre som ny</Button>
                <Space />
                <Button>Produser brev</Button>
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
        brevpakke: state.menyValg.brevpakke
    };
}


export default connect(
    mapStateToProps
)(BrevdataControl);
