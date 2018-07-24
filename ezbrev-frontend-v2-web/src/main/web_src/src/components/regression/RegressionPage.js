import React from 'react';
import RegressionControl from './partials/RegressionControl';
import RegressionTable from './partials/RegressionTable';
import { Button, Col, DropdownButton, MenuItem, Row } from 'react-bootstrap';
import SammenlignMedGodkjent from "~/components/common/SammenlignMedGodkjent";

class RegressionPage extends React.Component {
    render() {
        return (
            <main className="container-fluid pageSize">
                <RegressionControl />
                <RegressionTable />
                <SammenlignMedGodkjent/>
            </main>
        );
    }
}

export default RegressionPage;
