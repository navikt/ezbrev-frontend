import React from 'react';
import { BodyLong, Heading, Panel } from '@navikt/ds-react';

export default function InspectionDocumentItem({ header, data }) {
    return (
        <Panel border>
            <Heading size={'small'}>{header}</Heading>
            <BodyLong>{data}</BodyLong>
        </Panel>
    );
}
