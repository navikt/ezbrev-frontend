import React from 'react';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import * as brevdataActionsUtil from '~/actions/brevdataActionsUtil';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as brevdataActions from '~/actions/brevdataActions';
import * as dokumentActionsUtil from '~/actions/dokumentActionsUtil';
import * as dokumentActions from '~/actions/dokumentActions';

class BrevdataMeta extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.onSelectSort = this.onSelectSort.bind(this);
    }

    onSelectSort(choice) {}
    titleBrevdata() {
        if (this.props.brevdataId === undefined) {
            return 'Velg brevdata';
        } else {
            return this.props.brevdataId;
        }
    }
    render() {
        return (
            <section className="col-md-4 float-left">
                <DropdownButton
                    className={'btn btn-info'}
                    title="Sorter brevdata"
                    id="brevdata_sorter"
                    onSelect={this.onSelectSort}
                >
                    <MenuItem eventKey="1">Nyeste først</MenuItem>
                    <MenuItem eventKey="2">Eldste først</MenuItem>
                </DropdownButton>
                <div
                    className="list-group"
                    id="brevdata_pick"
                >
                    {this.props.brevdataList.map(i => (
                        <button
                            type="button"
                            className="list-group-item"
                            key={i.brevdataId}
                            onClick={() => {
                                this.props.utilActions.selectBrevdata(
                                    i.brevdataId
                                );
                                this.props.actionsDok.setDokument('');
                            }}
                            disabled={this.props.brevmal === ''}
                        >
                            {i.beskrivelse}
                            {' - '}
                            {'id: '}
                            {i.brevdataId}
                            <br />
                            {'Opprettet: '}
                            {i.changeStamp.opprettetDato}{' '}
                        </button>
                    )) /*mulig at vi må ha annen eventKey her. Feilmelding: missing key prop for element in iterator*/}
                </div>
                <br />
                <h5>Beskrivelse</h5>
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
                <br />
                <Button
                    className={'btn btn-success'}
                    onClick={() =>
                        this.props.utilActionsDok.showLastApprovedPDF(
                            this.props.brevdata.brevdataId
                        )
                    }
                    disabled={this.props.brevdata === ''}
                >
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
        brevdata: state.brevdataReducer.brevdata,
        brevmal: state.menyValg.brevmal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        utilActions: bindActionCreators(brevdataActionsUtil, dispatch),
        actions: bindActionCreators(brevdataActions, dispatch),
        utilActionsDok: bindActionCreators(dokumentActionsUtil, dispatch),
        actionsDok: bindActionCreators(dokumentActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrevdataMeta);

//
// <DropdownButton
//     className={'btn btn-info'}
//     title={
//         'Brevdata: ' +
//         (this.props.brevdata.brevdataId ? this.props.brevdata.brevdataId : '')
//     }
//     id="brevdata_pick"
//     placeholder="Velg brevdata"
//     onSelect={brevdataId => {
//         this.props.utilActions.selectBrevdata(brevdataId);
//         this.props.actionsDok.setDokument('');
//     }}
//     disabled={this.props.brevmal === ''}
// >
//     {this.props.brevdataList.map(i => (
//         <MenuItem key={i.brevdataId} eventKey={i.brevdataId}>
//             {' '}
//             {i.beskrivelse}{' - '}
//             {'id: '}{i.brevdataId}<br/>
//             {'Opprettet: '}{i.changeStamp.opprettetDato}
//             {' '}
//         </MenuItem>
//     )) /*mulig at vi må ha annen eventKey her. Feilmelding: missing key prop for element in iterator*/}
// </DropdownButton>
