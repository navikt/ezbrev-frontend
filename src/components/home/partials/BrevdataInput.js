import React, {PropTypes} from 'react';
import BrevdataControl from "./BrevdataControl";

class BrevdataInput extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            brevdata: {xml: ""}
        };
        //Initialiserer staten, skal inneholde en brevdata som inneholder xml som er satt til en tom string

        this.onInputChange = this.onInputChange.bind(this);     //Hva gjør bind-funksjonen? Gjør at man skjønner at funksjonen tilhører denne klassen?
        this.onChangeSave = this.onChangeSave.bind(this);
    }

    onInputChange(event) {
        const brevdata = this.state.brevdata;
        brevdata.xml = event.target.value;                      //hva er event.target?
        this.setState({brevdata: brevdata});

    }

    onChangeSave() {
        this.props.actions.saveBrevdata(this.state.brevdata);
    }

    render() {
        return (
            <section className="col-md-6 float-left">
                <textarea
                    className="form-horizontal form-control"
                    id="brevdata_input"
                    type="textarea"
                    placeholder="Legg inn XML"
                    value={this.state.brevdata.xml}
                    onChange={this.onInputChange}
                >
                </textarea>

                <BrevdataControl/>                                  {/*Tegner opp knappene under feltet*/}
            </section>
        );
    }
}

BrevdataInput.propTypes = {                                         //Definerer hvilken type props til BrevdataInput skal ha.
    brevdata: PropTypes.object.isRequired,                            //brevdata skal være et object og det må være oppgitt. Får advarsel dersom brevdata ikke blir gitt
    actions: PropTypes.object.isRequired
};

export default BrevdataInput;                                       //Gjør at denne kan importeres i en annen fil. Eks. import bdi from 'BrevdataInput.js ?? trenger ikke hete det samme i nye fil