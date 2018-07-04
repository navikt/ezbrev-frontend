import React from 'react';

import BrevpakkeSelect from './partials/BrevpakkeSelect';
import BrevdataInput from './partials/BrevdataInput';
import BrevdataMeta from './partials/BrevdataMeta';

class HomePage extends React.Component {
    render() {
        return (
            <main className="container-fluid">
                <h4>Brevdata</h4>
                <BrevpakkeSelect />
                <BrevdataInput />
                <BrevdataMeta />
            </main>
        );
    }
}

export default HomePage;
