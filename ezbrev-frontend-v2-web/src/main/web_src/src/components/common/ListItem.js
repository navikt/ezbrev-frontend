import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

export default function ListItem({ title, id, func, list, isDisabled }) {
    return (
        <DropdownButton
            className={'btn btn-info'}
            title={title}
            id={id}
            onSelect={func}
            disabled={isDisabled}
        >
            {list.map(item => (
                <MenuItem key={item} eventKey={item}>
                    {item}
                </MenuItem>
            ))}
        </DropdownButton>
    );
}

