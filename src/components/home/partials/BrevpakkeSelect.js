import React from 'react';
import PropTypes from 'prop-types'
import {DropdownButton, MenuItem, Row} from 'react-bootstrap';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as menyValgActions from '../../../actions/menyValgActions';



function ListItem({title, id, action, list}) {
    return (<DropdownButton
            title={title}
            id={id}
            onSelect={action}
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
    action: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired
};


class BrevpakkeSelect extends React.Component {            //container component
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <section className="col-md-2 float-left">
                <Row>
                    <ListItem
                        title="Velg miljø"
                        id="brevpakke_env_pick"
                        action={this.props.actions.selectMiljo}
                        list={this.props.miljoList}
                    />

                </Row>
                <Row>
                    <ListItem
                        title="Velg brevpakke"
                        id="brevpakke_pick"
                        action={this.props.actions.selectBrevpakke}
                        list={this.props.brevpakkeList}
                    />
                </Row>
                <Row>
                    <ListItem
                        title="Velg brevmal"
                        id="brevpakke_mal_pick"
                        action={this.props.actions.selectMal}
                        list={this.props.brevmalList}
                    />
                </Row>
            </section>
        );
    }
}

BrevpakkeSelect.propTypes = {
    miljoList: PropTypes.array.isRequired,
    brevpakkeList: PropTypes.array.isRequired,
    brevmalList: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    console.log(state);
    return {
        miljoList: state.menyValg.miljoList,
        brevpakkeList: state.menyValg.brevpakkeList,
        brevmalList: state.menyValg.brevmalList
    };
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(menyValgActions, dispatch)                  /* wrapper alle actions i mappen bindActionCreators i et kall til dispatch*/
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BrevpakkeSelect);

