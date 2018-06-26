import React, {PropTypes} from 'react';
import {DropdownButton, MenuItem, Row} from 'react-bootstrap';
import * as brevdataActions from "../../../actions/brevdataActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as menyValgActions from '../../../actions/menyValgActions';

//Må spørre om miljøliste når siden lastes

//
// function DropDownButton(title,id,action,list){
//    return ( <DropdownButton
//         title={title}
//         id={id}
//         onSelect={action}
//     >
//     {
//         list.map((i) =>
//             <MenuItem key={i} eventKey={i}> {i} </MenuItem>)            /*mulig at vi må ha annen eventKey her. Feilmelding: missing key prop for element in iterator*/
//     }
//     </DropdownButton>
//    );
// }
//




class BrevpakkeSelect extends React.Component {            //container component
    constructor(props, context) {
        super(props, context);
    }
    //     //Bind Actions
    //     this.onSelectEnv = this.onSelectEnv.bind(this);
    //     this.onSelectBrevpakke = this.onSelectBrevpakke.bind(this);
    //     this.onSelectLeveranse = this.onSelectLeveranse.bind(this);
    //     this.onSelectMal = this.onSelectMal.bind(this);
    //
    // }
    //
    // onSelectEnv(e) {
    //     selectEnv(e);
    //     //Sende info om valgt miljø, spørre om tilhørende brevpakkeliste
    // }
    //
    // onSelectBrevpakke(e) {
    // }
    //
    // onSelectLeveranse(e) {
    //
    // }
    //
    // onSelectMal(e) {
    //
    // }


    //dele opp hver knapp i egen komponent

    render() {
        return (
            <section className="col-md-2 float-left">
                <Row>
                    <DropdownButton
                        title="Velg miljø"
                        id="brevpakke_env_pick"
                        onSelect={this.props.actions.selectEnv}
                    >
                        {
                            this.props.miljoList.map((i) =>
                                <MenuItem key={i} eventKey={i}> {i} </MenuItem>)            /*mulig at vi må ha annen eventKey her. Feilmelding: missing key prop for element in iterator*/
                        }
                    </DropdownButton>
                </Row>
                <Row>
                    <DropdownButton
                        title="Velg brevpakke"
                        id="brevpakke_pick"
                        onSelect={this.onSelectBrevpakke}
                    >
                        {
                            this.props.brevpakkeList.map((i) =>
                                <MenuItem eventKey={i}> {i} </MenuItem>)            /*mulig at vi må ha annen eventKey her*/
                        }
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

BrevpakkeSelect.propTypes = {
    miljoList: PropTypes.array.isRequired,
    brevpakkeList: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    console.log(state);
    return {
        miljoList: state.menyValg.miljoList,
        brevpakkeList: state.menyValg.brevpakkeList
    };
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(menyValgActions, dispatch)                  /* wrapper alle actions i mappen bindActionCreators i et kall til dispatch*/
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(BrevpakkeSelect);

