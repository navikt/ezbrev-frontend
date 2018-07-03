import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import * as brevdataActionsUtil from '~/actions/brevdataActionsUtil';
//import {selectBrevdata} from "~/actions/brevdataActionsUtil";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class BrevdataMeta extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.onSelectSort = this.onSelectSort.bind(this);

        this.state = {
            brevdataId: '',
            titlebrevdata: 'Velg brevdata'
        };
    }

    onSelectSort(choice) {}

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
                <DropdownButton
                    title={this.state.titlebrevdata}
                    id="brevdata_pick"
                    placeholder="Velg brevdata"
                    onSelect={brevdataId => {
                        console.log(brevdataId);
                        this.props.actions.selectBrevdata(brevdataId);
                        this.setState({ brevdataId: brevdataId });
                        this.setState({titlebrevdata: brevdataId });
                    }}
                >
                    {this.props.brevdataList.map(i => (
                        <MenuItem key={i.brevdataId} eventKey={i.brevdataId}>
                            {' '}
                            {i.brevdataId}{' '}
                        </MenuItem>
                    )) /*mulig at vi må ha annen eventKey her. Feilmelding: missing key prop for element in iterator*/}
                </DropdownButton>
            </section>
        );
    }
}

//må sette brevdataListen inn som en liste av knapper
//sette inn beskrivelse-boks

BrevdataMeta.propTypes = {
    brevdataList: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        brevdataList: state.menyValg.brevdataList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            brevdataActionsUtil,
            dispatch
        ) /* wrapper alle actions i mappen bindActionCreators i et kall til dispatch*/
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrevdataMeta);
