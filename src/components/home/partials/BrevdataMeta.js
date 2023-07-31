import React from 'react';
import PropTypes from 'prop-types';
import * as brevdataActionsUtil from '~/actions/brevdataActionsUtil';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as brevdataActions from '~/actions/brevdataActions';
import * as dokumentActionsUtil from '~/actions/dokumentActionsUtil';
import * as dokumentActions from '~/actions/dokumentActions';
import * as menyValgActions from '~/actions/menyValgActions';
import { Button, Checkbox, LinkPanel } from '@navikt/ds-react';

class BrevdataMeta extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            sortBy: 'Sorter brevdata',
        };
    }

    toggleCheckbox = (e) => {
        this.props.actionsMenyValg.setRegisterCheckbox(e);
    };
    showBrevdataList = () => {
        if (
            this.props.brevdataList.length === 0 &&
            this.props.brevmal !== '' &&
            !this.props.isLoading
        ) {
            return (
                <div>
                    <br />
                    <p>Ingen brevdata funnet</p>
                </div>
            );
        } else {
            return (
                <div className="list-group" id="brevdata_pick">
                    {this.props.brevdataList.map((i) => (
                        <LinkPanel
                            type="button "
                            className="list-group-item"
                            key={i.brevdataId}
                            onClick={() => {
                                this.props.utilActions.selectBrevdata(
                                    i.brevdataId,
                                );
                                this.props.actionsDok.setDokument('');
                            }}
                            disabled={this.props.brevmal === ''}
                            active={i.brevdataId === this.props.brevdataId}
                        >
                            {`${i.beskrivelse} - id: ${i.brevdataId}`}
                            <br />
                            {`Opprettet: ${i.changeStamp.opprettetDato} `}
                        </LinkPanel>
                    ))}
                </div>
            );
        }
    };

    render() {
        return (
            <div className={'in-homepage-flex'}>
                <div className="padding-left">
                    <select
                        title={this.state.sortBy}
                        className={'btn btn-fill'}
                        id="brevdata_sorter"
                        onChange={(event) => {
                            const sortingKey = event.target.value;
                            this.setState({
                                sortBy:
                                    sortingKey === '1'
                                        ? 'Nyeste først'
                                        : 'Eldste først',
                            });
                            return this.props.actionsMenyValg.sortBrevdataList(
                                sortingKey,
                            );
                        }}
                    >
                        <option key="1" value="1">
                            Nyeste først
                        </option>
                        <option key="2" value="2">
                            Eldste først
                        </option>
                    </select>
                    {this.showBrevdataList()}

                    <div>
                        <Checkbox
                            validationState="success"
                            defaultChecked={false}
                            onClick={(e) =>
                                this.toggleCheckbox(e.target.checked)
                            }
                        >
                            Bruk registerinformasjon
                        </Checkbox>
                    </div>

                    <br />

                    <h5>Beskrivelse</h5>

                    <textarea
                        className="form-horizontal form-control"
                        id="brevdata_beskrivele"
                        placeholder="Fyll inn beskrivelse"
                        value={this.props.brevdataBeskrivelse}
                        onChange={(event) => {
                            this.props.actions.changeBeskrivelse(
                                event.target.value,
                            );
                        }}
                    />

                    <br />

                    <Button
                        className={'btn btn-fill'}
                        onClick={() =>
                            this.props.utilActionsDok.showLastApprovedPDF(
                                this.props.brevdataId,
                            )
                        }
                        disabled={this.props.brevdataId === ''}
                    >
                        Vis siste godkjente PDF
                    </Button>
                </div>
            </div>
        );
    }
}

BrevdataMeta.propTypes = {
    brevdataList: PropTypes.array.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
        brevdataList: state.menyValg.brevdataList,
        brevdataBeskrivelse: state.brevdataReducer.beskrivelse,
        brevmal: state.menyValg.brevmal,
        brevdataId: state.brevdataReducer.brevdataId,
        isLoading: state.loading.isLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        utilActions: bindActionCreators(brevdataActionsUtil, dispatch),
        actions: bindActionCreators(brevdataActions, dispatch),
        utilActionsDok: bindActionCreators(dokumentActionsUtil, dispatch),
        actionsDok: bindActionCreators(dokumentActions, dispatch),
        actionsMenyValg: bindActionCreators(menyValgActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BrevdataMeta);
