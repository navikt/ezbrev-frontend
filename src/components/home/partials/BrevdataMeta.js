import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

class BrevdataMeta extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.onSelectSort = this.onSelectSort.bind(this);
    }

    onSelectSort(e) {}

    render() {
        return (
            <section className="col-md-4 float-left">
                <DropdownButton
                    title="Sorter brevdata"
                    id="brevdata_sorter"
                    onSelect={this.onSelectSort}
                >
                    <MenuItem eventKey="1">Nyeste først</MenuItem>
                    <MenuItem eventKey="2">Eldste først</MenuItem>
                </DropdownButton>
                <p>TODO: Lagrede brevdata</p>
            </section>
        );
    }
}

export default BrevdataMeta;
