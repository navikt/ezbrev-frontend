import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as regressionActions from '~/actions/RegressionActions';
import * as regressionActionsUtil from '~/actions/regressionActionsUtil';
import ListItem from '../partials/ListItem';
import RegressionModal from '../partials/RegressionModal';
import { getSimilarity } from '~/api';

class RegressionControl extends React.Component {
    handleClick = () => {
        this.props.actions.setRegressionModal(true);
        let regressionObjects = this.getRegressionObjects();
        let prosenter = {};
        for (let i = 0; i < regressionObjects.length; i++) {
            getSimilarity(this.props.miljo, regressionObjects[i]).then(
                object => {
                    const json = object.json;
                    const input = object.input;
                    'error' in json
                        ? (prosenter[input.brevdataId] = json.message)
                        : (prosenter[json.brevdataId] = json.percentage);
                    this.props.actions.setRegressionSimilarity(
                        JSON.parse(JSON.stringify(prosenter))
                    );
                }
            );
        }
    };

    getRegressionObjects = () => {
        let regressionObjects = [];
        for (let key in this.props.brevdataList) {
            if (this.props.brevdataList[key].length > 0) {
                this.props.brevdataList[key].forEach(brevdata =>
                    regressionObjects.push({
                        brevdataId: brevdata.brevdataId,
                        brevmal: key
                    })
                );
            }
        }
        return regressionObjects;
    };

    setBrevMalList = brevpakke => {
        let brevmalList = [];
        this.props.brevInfo.forEach(
            item =>
                item.brevPakke === brevpakke
                    ? brevmalList.push({
                          malId: item.malID,
                          tittel: item.dokumentTittel
                      })
                    : null
        );
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
                    />
                </Col>
                <Col sm={3}>
                    <Button
                        className={'btn btn-info'}
                        onClick={this.handleClick}
                        id="start_regresjonstest_button"
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
        actions: bindActionCreators(regressionActions, dispatch)
        /* wrapper alle actions i mappen bindActionCreators i et kall til dispatch*/
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegressionControl);
