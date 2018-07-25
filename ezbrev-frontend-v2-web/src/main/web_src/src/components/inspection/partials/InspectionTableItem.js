import React from 'react';
import { Col, Panel, Row } from 'react-bootstrap';

export default function InspectionDocumentItem({ header, data }) {
    return (
        <Panel>
            <Panel.Heading>
                <Row>
                    <Col md={12}>{header}</Col>
                </Row>
            </Panel.Heading>
            <Panel.Body>{data}</Panel.Body>
        </Panel>
    );
}
