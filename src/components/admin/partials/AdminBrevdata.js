import React from 'react';
import { bindActionCreators } from 'redux';
import * as adminActions from '~/actions/adminActions';
import * as adminActionsUtil from '~/actions/adminActionsUtil';
import { connect } from 'react-redux';
import * as api from '../../../api/index';
import { BodyShort, Button, Heading, Modal, Table } from '@navikt/ds-react';

class AdminBrevdata extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            beskrivelse: '',
            brevdataId: 0,
            malId: 0,
        };
    }
    deletionConfirm = (beskrivelse, brevdataId, malId) => {
        this.setState({
            showModal: true,
            beskrivelse: beskrivelse,
            brevdataId: brevdataId,
            malId: malId,
        });
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
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>
                                    Beskrivelse{' '}
                                </Table.HeaderCell>
                                <Table.HeaderCell />
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.props.brevdataList[this.props.malId].map(
                                (brevdata) => (
                                    <Table.Row border key={brevdata.brevdataId}>
                                        <Table.DataCell>
                                            {brevdata.beskrivelse +
                                                ' Id: ' +
                                                brevdata.brevdataId}
                                        </Table.DataCell>
                                        <Table.DataCell>
                                            <Button
                                                className={'btn'}
                                                onClick={() => {
                                                    this.deletionConfirm(
                                                        brevdata.beskrivelse,
                                                        brevdata.brevdataId,
                                                        this.props.malId,
                                                    );
                                                }}
                                            >
                                                Slette
                                            </Button>
                                        </Table.DataCell>
                                        <Table.DataCell>
                                            <Button
                                                className={'btn'}
                                                onClick={() => {
                                                    console.log('onclick');
                                                    this.props.utilActions.fetchAdminPngPages(
                                                        this.props.miljo,
                                                        brevdata.brevdataId,
                                                    );
                                                    this.props.actions.setAdminShowModal(
                                                        true,
                                                    );
                                                    this.props.actions.setAdminBrevdataId(
                                                        brevdata.brevdataId,
                                                    );
                                                }}
                                            >
                                                Rediger maskering
                                            </Button>
                                        </Table.DataCell>
                                    </Table.Row>
                                ),
                            )}
                        </Table.Body>
                    </Table>
                    <Modal
                        open={this.state.showModal}
                        onClose={this.handleClose}
                    >
                        <Modal.Content>
                            <Heading>Bekreft sletting</Heading>
                            <BodyShort>
                                <h4>
                                    Ønsker du å slette brevdata{' '}
                                    {this.state.beskrivelse}?
                                </h4>
                            </BodyShort>
                            <Button
                                onClick={() =>
                                    this.deleteBrevdata(
                                        this.state.brevdataId,
                                        this.state.malId,
                                    )
                                }
                            >
                                Ja
                            </Button>
                            <Button onClick={this.handleClose}>Nei</Button>
                        </Modal.Content>
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
        brevdataList: state.admin.adminBrevdataList,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        utilActions: bindActionCreators(adminActionsUtil, dispatch),
        actions: bindActionCreators(adminActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminBrevdata);
