import React from 'react';
import { Button, Col, ListGroupItem, Modal, Row } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import * as adminActions from '~/actions/adminActions';
import * as adminActionsUtil from '~/actions/adminActionsUtil';
import { connect } from 'react-redux';
import * as api from '../../../api/index';

class AdminBrevdata extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            beskrivelse: '',
            brevdataId: 0,
            malId: 0
        };
    }
    deletionConfirm = (beskrivelse, brevdataId, malId) => {
        this.setState({ showModal: true, beskrivelse:beskrivelse, brevdataId:brevdataId, malId:malId });
    };

    handleClose = () => {
        this.setState({ showModal: false });
    };

    deleteBrevdata = (brevdataId, malId) => {
        this.handleClose();
        api.deleteBrevdataExternal(brevdataId);
        this.props.actions.deleteBrevdataInternal(brevdataId, malId);
    };

    render() {
        if (this.props.malId in this.props.brevdataList) {
            return (
                <div>
                    {this.props.brevdataList[this.props.malId].map(brevdata => (
                        <ListGroupItem key={brevdata.brevdataId}>
                            <Row>
                                <Col sm={3}>
                                    {brevdata.beskrivelse +
                                        ' Id: ' +
                                        brevdata.brevdataId}
                                </Col>
                                <Col sm={3}>
                                    <Button
                                        className={'btn btn-primary'}
                                        bsSize="xsmall"
                                        onClick={() => {
                                            this.deletionConfirm(
                                                brevdata.beskrivelse,
                                                brevdata.brevdataId,
                                                this.props.malId
                                            );
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
                                            console.log('onclick')
                                            this.props.utilActions.fetchAdminPngPages(this.props.miljo,brevdata.brevdataId);
                                            this.props.actions.setAdminShowModal(true);
                                            this.props.actions.setAdminBrevdataId(brevdata.brevdataId)
                                        }}


                                    >
                                        Rediger maskering
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroupItem>
                    ))}
                    <Modal
                        show={this.state.showModal}
                        onHide={this.handleClose}
                    >
                        <Modal.Header>
                            <Modal.Title>Bekreft sletting</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4>Ønsker du å slette brevdata {this.state.beskrivelse}?</h4>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                onClick={() =>
                                    this.deleteBrevdata(
                                        this.state.brevdataId,
                                        this.state.malId
                                    )
                                }
                            >
                                Ja
                            </Button>
                            <Button onClick={this.handleClose}>Nei</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            );
        } else {
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
