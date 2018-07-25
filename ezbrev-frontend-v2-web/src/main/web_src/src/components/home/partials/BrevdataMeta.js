import React from 'react';
import {
    Button,
    Checkbox,
    DropdownButton,
    ListGroupItem,
    MenuItem
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import * as brevdataActionsUtil from '~/actions/brevdataActionsUtil';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as brevdataActions from '~/actions/brevdataActions';
import * as dokumentActionsUtil from '~/actions/dokumentActionsUtil';
import * as dokumentActions from '~/actions/dokumentActions';
import * as menyValgActions from '~/actions/menyValgActions';

class BrevdataMeta extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            sortBy: 'Sorter brevdata'
        };
    }

    toggleCheckbox = e => {
        this.props.actionsMenyValg.setRegisterCheckbox(e);
    };

    showBrevdataList = () => {
        if (this.props.brevdataList.length === 0 && this.props.brevmal !== '') {
            return (
                <div>
                    <br />
                    <p>Ingen brevdata funnet</p>
                </div>
            );
        } else {
            return (
                <div className="list-group" id="brevdata_pick">
                    {this.props.brevdataList.map(i => (
                        <ListGroupItem
                            type="button "
                            className="list-group-item"
                            key={i.brevdataId}
                            onClick={() => {
                                this.props.utilActions.selectBrevdata(
                                    i.brevdataId
                                );
                                this.props.actionsDok.setDokument('');
                            }}
                            disabled={this.props.brevmal === ''}
                            active={i.brevdataId === this.props.brevdataId}
                        >
                            {i.beskrivelse}
                            {' - '}
                            {'id: '}
                            {i.brevdataId}
                            <br />
                            {'Opprettet: '}
                            {i.changeStamp.opprettetDato}{' '}
                        </ListGroupItem>
                    ))}
                </div>
            );
        }
    };
    render() {
        return (
            <section className="col-md-3 float-left">
                <DropdownButton
                    title={this.state.sortBy}
                    className={'btn btn-fill'}
                    id="brevdata_sorter"
                    onSelect={sortingKey => {
                        this.setState({
                            sortBy:
                                sortingKey === '1'
                                    ? 'Nyeste først'
                                    : 'Eldste først'
                        });
                        return this.props.actionsMenyValg.sortBrevdataList(
                            sortingKey
                        );
                    }}
                >
                    <MenuItem key="1" eventKey="1">
                        Nyeste først
                    </MenuItem>
                    <MenuItem key="2" eventKey="2">
                        Eldste først
                    </MenuItem>
                </DropdownButton>
                {this.showBrevdataList()}
                <div className="flex-row center-vertically">
                    <Checkbox
                        title="Bruk registerinformasjon"
                        validationState="success"
                        defaultChecked={false}
                        onClick={e => this.toggleCheckbox(e.target.checked)}
                    />
                    Bruk registerinformasjon
                </div>
                <br />
                <h5>Beskrivelse</h5>
                <textarea
                    className="form-horizontal form-control"
                    id="brevdata_beskrivele"
                    placeholder="Fyll inn beskrivelse"
                    value={this.props.brevdataBeskrivelse}
                    onChange={event => {
                        this.props.actions.changeBeskrivelse(
                            event.target.value
                        );
                    }}
                />
                <br />
                <Button
                    className={'btn btn-fill'}
                    onClick={() =>
                        this.props.utilActionsDok.showLastApprovedPDF(
                            this.props.brevdataId
                        )
                    }
                    disabled={this.props.brevdataId === ''}
                >
                    Vis siste godkjente PDF
                </Button>
            </section>
        );
    }
}

BrevdataMeta.propTypes = {
    brevdataList: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        brevdataList: state.menyValg.brevdataList,
        brevdataBeskrivelse: state.brevdataReducer.beskrivelse,
        brevmal: state.menyValg.brevmal,
        brevdataId: state.brevdataReducer.brevdataId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        utilActions: bindActionCreators(brevdataActionsUtil, dispatch),
        actions: bindActionCreators(brevdataActions, dispatch),
        utilActionsDok: bindActionCreators(dokumentActionsUtil, dispatch),
        actionsDok: bindActionCreators(dokumentActions, dispatch),
        actionsMenyValg: bindActionCreators(menyValgActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrevdataMeta);
