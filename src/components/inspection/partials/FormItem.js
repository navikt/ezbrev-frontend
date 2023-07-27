import { FormControl, FormGroup, Row } from 'react-bootstrap';
import React from 'react';

export default function FormItem({ title, store, action }) {
    return (
        <Row>
            <form>
                <FormGroup controlId="formBasicText">
                    {title}
                    <FormControl
                        type="text"
                        value={store}
                        onChange={(e) => action(e.target.value)}
                    />
                </FormGroup>
            </form>
        </Row>
    );
}
