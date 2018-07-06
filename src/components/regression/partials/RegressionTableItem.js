import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { getBrevdataList } from '~/api';

export default function ListItem({ mal, tittel, list }) {
    let handleClick = e => {
        e.preventDefault();
        getBrevdataList('000044', 'Infotrygd').then(brevdataList =>
            console.log(brevdataList)
        );
    };

    return (
        <Row>
            <Col sm={2}>{mal}</Col>
            <Col sm={2}>{tittel}</Col>
            <Col sm={2}><button onClick={handleClick}>hei</button></Col>
        </Row>
    );
}
