import React from 'react';
import {
    ButtonGroup,
    Col,
    DropdownButton,
    FormControl,
    MenuItem,
    Row
} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as menyValgActionsUtil from '../../../actions/menyValgActionsUtil';
import * as menyValgActions from '../../../actions/menyValgActions';
import * as brevdataActions from '../../../actions/brevdataActions';
import * as dokumentActions from '../../../actions/dokumentActions';
import * as pingActions from '../../../actions/pingActions';
import ListItem from '../../common/ListItem';
import FormItem from '~/components/inspection/partials/FormItem';
import { getPingByEnv } from '../../../api';
import BrevpakkeListListener from './BrevpakkeListListener';
import BrevmalListListener from './BrevmalListListener';

class BrevpakkeSelect extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.brevpakkeList.length === 0) {
            const miljo = localStorage.getItem('miljo');
            if (miljo !== null) {
                this.selectMiljo(miljo);
            }
        }
    }

    setTitleName() {
        if (this.props.brevmal === undefined || this.props.brevmal === '') {
            return 'Brevmal: ';
        } else if (this.props.brevmal.redigerbar) {
            return 'Brevmal: ' + this.props.brevmal.malID + ' Redigerbar';
        } else {
            return 'Brevmal: ' + this.props.brevmal.malID;
        }
    }

    selectMiljo = miljo => {
        this.props.actions.setMiljo(miljo);
        this.props.utilActions.selectMiljo(miljo);
        this.props.actionsDok.setDokument('');
        getPingByEnv(miljo).then(ping => this.props.pingActions.setPing(ping));
    };

    selectBrevpakke = brevpakke => {
        let brevInfo = this.props.brevInfo;
        let miljo = this.props.miljo;
        this.props.utilActions.selectBrevpakke(brevpakke, brevInfo);
        this.props.utilActions.fetchBrevpakkeVersjon(miljo, brevpakke);
        this.props.actions.setBrevpakke(brevpakke);
        this.props.actionsDok.setDokument('');
    };

    selectBrevmal = brevmal => {
        this.props.utilActions.selectBrevmal(
            brevmal.malID,
            this.props.brevpakke
        );
        this.props.actions.setBrevmal(brevmal);
        this.props.actionsDok.setDokument('');
    };

    render() {
        return (
            <Col md={3}>
                <div>
                    <Row>
                        <ButtonGroup className="btn-fill padding-right">
                            <ListItem
                                className="btn-fill"
                                title={'Miljø: ' + this.props.miljo}
                                id="brevpakke_env_pick"
                                func={miljo => this.selectMiljo(miljo)}
                                list={this.props.miljoList}
                            />
                        </ButtonGroup>
                    </Row>
                    <br />
                    <Row>
                        <div className="parent padding-right">
                            <div className="child inline-block-child big">
                                <ListItem
                                    className="btn-fill"
                                    bsStyle="fill"
                                    title={'Brevpakke: ' + this.props.brevpakke}
                                    id="brevpakke_pick"
                                    func={brevpakke =>
                                        this.selectBrevpakke(brevpakke)
                                    }
                                    list={this.props.brevpakkeList}
                                    isDisabled={this.props.miljo === ''}
                                />
                            </div>
                            <div className="child inline-block-child small">
                                <FormControl
                                    className="brevpakke-versjon"
                                    readOnly
                                    value={
                                        this.props.brevpakkeVersjon
                                            ? this.props.brevpakkeVersjon
                                            : ''
                                    }
                                />
                            </div>
                        </div>
                        <BrevpakkeListListener
                            selectBrevpakke={this.selectBrevpakke}
                        />
                    </Row>
                    <br />
                    <Row className="padding-right">
                        <DropdownButton
                            className="btn-fill"
                            disabled={this.props.brevpakke === ''}
                            title={this.setTitleName()}
                            id={'brevpakke_mal_pick'}
                            onSelect={brevmal => this.selectBrevmal(brevmal)}
                        >
                            {this.props.brevmalList.map(i => (
                                <MenuItem key={i.malID} eventKey={i}>
                                    {' '}
                                    {i.malID +
                                        ' - ' +
                                        (i.redigerbar ? 'Redigerbar' : '') +
                                        ' - ' +
                                        i.dokumentTittel}{' '}
                                </MenuItem>
                            )) /*mulig at vi må ha annen eventKey her. Feilmelding: missing key prop for element in iterator*/}
                        </DropdownButton>
                        <BrevmalListListener
                            selectBrevmal={this.selectBrevmal}
                        />
                    </Row>
                </div>
            </Col>
        );
    }
}

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
        pingActions: bindActionCreators(pingActions, dispatch),
        actions: bindActionCreators(menyValgActions, dispatch),
        actionsBrevdata: bindActionCreators(brevdataActions, dispatch),
        actionsDok: bindActionCreators(dokumentActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrevpakkeSelect);
