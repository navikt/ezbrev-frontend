import React from 'react';
import {Button, Col, ListGroupItem, Row} from 'react-bootstrap';
import * as api from '../../../api';
import {bindActionCreators} from "redux";
import * as adminActions from '~/actions/adminActions';
import * as adminActionsUtil from '~/actions/adminActionsUtil';
import {connect} from "react-redux";

class AdminBrevdata extends React.Component {
    render() {
        if (this.props.malId in this.props.brevdataList) {
            return this.props.brevdataList[this.props.malId].map(brevdata => (
                <ListGroupItem key={brevdata.brevdataId}>
                    <Row>
                        <Col sm={3}>
                            {brevdata.beskrivelse + ' Id: ' + brevdata.brevdataId}
                        </Col>
                        <Col sm={3}>
                            <Button
                                className={'btn btn-primary'}
                                bsSize="xsmall"
                                onClick={() => {
                                    api.deleteBrevdataExternal(brevdata.brevdataId)
                                    this.props.actions.deleteBrevdataInternal(brevdata.brevdataId,this.props.malId)
                                }}
                            >
                                Slette
                            </Button>
                        </Col>
                        <Col sm={3}>
                            <Button
                                className={'btn btn-primary'}
                                bsSize="xsmall"
                                onClick={()=>{
                                    this.props.utilActions.fetchAdminPngPages(this.props.miljo,brevdata.brevdataId);
                                    this.props.utilActions.fetchMaskList(brevdata.brevdataId);
                                    this.props.actions.setShowModal(true);
                                }}
                            >
                                Rediger maskering
                            </Button>
                        </Col>
                    </Row>
                </ListGroupItem>
            ));
        }
        else{
            return null;
        }
    }
}


function mapStateToProps(state, ownProps) {
    return {
        miljoList: state.admin.adminMiljoList,
        brevInfo: state.admin.adminBrevInfo,
        brevpakkeList: state.admin.adminBrevpakkeList,
        brevmalList: state.admin.adminBrevmalList,
        miljo: state.admin.adminMiljo,
        brevpakke: state.admin.adminBrevpakke,
        brevdataList: state.admin.adminBrevdataList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        utilActions: bindActionCreators(adminActionsUtil, dispatch),
        actions: bindActionCreators(adminActions, dispatch)


    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminBrevdata);
