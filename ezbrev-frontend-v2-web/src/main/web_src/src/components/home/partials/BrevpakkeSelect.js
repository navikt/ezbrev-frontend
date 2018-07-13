import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem, Row, FormControl } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as menyValgActionsUtil from '../../../actions/menyValgActionsUtil';
import * as menyValgActions from '../../../actions/menyValgActions';
import * as brevdataActions from '../../../actions/brevdataActions';
import * as dokumentActions from '../../../actions/dokumentActions';
import ListItem from '../../common/ListItem';
import FormItem from '~/components/inspection/partials/FormItem';

class BrevpakkeSelect extends React.Component {
    checkRedigerbar() {
        if (this.props.brevmal === undefined || this.props.brevmal === '') {
            return 'Brevmal: ';
        } else if (this.props.brevmal.redigerbar) {
            return 'Brevmal: ' + this.props.brevmal + ' Redigerbar';
        } else {
            return 'Brevmal: ' + this.props.brevmal;
        }
    }

    render() {
        return (
            <section className="col-md-2 float-left">
                <Row>
                    <ListItem
                        title={'Miljø: ' + this.props.miljo}
                        id="brevpakke_env_pick"
                        func={miljo => {
                            this.props.actions.setMiljo(miljo);
                            this.props.utilActions.selectMiljo(miljo);
                            this.props.actionsBrevdata.setBrevdata('');
                            this.props.actionsDok.setDokument('');
                        }}
                        list={this.props.miljoList}
                    />
                </Row>
                <br />
                <Row>
                    <div className="parent">
                        <div className="child inline-block-child">
                            <ListItem
                                title={'Brevpakke: ' + this.props.brevpakke}
                                id="brevpakke_pick"
                                func={brevpakke => {
                                    let brevInfo = this.props.brevInfo;
                                    let miljo = this.props.miljo;
                                    this.props.utilActions.selectBrevpakke(
                                        brevpakke,
                                        brevInfo
                                    );
                                    this.props.utilActions.fetchBrevpakkeVersjon(
                                        miljo,
                                        brevpakke
                                    );
                                    this.props.actions.setBrevpakke(brevpakke);
                                    this.props.actionsBrevdata.setBrevdata('');
                                    this.props.actionsDok.setDokument('');
                                }}
                                list={this.props.brevpakkeList}
                                isDisabled={this.props.miljo === ''}
                            />
                        </div>
                        <div className="child inline-block-child">
                            <FormControl
                                readOnly
                                value={
                                    this.props.brevpakkeVersjon
                                        ? this.props.brevpakkeVersjon
                                        : ''
                                }
                            />
                        </div>
                    </div>
                </Row>
                <br />
                <Row>
                    <DropdownButton
                        className={'btn btn-info'}
                        disabled={this.props.brevpakke === ''}
                        title={this.checkRedigerbar()}
                        id={'brevpakke_mal_pick'}
                        onSelect={brevmal => {
                            this.props.utilActions.selectBrevmal(
                                brevmal,
                                this.props.brevpakke
                            );
                            this.props.actions.setBrevmal(brevmal);
                            this.props.actionsBrevdata.setBrevdata('');
                            this.props.actionsDok.setDokument('');
                        }}
                    >
                        {this.props.brevmalList.map(i => (
                            <MenuItem key={i.malID} eventKey={i.malID}>
                                {' '}
                                {i.malID +
                                    ' - ' +
                                    (i.redigerbar ? 'Redigerbar' : '') +
                                    ' - ' +
                                    i.dokumentTittel}{' '}
                            </MenuItem>
                        )) /*mulig at vi må ha annen eventKey her. Feilmelding: missing key prop for element in iterator*/}
                    </DropdownButton>
                </Row>
            </section>
        );
    }
}

BrevpakkeSelect.propTypes = {
    miljoList: PropTypes.array.isRequired,
    brevInfo: PropTypes.array.isRequired,
    brevpakkeList: PropTypes.array.isRequired,
    brevmalList: PropTypes.array.isRequired,
    brevpakke: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
    utilActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        miljoList: state.menyValg.miljoList,
        miljo: state.menyValg.miljo,
        brevInfo: state.menyValg.brevInfo,
        brevpakkeList: state.menyValg.brevpakkeList,
        brevmalList: state.menyValg.brevmalList,
        brevpakke: state.menyValg.brevpakke,
        brevmal: state.menyValg.brevmal,
        brevpakkeVersjon: state.menyValg.brevpakkeVersjon
    };
}

function mapDispatchToProps(dispatch) {
    return {
        utilActions: bindActionCreators(menyValgActionsUtil, dispatch),
        actions: bindActionCreators(menyValgActions, dispatch),
        actionsBrevdata: bindActionCreators(brevdataActions, dispatch),
        actionsDok: bindActionCreators(dokumentActions, dispatch)
        /* wrapper alle actions i mappen bindActionCreators i et kall til dispatch*/
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrevpakkeSelect);
