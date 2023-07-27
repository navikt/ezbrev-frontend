import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';

export default function ListItem({
    title,
    id,
    func,
    list,
    isDisabled,
    className,
}) {
    return (
        <DropdownButton
            className={className + ' text-left'}
            title={title}
            id={id}
            onSelect={func}
            disabled={isDisabled}
        >
            {list.map((item) => (
                <Dropdown.Item key={item} eventKey={item}>
                    {item}
                </Dropdown.Item>
            ))}
        </DropdownButton>
    );
}
