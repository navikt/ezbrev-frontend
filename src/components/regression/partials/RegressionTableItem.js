import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Brev from '../partials/Brev';
import { getRegressionObjects } from '~/components/regression/partials/RegressionUtil';
import * as regressionActions from '~/actions/regressionActions';
import * as regressionActionsUtil from '~/actions/regressionActionsUtil';
import { bestillbrevdata } from '~/api';
import * as dokumentActions from '~/actions/dokumentActions';
import * as dokumentActionsUtil from '~/actions/dokumentActionsUtil';
import { Accordion, Button, Table } from '@navikt/ds-react';

const RegressionTableItem = ({
    item,
    miljoList,
    brevInfo,
    brevpakkeList,
    brevmalList,
    miljo,
    brevpakke,
    brevdataList,
    regressionSimilarity,
    utilActions,
    actions,
    utilActionsDok,
    actionsDok,
}) => {
    const regtestMal = (malId) => {
        let regressionObjects = getRegressionObjects([malId], brevdataList);
        utilActions.startRegressionTest(regressionObjects, miljo);
    };

    const sammenlign = (brevdataId, dokumenttypeId) => {
        bestillbrevdata(brevdataId, dokumenttypeId, miljo).then((json) => {
            utilActionsDok.showSammenlignMedGodkjent(
                miljo,
                json.journalpostId,
                json.dokumentInfoId,
                brevdataId,
            );
        });
    };

    return (
        <Accordion.Item>
            <Accordion.Header>
                {`${item.malId} – ${item.tittel}`}
            </Accordion.Header>
            <Accordion.Content>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Beskrivelse</Table.HeaderCell>
                            <Table.HeaderCell>Likhet</Table.HeaderCell>
                            <Table.HeaderCell>
                                <Button
                                    className="btn"
                                    bsSize="small"
                                    onClick={() => regtestMal(item.malId)}
                                >
                                    Regtest mal
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Brev
                        malId={item.malId}
                        sammenlign={sammenlign}
                        brevdataList={brevdataList}
                        regressionSimilarity={regressionSimilarity}
                    />
                </Table>
            </Accordion.Content>
        </Accordion.Item>
    );
};

function mapStateToProps(state, ownProps) {
    return {
        miljoList: state.regressjonReducer.regressjonMiljoList,
        brevInfo: state.regressjonReducer.regressjonBrevInfo,
        brevpakkeList: state.regressjonReducer.regressjonBrevpakkeList,
        brevmalList: state.regressjonReducer.regressjonBrevmalList,
        miljo: state.regressjonReducer.regressjonMiljo,
        brevpakke: state.regressjonReducer.regressjonBrevpakke,
        brevdataList: state.regressjonReducer.regressjonBrevdataList,
        regressionSimilarity: state.regressjonReducer.regressionSimilarity,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        utilActions: bindActionCreators(regressionActionsUtil, dispatch),
        actions: bindActionCreators(regressionActions, dispatch),
        utilActionsDok: bindActionCreators(dokumentActionsUtil, dispatch),
        actionsDok: bindActionCreators(dokumentActions, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RegressionTableItem);
