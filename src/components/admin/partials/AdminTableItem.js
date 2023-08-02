import React from 'react';
import AdminBrevdata from './AdminBrevdata';
import { Accordion } from '@navikt/ds-react';

export default function AdminTableItem({ item }) {
    return (
        <Accordion.Item>
            <Accordion.Header>
                {`${item.malId} - ${item.tittel}`}
            </Accordion.Header>
            <Accordion.Content>
                <AdminBrevdata malId={item.malId} />
            </Accordion.Content>
        </Accordion.Item>
    );
}
