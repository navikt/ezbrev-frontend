import React from 'react';
import PropTypes from 'prop-types'
import {DropdownButton, MenuItem, Row} from 'react-bootstrap';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as menyValgActionsUtil from '../../../actions/menyValgActionsUtil';

function ListItem({title, id, func, list}) {
    return (<DropdownButton
            title={title}
            id={id}
            onSelect={func}
        >
            {
                list.map((i) =>
                    <MenuItem key={i}
                              eventKey={i}> {i} </MenuItem>)            /*mulig at vi må ha annen eventKey her. Feilmelding: missing key prop for element in iterator*/
            }
        </DropdownButton>
    );
}

ListItem.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    func: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired
};

//endre slik at knappene viser hvilket valg som er tatt, lagre dette i den lokale staten?

class BrevpakkeSelect extends React.Component {            //container component
    constructor(props, context) {
        super(props, context);

        this.state = {
            titlemiljo:"Velg miljø",
            titlebrevpakke:"Velg brevpakke",
            titlebrevmal:"Velg brevmal",
            miljo:"",
            brevpakke:"",
            brevmal:""

        }

    };





    render() {
        return (
            <section className="col-md-2 float-left">
                <Row>
                    <ListItem
                        title={this.state.titlemiljo}
                        id="brevpakke_env_pick"
                        func={(miljo) => {
                            this.props.actions.selectMiljo(miljo);
                            this.setState({miljo:miljo},()=> console.log("miljo: "+this.state.miljo));
                            this.setState({titlemiljo: miljo});
                        }}
                        list={this.props.miljoList}
                    />

                </Row>
                <Row>
                    <ListItem
                        title={this.state.titlebrevpakke}
                        id="brevpakke_pick"
                        func={(brevpakke) => {
                            let brevInfo=this.props.brevInfo;
                            console.log(brevInfo)
                            this.props.actions.selectBrevpakke(brevpakke, brevInfo);
                            this.setState({brevpakke:brevpakke},()=> console.log("brevpakke: "+this.state.brevpakke));
                            this.setState({titlebrevpakke: brevpakke});
                        }}
                        list={this.props.brevpakkeList}
                    />
                </Row>
                <Row>
                    <ListItem
                        title={this.state.titlebrevmal}
                        id="brevpakke_mal_pick"
                        func={(brevmal)=>{
                            debugger;
                            let brevpakke=this.state.brevpakke;
                            this.props.actions.selectBrevmal(brevmal,brevpakke);
                            this.setState({brevmal:brevmal},()=> console.log("brevmal: "+this.state.brevmal));
                            this.setState({titlebrevmal: brevmal});

                        }}
                        list={this.props.brevmalList}
                    />
                </Row>
            </section>
        );
    }
}

BrevpakkeSelect.propTypes = {
    miljoList: PropTypes.array.isRequired,
    brevInfo: PropTypes.array.isRequired,
    brevpakkeList:PropTypes.array.isRequired,
    brevpakkeList:PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    console.log(state);
    return {
        miljoList: state.menyValg.miljoList,
        brevInfo: state.menyValg.brevInfo,
        brevpakkeList: state.menyValg.brevpakkeList,
        brevmalList: state.menyValg.brevmalList,

    };
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(menyValgActionsUtil, dispatch)                  /* wrapper alle actions i mappen bindActionCreators i et kall til dispatch*/
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BrevpakkeSelect);

