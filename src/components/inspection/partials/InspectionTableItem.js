import React from 'react';
import { Col, Card, Row } from 'react-bootstrap';

export default function InspectionDocumentItem({ header, data }) {
    return (
        <Card>
            <Card.Header>
                <Row>
                    <Col md={12}>{header}</Col>
                </Row>
            </Card.Header>
            <Card.Body>{data}</Card.Body>
        </Card>
    );
}
