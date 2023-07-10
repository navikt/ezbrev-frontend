import React from 'react';
import { Button, Col, ListGroupItem, Row } from 'react-bootstrap';

export default function Brev(
    malId,
    sammenlign,
    brevdataList,
    regressionSimilarity
) {
    if (malId in brevdataList) {
        return brevdataList[malId].map(brevdata => (
            <ListGroupItem key={brevdata.brevdataId}>
                <Row>
                    <Col sm={4}>
                        {brevdata.beskrivelse + ' Id: ' + brevdata.brevdataId}
                    </Col>
                    <Col sm={4}>
                        {isNaN(regressionSimilarity[brevdata.brevdataId])
                            ? regressionSimilarity[brevdata.brevdataId]
                            : regressionSimilarity[brevdata.brevdataId] + '%'}
                    </Col>
                    <Col sm={4}>
                        <Button
                            className={'btn'}
                            bsSize="xsmall"
                            onClick={() =>
                                sammenlign(
                                    brevdata.brevdataId,
                                    brevdata.dokumentmal.dokumenttypeId
                                )
                            }
                        >
                            Sammenlign
                        </Button>
                    </Col>
                </Row>
            </ListGroupItem>
        ));
    }
}
