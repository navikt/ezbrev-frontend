import React from 'react';
import BrevpakkeSelect from './partials/BrevpakkeSelect';
import BrevdataInput from './partials/BrevdataInput';
import BrevdataMeta from './partials/BrevdataMeta';
import SammenlignMedGodkjent from '../common/SammenlignMedGodkjent';

class HomePage extends React.Component {
    render() {
        return (
            <main className="container-fluid pageSize">
                <BrevpakkeSelect />
                <BrevdataInput />
                <BrevdataMeta />
                <SammenlignMedGodkjent />
            </main>
        );
    }
}

export default HomePage;
