import React from 'react';
import { Button, Table } from '@navikt/ds-react';

export default function Brev({
    malId,
    sammenlign,
    brevdataList,
    regressionSimilarity,
}) {
    if (malId in brevdataList) {
        return brevdataList[malId].map((brevdata) => (
            <Table.Row key={brevdata.brevdataId}>
                <Table.DataCell>
                    {brevdata.beskrivelse + ' Id: ' + brevdata.brevdataId}
                </Table.DataCell>
                <Table.DataCell>
                    {isNaN(regressionSimilarity[brevdata.brevdataId])
                        ? regressionSimilarity[brevdata.brevdataId]
                        : regressionSimilarity[brevdata.brevdataId] + '%'}
                </Table.DataCell>
                <Table.DataCell>
                    <Button
                        className={'btn'}
                        bsSize="xsmall"
                        onClick={() =>
                            sammenlign(
                                brevdata.brevdataId,
                                brevdata.dokumentmal.dokumenttypeId,
                            )
                        }
                    >
                        Sammenlign
                    </Button>
                </Table.DataCell>
            </Table.Row>
        ));
    }
}
