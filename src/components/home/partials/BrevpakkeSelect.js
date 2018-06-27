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


class BrevpakkeSelect extends React.Component {            //container component
    constructor(props, context) {
        super(props, context);

        this.state = {
            brevpakkeList: [],
            brevmalList: []
        }

    };


    getBrevpakkeList = () => {
        let brevpakkeList = [];
        const brevInfo = this.props.brevInfo;
        for (var i = 0; i < brevpakkeList.length; i++) {
            brevpakkeList.append(brevInfo[i].brevPakke)
        }
        const brevpakkeListUnique = brevpakkeList.filter((x, i, a) => a.indexOf(x) == i);
        this.state.brevpakkeList = brevpakkeListUnique;
    };

    getBrevmalList = brevpakke => {
    };

    getXML = brevmal => {

    };

    render() {
        return (
            <section className="col-md-2 float-left">
                <Row>
                    <ListItem
                        title="Velg miljø"
                        id="brevpakke_env_pick"
                        func={() => {
                            this.props.actions.selectMiljo;
                            this.getBrevpakkeList
                        }}
                        list={this.props.miljoList}
                    />

                </Row>
                <Row>
                    <ListItem
                        title="Velg brevpakke"
                        id="brevpakke_pick"
                        func={this.getBrevmalList}
                        list={this.state.brevpakkeList}
                    />
                </Row>
                <Row>
                    <ListItem
                        title="Velg brevmal"
                        id="brevpakke_mal_pick"
                        func={this.props.getXML}                        /*Her må vi kalle XMLen*/
                        list={this.state.brevmalList}
                    />
                </Row>
            </section>
        );
    }
}

BrevpakkeSelect.propTypes = {
    miljoList: PropTypes.array.isRequired,
    brevInfo: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    console.log(state);
    return {
        miljoList: state.menyValg.miljoList,
        brevInfo: state.menyValg.brevInfo
    };
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(menyValgActionsUtil, dispatch)                  /* wrapper alle actions i mappen bindActionCreators i et kall til dispatch*/
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BrevpakkeSelect);

