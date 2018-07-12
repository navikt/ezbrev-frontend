import React from 'react';
import { bindActionCreators } from 'redux';
import * as inspectionActions from '~/actions/InspectionActions';
import { connect } from 'react-redux';
import { Col, Panel, Row } from 'react-bootstrap';

export default function InspectionDocumentItem({ header, data }) {
    return (
        <Panel>
            <Panel.Heading>
                <Row>
                    <Col md={10}>
                        {header}
                    </Col>
                </Row>
            </Panel.Heading>
            <Panel.Body>
                {data}
            </Panel.Body>
        </Panel>
    );
}
