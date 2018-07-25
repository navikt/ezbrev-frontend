import React from 'react';
import { Col, ListGroup, ListGroupItem, Panel, Row } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as adminActions from '~/actions/adminActions';
import * as adminActionsUtil from '~/actions/adminActionsUtil';
import { bestillbrevdata } from '~/api';
import * as dokumentActions from '~/actions/dokumentActions';
import * as dokumentActionsUtil from '~/actions/dokumentActionsUtil';
import AdminBrevdata from './AdminBrevdata';

class AdminTableItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShown: false
        };
    }

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
                        <Col sm={6}>{item.tittel}</Col>
                    </Row>
                </Panel.Heading>
                {this.state.isShown ? (
                    <ListGroup>
                        <ListGroupItem>
                            <Row>
                                <Col sm={3}>Beskrivelse </Col>
                                <Col sm={3} />
                            </Row>
                        </ListGroupItem>
                        <AdminBrevdata malId={item.malId} />
                    </ListGroup>
                ) : null}
            </Panel>
        );
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
        actions: bindActionCreators(adminActions, dispatch),
        utilActionsDok: bindActionCreators(dokumentActionsUtil, dispatch),
        actionsDok: bindActionCreators(dokumentActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminTableItem);
