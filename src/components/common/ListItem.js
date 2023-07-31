import React from 'react';
import { Select } from '@navikt/ds-react';

export default function ListItem({
    title,
    id,
    func,
    list,
    isDisabled,
    className,
    value,
}) {
    return (
        <Select
            className={className + ' text-left'}
            title={title}
            label={title}
            id={id}
            onChange={(event) => func(event.target.value)}
            disabled={isDisabled}
            value={value}
        >
            {list.map((item) => (
                <option key={item} value={item}>
                    {item}
                </option>
            ))}
        </Select>
    );
}
