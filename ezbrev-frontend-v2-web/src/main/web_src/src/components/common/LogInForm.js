import React from 'react';
import {
    Button,
    Checkbox,
    Col,
    ControlLabel,
    Form,
    FormControl,
    FormGroup
} from 'react-bootstrap';

export default function LogInForm({ title, id, func, list, isDisabled }) {
    console.log('Loginform')
    const submit = e => {
        e.preventDefault();
        const username = e.target[0].value;
        const ***passord=gammelt_passord***;
        console.log("Username:", username, "Password:", password);
    };

    const rightSide = 8;
    const leftSide = 4;

    return (
        <Form horizontal onSubmit={submit}>
            <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={leftSide}>
                    Email
                </Col>
                <Col sm={rightSide}>
                    <FormControl type="username" placeholder="Username" />
                </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={leftSide}>
                    Password
                </Col>
                <Col sm={rightSide}>
                    <FormControl type="***passord=gammelt_passord***" />
                </Col>
            </FormGroup>
            <FormGroup>
                <Col smOffset={leftSide} sm={rightSide}>
                    <Checkbox>Remember me</Checkbox>
                </Col>
            </FormGroup>
            <FormGroup>
                <Col smOffset={leftSide} sm={rightSide}>
                    <Button type="submit">Sign in</Button>
                </Col>
            </FormGroup>
        </Form>
    );
}
