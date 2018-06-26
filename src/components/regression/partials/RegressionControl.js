import React from 'react';
import { DropdownButton, MenuItem, Row, Col, Button } from 'react-bootstrap';

class RegressionControl extends React.Component {
    render() {
        return (
            <Row>
                <Col sm={2}>
                    <DropdownButton id="reg_env" title="Miljø">
                        <MenuItem eventKey="1">U1</MenuItem>
                    </DropdownButton>
                </Col>
                <Col sm={2}>
                    <DropdownButton id="reg_brevpakke" title="Brevpakke">
                        <MenuItem eventKey="1">U1</MenuItem>
                    </DropdownButton>
                </Col>
                <Col sm={2}>
                    <DropdownButton id="reg_versjon" title="Brevpakkeversjon">
                        <MenuItem eventKey="1">U1</MenuItem>
                    </DropdownButton>
                </Col>
                <Col sm={2}>
                    <Button id="start_regresjonstest_button">
                        Start regresjonstest
                    </Button>
                </Col>
                <Col sm={2} className="regtest-info-box">
                    <span className="regtest-info-test">Testet:</span>
                    <span>Feilet:</span>
                </Col>
            </Row>
        );
    }
}

export default RegressionControl;
