import React from 'react';
import { Col, Grid, Panel, Row, ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '~/actions/pingActions';

class PingInfo extends React.Component {
    render() {
        const ping = this.props.ping;
        return (
            <div>
                <Row><Col sm={12}> Miljø: {this.props.env} </Col></Row>
                <Row><Col sm={12}> Tid: {ping.aggregateResponseTime} </Col></Row>
                <Row><Col sm={12}> Status: {ping.aggregateResultText} </Col> </Row>
                <Panel>
                    {ping.checks.map(service => (
                        <ListGroupItem key={service.endpoint} className={"ping"+service.resultText+" pingItem"}>
                            <Row>
                                <Col md={6}>{service.endpoint}</Col>
                                <Col md={6}>{service.responseTime}</Col>
                            </Row>
                            <Row>
                                <Col md={12}>{service.errorMessage}</Col>
                            </Row>
                        </ListGroupItem>
                    ))}
                </Panel>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        ping: state.ping.ping,
        env: state.ping.env
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PingInfo);
