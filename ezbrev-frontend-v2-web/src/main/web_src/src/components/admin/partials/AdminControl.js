import React from 'react';
import { FormControl, Col, Row } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as adminActions from '~/actions/adminActions';
import * as adminActionsUtil from '~/actions/adminActionsUtil';
import * as pingActions from '../../../actions/pingActions';
import ListItem from '../../common/ListItem';
import { getPingByEnv } from '../../../api';

class AdminControl extends React.Component {
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
        this.props.actions.setAdminBrevpakke(brevpakke);
        const brevmalList = this.setBrevMalList(brevpakke);
        this.props.actions.setAdminBrevmalList(brevmalList);
        let brevmalIds = [];
        brevmalList.forEach(item => brevmalIds.push(item.malId));
        this.props.utilActions.setAdminBrevdataList(
            brevpakke,
            brevmalList,
            brevmalIds,
            adminActions.setAdminBrevdataList
        );
    };

    render() {
        return (
            <Row>
                <Col sm={3}>
                    <ListItem
                        className="btn-fill"
                        title={'Miljø: ' + this.props.miljo}
                        id="1"
                        func={miljo => {
                            this.props.utilActions.selectAdminMiljo(
                                miljo,
                                adminActions.setAdminBrevInfo
                            );
                            this.props.actions.setAdminMiljo(miljo);
                            getPingByEnv(miljo).then(ping =>
                                this.props.pingActions.setPing(ping)
                            );
                        }}
                        list={this.props.miljoList}
                    />
                </Col>
                <Col sm={3}>
                    <div className="parent padding-right">
                        <div className="child inline-block-child big">
                            <ListItem
                                className="btn-fill"
                                title={'Brevpakke: ' + this.props.brevpakke}
                                id="1"
                                func={brevpakke => {
                                    this.updateBrevpakke(brevpakke);
                                    this.props.utilActions.fetchAdminBrevpakkeVersjon(
                                        this.props.miljo,
                                        brevpakke,
                                        adminActions.setAdminBrevpakkeVersjon
                                    );
                                }}
                                list={this.props.brevpakkeList}
                                isDisabled={this.props.miljo === ''}
                            />
                        </div>
                        <div className="child inline-block-child small">
                            <FormControl
                                readOnly
                                value={
                                    this.props.brevpakkeVersjon
                                        ? this.props.brevpakkeVersjon
                                        : ''
                                }
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        miljo: state.admin.adminMiljo,
        miljoList: state.admin.adminMiljoList,
        brevpakke: state.admin.adminBrevpakke,
        brevpakkeList: state.admin.adminBrevpakkeList,
        brevpakkeVersjon: state.admin.adminBrevpakkeVersjon,
        brevInfo: state.admin.adminBrevInfo
    };
}

function mapDispatchToProps(dispatch) {
    return {
        utilActions: bindActionCreators(adminActionsUtil, dispatch),
        pingActions: bindActionCreators(pingActions, dispatch),
        actions: bindActionCreators(adminActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminControl);
