import React from 'react';
import { DropdownButton, MenuItem, Row } from 'react-bootstrap';

class BrevpakkeSelect extends React.Component {
    constructor(props, context) {
        super(props, context);

        //Bind Actions
        // this.onSelectEnv = this.onSelectEnv.bind(this);
        this.onSelectBrevpakke = this.onSelectBrevpakke.bind(this);
        this.onSelectVersjon = this.onSelectVersjon.bind(this);
        this.onSelectMal = this.onSelectMal.bind(this);
    }

    onSelectEnv = e => {};

    onSelectBrevpakke(e) {}

    onSelectVersjon(e) {}

    onSelectMal(e) {}

    render() {
        return (
            <section className="col-md-2 float-left">
                <Row>
                    <DropdownButton
                        title="Velg miljø"
                        id="brevpakke_env_pick"
                        onSelect={this.onSelectEnv}
                    >
                        <MenuItem eventKey="1">U1</MenuItem>
                    </DropdownButton>
                </Row>
                <Row>
                    <DropdownButton
                        title="Velg brevpakke"
                        id="brevpakke_pick"
                        onSelect={this.onSelectBrevpakke}
                    >
                        <MenuItem eventKey="1">Arena</MenuItem>
                    </DropdownButton>
                </Row>
                <Row>
                    <DropdownButton
                        title="Velg versjon"
                        id="brevpakke_versjon_pick"
                        onSelect={this.onSelectVersjon}
                    >
                        <MenuItem eventKey="1">1.0.0</MenuItem>
                    </DropdownButton>
                </Row>
                <Row>
                    <DropdownButton
                        title="Velg brevmal"
                        id="brevpakke_mal_pick"
                        onSelect={this.onSelectMal}
                    >
                        <MenuItem eventKey="1">Mal00001</MenuItem>
                    </DropdownButton>
                </Row>
            </section>
        );
    }
}

export default BrevpakkeSelect;
