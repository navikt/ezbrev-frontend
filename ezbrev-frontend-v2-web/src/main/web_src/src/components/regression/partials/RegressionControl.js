import React from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as regressionActions from '~/actions/regressionActions';
import * as regressionActionsUtil from '~/actions/regressionActionsUtil';
import * as pingActions from '~/actions/pingActions';

import ListItem from '../../common/ListItem';
import RegressionModal from '../partials/RegressionModal';
import {getRegressionObjects} from "~/components/regression/partials/RegressionUtil";
import {getPingByEnv} from "../../../api";

class RegressionControl extends React.Component {
    handleClick = () => {
        this.props.actions.setRegressionModal(true);
        let regressionObjects = getRegressionObjects(Object.keys(this.props.brevdataList), this.props.brevdataList);
        this.props.utilActions.startRegressionTest(regressionObjects, this.props.miljo);
    };

    setBrevMalList = brevpakke => {
        let brevmalList = [];
        for (let i = 0; i < this.props.brevInfo.length; i++) {
            if (this.props.brevInfo[i].brevPakke === brevpakke) {
                brevmalList.push({
                    malId: this.props.brevInfo[i].malID,
                    tittel: this.props.brevInfo[i].dokumentTittel
                });
            }
        }
        return brevmalList;
    };

    updateBrevpakke = brevpakke => {
        this.props.actions.setRegressionBrevpakke(brevpakke);
        const brevmalList = this.setBrevMalList(brevpakke);
        this.props.actions.setRegressionBrevmalList(brevmalList);
        let brevmalIds = [];
        brevmalList.forEach(item => brevmalIds.push(item.malId));
        this.props.utilActions.setBrevdataList(
            brevpakke,
            brevmalList,
            brevmalIds
        );
    };

    render() {
        return (
            <Row>
                <Col sm={3}>
                    <ListItem
                        title={'Miljø: ' + this.props.miljo}
                        id="1"
                        func={miljo => {
                            this.props.utilActions.selectMiljo(
                                miljo,
                                regressionActions.setRegressionBrevInfo
                            );
                            this.props.actions.setRegressionMiljo(miljo);
                            getPingByEnv(miljo).then(ping =>
                                this.props.pingActions.setPing(ping)
                            );
                        }}
                        list={this.props.miljoList}
                    />
                </Col>
                <Col sm={3}>
                    <ListItem
                        title={'Brevpakke: ' + this.props.brevpakke}
                        id="1"
                        func={brevpakke => this.updateBrevpakke(brevpakke)}
                        list={this.props.brevpakkeList}
                        isDisabled={this.props.miljo===''}
                    />
                </Col>
                <Col sm={3}>
                    <Button
                        className={'btn btn-info'}
                        onClick={() => this.handleClick()}
                        id="start_regresjonstest_button"
                        disabled={this.props.brevpakke===''}
                    >
                        Start regresjonstest
                    </Button>
                </Col>
                <RegressionModal />
            </Row>
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
        brevdataList: state.regressjonReducer.regressjonBrevdataList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        utilActions: bindActionCreators(regressionActionsUtil, dispatch),
        actions: bindActionCreators(regressionActions, dispatch),
        pingActions: bindActionCreators(pingActions, dispatch)
        /* wrapper alle actions i mappen bindActionCreators i et kall til dispatch*/
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegressionControl);
