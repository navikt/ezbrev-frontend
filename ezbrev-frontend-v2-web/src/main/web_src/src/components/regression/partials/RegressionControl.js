import React from 'react';
import { Button, Col, FormControl, Row } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as regressionActions from '~/actions/regressionActions';
import * as regressionActionsUtil from '~/actions/regressionActionsUtil';
import * as pingActions from '~/actions/pingActions';

import ListItem from '../../common/ListItem';
import { getRegressionObjects } from '~/components/regression/partials/RegressionUtil';
import { getPingByEnv } from '../../../api';
import BrevpakkeListListener from './BrevpakkeListListener';
import { setBrevpakkeVersjon } from '../../../actions/regressionActions';

class RegressionControl extends React.Component {
    constructor(props) {
        super(props);

        if (Object.keys(this.props.brevdataList).length === 0) {
            const miljo = localStorage.getItem('regressionMiljo');
            if (miljo !== null) {
                this.selectMiljo(miljo);
            }
        }
    }

    startRegression = () => {
        let regressionObjects = getRegressionObjects(
            Object.keys(this.props.brevdataList),
            this.props.brevdataList
        );
        this.props.utilActions.startRegressionTest(
            regressionObjects,
            this.props.miljo
        );
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
        let brevmalList = this.setBrevMalList(brevpakke);
        brevmalList.sort((a, b) => a.malId - b.malId);
        this.props.actions.setRegressionBrevmalList(brevmalList);
        let brevmalIds = [];
        brevmalList.forEach(item => brevmalIds.push(item.malId));
        this.props.utilActions.setBrevdataList(
            brevpakke,
            brevmalList,
            brevmalIds
        );
        this.props.utilActions.fetchBrevpakkeVersjon(
            this.props.miljo,
            brevpakke,
            setBrevpakkeVersjon
        );
    };

    selectMiljo = miljo => {
        this.props.utilActions.selectMiljo(
            miljo,
            regressionActions.setRegressionBrevInfo
        );
        this.props.actions.setRegressionMiljo(miljo);
        getPingByEnv(miljo).then(ping => this.props.pingActions.setPing(ping));
    };

    render() {
        return (
            <div className="padding-bottom">
                <Row>
                    <Col sm={4}>
                        <ListItem
                            className="btn-fill"
                            title={'Miljø: ' + this.props.miljo}
                            id="1"
                            func={miljo => this.selectMiljo(miljo)}
                            list={this.props.miljoList}
                        />
                    </Col>
                    <Col sm={4}>
                        <div className="parent">
                            <div className="child inline-block-child big">
                                <ListItem
                                    className="btn-fill"
                                    title={'Brevpakke: ' + this.props.brevpakke}
                                    id="1"
                                    func={brevpakke =>
                                        this.updateBrevpakke(brevpakke)
                                    }
                                    list={this.props.brevpakkeList}
                                    isDisabled={this.props.miljo === ''}
                                />
                            </div>
                            <div className="child inline-block-child small">
                                <FormControl
                                    className="brevpakke-versjon"
                                    readOnly
                                    value={
                                        this.props.brevpakkeVersjon
                                            ? this.props.brevpakkeVersjon
                                            : ''
                                    }
                                />
                            </div>
                        </div>
                        <BrevpakkeListListener action={this.updateBrevpakke} />
                    </Col>
                    <Col sm={4}>
                        <Button
                            className="fill"
                            onClick={() => this.startRegression()}
                            id="start_regresjonstest_button"
                            disabled={this.props.brevpakke === ''}
                        >
                            Start regresjonstest
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        miljoList: state.regressjonReducer.regressjonMiljoList,
        miljo: state.regressjonReducer.regressjonMiljo,
        brevInfo: state.regressjonReducer.regressjonBrevInfo,
        brevpakkeList: state.regressjonReducer.regressjonBrevpakkeList,
        brevpakke: state.regressjonReducer.regressjonBrevpakke,
        brevdataList: state.regressjonReducer.regressjonBrevdataList,
        brevpakkeVersjon: state.regressjonReducer.brevpakkeVersjon
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
