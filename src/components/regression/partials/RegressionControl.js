import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as menyValgActions from '~/actions/menyValgActions';
import * as menyValgActionsUtil from '~/actions/menyValgActionsUtil';
import ListItem from '../partials/ListItem';

class RegressionControl extends React.Component {
    handleClick = () => {
        console.log(this.props.brevInfo);
        console.log('brevmalList', this.props.brevmalList);
        console.log('brevdataList', this.props.brevdataList);
        let brevdataIds = [];
        for (let key in this.props.brevdataList) {
            if (this.props.brevdataList[key].length > 0) {
                this.props.brevdataList[key].forEach(brevdata =>
                    brevdataIds.push(brevdata.brevdataId)
                );
            }
        }
        console.log(brevdataIds);
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
        this.props.actions.setBrevpakke(brevpakke);
        const brevmalList = this.setBrevMalList(brevpakke);
        this.props.actions.setBrevmalRegressionList(brevmalList);
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
                <Col sm={2}>
                    <ListItem
                        title={'Miljø: ' + this.props.miljo}
                        id="1"
                        func={miljo => {
                            this.props.utilActions.selectMiljo(miljo);
                            this.props.actions.setMiljo(miljo);
                        }}
                        list={this.props.miljoList}
                    />
                </Col>
                <Col sm={2}>
                    <ListItem
                        title={'Brevpakke: ' + this.props.brevpakke}
                        id="1"
                        func={brevpakke => this.updateBrevpakke(brevpakke)}
                        list={this.props.brevpakkeList}
                    />
                </Col>
                <Col sm={2}>
                    <Button
                        onClick={this.handleClick}
                        id="start_regresjonstest_button"
                    >
                        Start regresjonstest
                    </Button>
                </Col>
                <Col sm={2} className="regtest-info-box">
                    <span className="regtest-info-test">Testet:</span>
                    <span>Feilet:</span>
                </Col>
            </Row>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        miljoList: state.regressjonMenyValg.miljoList,
        brevInfo: state.regressjonMenyValg.brevInfo,
        brevpakkeList: state.regressjonMenyValg.brevpakkeList,
        brevmalList: state.regressjonMenyValg.brevmalList,
        miljo: state.regressjonMenyValg.miljo,
        brevpakke: state.regressjonMenyValg.brevpakke,
        brevdataList: state.regressjonMenyValg.brevdataList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        utilActions: bindActionCreators(menyValgActionsUtil, dispatch),
        actions: bindActionCreators(menyValgActions, dispatch)
        /* wrapper alle actions i mappen bindActionCreators i et kall til dispatch*/
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegressionControl);
