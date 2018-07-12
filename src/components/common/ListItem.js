import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

export default function ListItem({ title, id, func, list }) {
    return (
        <DropdownButton
            className={'btn btn-info'}
            title={title}
            id={id}
            onSelect={func}
        >
            {list.map(item => (
                <MenuItem key={item} eventKey={item}>
                    {item}
                </MenuItem>
            )) /*mulig at vi må ha annen eventKey her. Feilmelding: missing key prop for element in iterator*/}
        </DropdownButton>
    );
}
