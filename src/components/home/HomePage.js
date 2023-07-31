import React from 'react';
import BrevpakkeSelect from './partials/BrevpakkeSelect';
import BrevdataInput from './partials/BrevdataInput';
import BrevdataMeta from './partials/BrevdataMeta';
import SammenlignMedGodkjent from '../common/SammenlignMedGodkjent';

export default function HomePage() {
    return (
        <main className="pageSize homepage-flex">
            <BrevpakkeSelect />
            <BrevdataInput />
            <BrevdataMeta />
            <SammenlignMedGodkjent />
        </main>
    );
}
