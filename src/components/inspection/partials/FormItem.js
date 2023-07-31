import React from 'react';
import { TextField } from '@navikt/ds-react';

export default function FormItem({ title, store, action }) {
    return (
        <form>
            <TextField
                type="text"
                label={title}
                value={store}
                onChange={(e) => action(e.target.value)}
            />
        </form>
    );
}
