import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as menyValgActionsUtil from '../../../actions/menyValgActionsUtil';
import * as menyValgActions from '../../../actions/menyValgActions';
import * as brevdataActions from '../../../actions/brevdataActions';
import * as dokumentActions from '../../../actions/dokumentActions';
import * as pingActions from '../../../actions/pingActions';
import ListItem from '../../common/ListItem';
import { getPingByEnv } from '../../../api';
import BrevpakkeListListener from './BrevpakkeListListener';
import BrevmalListListener from './BrevmalListListener';
import { Select, TextField } from '@navikt/ds-react';

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

    setTitleName(brevmal) {
        if (!brevmal) {
            return 'Brevmal: ';
        } else if (brevmal.redigerbar) {
            return 'Brevmal: ' + brevmal.malID + ' Redigerbar';
        } else {
            return 'Brevmal: ' + brevmal.malID;
        }
    }

    selectMiljo = (miljo) => {
        this.props.actions.setMiljo(miljo);
        this.props.utilActions.selectMiljo(miljo);
        this.props.actionsBrevdata.resetBrevdataId('');
        getPingByEnv(miljo).then((ping) =>
            this.props.pingActions.setPing(ping),
        );
    };

    selectBrevpakke = (brevpakke) => {
        let brevInfo = this.props.brevInfo;
        let miljo = this.props.miljo;
        this.props.utilActions.selectBrevpakke(brevpakke, brevInfo);
        this.props.utilActions.fetchBrevpakkeVersjon(miljo, brevpakke);
        this.props.actions.setBrevpakke(brevpakke);
        this.props.actionsDok.setDokument('');
        this.props.actionsBrevdata.resetBrevdataId('');
    };

    selectBrevmal = (brevmalId) => {
        const brevmal = this.props.brevmalList.filter(
            (mal) => mal.malID === brevmalId,
        )[0];
        this.props.utilActions.selectBrevmal(brevmalId, this.props.brevpakke);
        this.props.actions.setBrevmal(brevmal);
        this.props.actionsBrevdata.resetBrevdataId('');
    };

    render() {
        return (
            <div className={'in-homepage-flex'} style={{ maxWidth: '20em' }}>
                <ListItem
                    className="btn-fill"
                    title={'Miljø:'}
                    value={this.props.miljo}
                    id="brevpakke_env_pick"
                    func={(miljo) => this.selectMiljo(miljo)}
                    list={this.props.miljoList}
                />

                <ListItem
                    className="btn-fill"
                    bsStyle="fill"
                    title={'Brevpakke:'}
                    value={this.props.brevpakke}
                    id="brevpakke_pick"
                    func={(brevpakke) => this.selectBrevpakke(brevpakke)}
                    list={this.props.brevpakkeList}
                    isDisabled={this.props.miljo === ''}
                />

                <TextField
                    className="brevpakke-versjon"
                    label={'Brevpakke-versjon'}
                    readOnly
                    value={
                        this.props.brevpakkeVersjon
                            ? this.props.brevpakkeVersjon
                            : ''
                    }
                />

                <BrevpakkeListListener selectBrevpakke={this.selectBrevpakke} />

                <Select
                    className="btn-fill"
                    label={'Brevmal:'}
                    disabled={this.props.brevpakke === ''}
                    title={this.setTitleName(this.props.brevmal)}
                    id={'brevpakke_mal_pick'}
                    onChange={(event) => this.selectBrevmal(event.target.value)}
                >
                    {this.props.brevmalList.map((i) => (
                        <option key={i.malID} value={i.malID}>
                            {' '}
                            {i.malID +
                                ' - ' +
                                (i.redigerbar ? 'Redigerbar' : '') +
                                ' - ' +
                                i.dokumentTittel}{' '}
                        </option>
                    ))}
                </Select>
                <BrevmalListListener selectBrevmal={this.selectBrevmal} />
            </div>
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
        brevpakkeVersjon: state.menyValg.brevpakkeVersjon,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        utilActions: bindActionCreators(menyValgActionsUtil, dispatch),
        pingActions: bindActionCreators(pingActions, dispatch),
        actions: bindActionCreators(menyValgActions, dispatch),
        actionsBrevdata: bindActionCreators(brevdataActions, dispatch),
        actionsDok: bindActionCreators(dokumentActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BrevpakkeSelect);
