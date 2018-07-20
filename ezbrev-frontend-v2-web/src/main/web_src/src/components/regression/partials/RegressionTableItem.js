import React from 'react';
import {
    Button,
    Col,
    ListGroup,
    ListGroupItem,
    Panel,
    Row
} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import * as menyValgActionsUtil from '~/actions/menyValgActionsUtil';
import * as menyValgActions from '~/actions/menyValgActions';
import { connect } from 'react-redux';
import Brev from '../partials/Brev';
import { getRegressionObjects } from '~/components/regression/partials/RegressionUtil';
import * as regressionActions from '~/actions/regressionActions';
import * as regressionActionsUtil from '~/actions/regressionActionsUtil';
import { bestillbrevdata } from '~/api';
import * as brevdataActionsUtil from "~/actions/brevdataActionsUtil";
import * as dokumentActions from "~/actions/dokumentActions";
import * as dokumentActionsUtil from "~/actions/dokumentActionsUtil";

class RegressionTableItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShown: false
        };
    }

    regtestMal = malId => {
        //this.props.actions.setRegressionModal(true);
        let regressionObjects = getRegressionObjects(
            [malId],
            this.props.brevdataList
        );
        this.props.utilActions.startRegressionTest(
            regressionObjects,
            this.props.miljo
        );
    };

    sammenlign = (brevdataId, dokumenttypeId) => {
        bestillbrevdata(brevdataId, dokumenttypeId, this.props.miljo).then(
            json => {
                this.props.utilActionsDok.showSammenlignMedGodkjent(
                    this.props.miljo,
                    json.journalpostId,
                    json.dokumentInfoId,
                    brevdataId
                );
            }
        );
    };

    render() {
        const item = this.props.item;

        return (
            <Panel>
                <Panel.Heading
                    onClick={() =>
                        this.setState({ isShown: !this.state.isShown })
                    }
                >
                    <Row>
                        <Col sm={6}>{item.malId}</Col>
                        <Col sm={3}>{item.tittel}</Col>
                    </Row>
                </Panel.Heading>
                {this.state.isShown ? (
                    <ListGroup>
                        <ListGroupItem>
                            <Row>
                                <Col sm={3}>Beskrivelse</Col>
                                <Col sm={3}>Likhet</Col>
                                <Col sm={3}>
                                    <Button
                                        bsSize="small"
                                        onClick={() =>
                                            this.regtestMal(item.malId)
                                        }
                                    >
                                        Regtest mal
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroupItem>
                        {Brev(
                            item.malId,
                            this.sammenlign,
                            this.props.brevdataList,
                            this.props.regressionSimilarity
                        )}
                    </ListGroup>
                ) : null}
            </Panel>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        miljoList: state.regressjonReducer.regressjonMiljoList,
        brevInfo: state.regressjonReducer.regressjonBrevInfo,
        brevpakkeList: state.regressjonReducer.regressjonBrevpakkeList,
        brevmalList: state.regressjonReducer.regressjonBrevmalList,
        miljo: state.regressjonReducer.regressjonMiljo,
        brevpakke: state.regressjonReducer.regressjonBrevpakke,
        brevdataList: state.regressjonReducer.regressjonBrevdataList,
        regressionSimilarity: state.regressjonReducer.regressionSimilarity
    };
}

function mapDispatchToProps(dispatch) {
    return {
        utilActions: bindActionCreators(regressionActionsUtil, dispatch),
        actions: bindActionCreators(regressionActions, dispatch),
        utilActionsDok: bindActionCreators(dokumentActionsUtil, dispatch),
        actionsDok: bindActionCreators(dokumentActions, dispatch)
        /* wrapper alle actions i mappen bindActionCreators i et kall til dispatch*/
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegressionTableItem);
