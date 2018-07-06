import React from 'react';
import RegressionControl from './partials/RegressionControl';
import RegressionTable from './partials/RegressionTable';
import { Button, Col, DropdownButton, MenuItem, Row } from 'react-bootstrap';

class RegressionPage extends React.Component {
    render() {
        return (
            <main className="container-fluid">
                <h4>Regresjonstest</h4>
                <RegressionControl />
                <RegressionTable />
            </main>
        );
    }
}

export default RegressionPage;
