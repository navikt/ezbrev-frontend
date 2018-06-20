import React from 'react';
import {DropdownButton, MenuItem, Row} from 'react-bootstrap';

class BrevpakkeSelect extends React.Component {             //Må spørre om miljøliste når siden lastes

    constructor(props, context) {
        super(props, context);

        //Bind Actions
        this.onSelectEnv = this.onSelectEnv.bind(this);
        this.onSelectBrevpakke = this.onSelectBrevpakke.bind(this);
        this.onSelectLeveranse = this.onSelectLeveranse.bind(this);
        this.onSelectMal = this.onSelectMal.bind(this);

    }

    onSelectEnv(e) {
    //Sende info om valgt miljø, spørre om tilhørende brevpakkeliste
    }

    onSelectBrevpakke(e) {

    }

    onSelectLeveranse(e) {

    }

    onSelectMal(e) {

    }


    render() {
        return (
            <section className="col-md-2 float-left">
                <Row>
                    <DropdownButton
                        title="Velg miljø"
                        id="brevpakke_env_pick"
                        onSelect={this.onSelectEnv}
                    >

                        {
                        this.props.miljoList.map((i) =>
                        <MenuItem > {i} </MenuItem>)
                        }
                    </DropdownButton>
                </Row>
                <Row>
                    <DropdownButton
                        title="Velg brevpakke"
                        id="brevpakke_pick"
                        onSelect={this.onSelectBrevpakke}
                    >
                        <MenuItem > Arena</MenuItem>
                    </DropdownButton>
                </Row>
                <Row>
                    <DropdownButton
                        title="Velg leveranse"
                        id="brevpakke_leveranse_pick"
                        onSelect={this.onSelectLeveranse}
                    >
                        <MenuItem eventKey="1">2017_HL1</MenuItem>
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