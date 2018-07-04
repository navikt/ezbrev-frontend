import React from 'react';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import * as brevdataActionsUtil from '~/actions/brevdataActionsUtil';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as brevdataActions from '~/actions/brevdataActions';
import * as dokumentActionsUtil from '~/actions/dokumentActionsUtil';

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
                        this.props.utilActions.selectBrevdata(brevdataId);
                        this.setState({ brevdataId: brevdataId });
                        this.setState({ titlebrevdata: brevdataId });
                    }}
                >
                    {this.props.brevdataList.map(i => (
                        <MenuItem key={i.brevdataId} eventKey={i.brevdataId}>
                            {' '}
                            {i.brevdataId}{' '}
                        </MenuItem>
                    )) /*mulig at vi må ha annen eventKey her. Feilmelding: missing key prop for element in iterator*/}
                </DropdownButton>
                <br />
                <h4>Beskrivelse</h4>
                <textarea
                    className="form-horizontal form-control"
                    id="brevdata_beskrivele"
                    placeholder="Fyll inn beskrivelse"
                    value={this.props.beskrivelse}
                    onChange={event => {
                        this.props.actions.changeBeskrivelse(
                            event.target.value
                        );
                    }}
                />
                <br/>
                <Button onClick={()=>this.props.dokUtilActions.showLastApprovedPDF(this.props.brevdataId)}>
                    Vis siste godkjente PDF
                </Button>
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
        brevdataList: state.menyValg.brevdataList,
        beskrivelse: state.brevdataReducer.brevdata.beskrivelse,
        brevdataId:state.brevdataReducer.brevdata.brevdataId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        utilActions: bindActionCreators(brevdataActionsUtil, dispatch),
        actions: bindActionCreators(brevdataActions, dispatch),
        dokUtilActions: bindActionCreators(dokumentActionsUtil,dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrevdataMeta);
