import React from 'react';
import { Button, Col, FormControl, FormGroup, Row } from 'react-bootstrap';
import ListItem from '~/components/common/ListItem';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as inspectionActions from '~/actions/InspectionActions';
import FormItem from '~/components/inspection/partials/FormItem';
import * as api from '~/api';
import * as pingActions from '~/actions/pingActions';
import * as errorActions from '~/actions/errorActions';
import * as loadingActions from '~/actions/loadingActions';
import { getPingByEnv } from '../../../api';

class InspectionSelection extends React.Component {
    constructor(props) {
        super(props);

        const miljo = localStorage.getItem('inspectionMiljo');
        miljo !== null ? this.selectMiljo(miljo) : '';
        const brevsystem = localStorage.getItem('brevsystem');
        brevsystem !== null ? this.selectBrevsystem(brevsystem) : '';
    }

    setData = (input, restMethod) => {
        if (input !== '' && input) {
            if (!isNaN(input)) {
                restMethod(this.props.miljo, this.props.brevsystem, input).then(
                    x => this.props.actions.setInspectionData(x)
                );
            } else {
                alert('Input må være et tall.');
            }
        }
    };

    selectMiljo = miljo => {
        this.props.actions.setMiljo(miljo);
        getPingByEnv(miljo).then(ping => this.props.pingActions.setPing(ping));
    };

    selectBrevsystem = brevsystem => {
        this.props.actions.setBrevsystem(brevsystem);
    };

    getXml = () => {
        this.props.loadingActions.setIsLoading(true);
        this.setData(this.props.mottakerId, api.getXmlByMottakerId);
        this.setData(this.props.journalpostId, api.getXmlByJournalpostId);
        this.setData(this.props.dokumentinfoId, api.getXmlByDokumentInfoId);
    };

    render() {
        return (
            <Col md={2}>
                <Row sm={3} className="padding-bottom">
                    <ListItem
                        className="btn-fill"
                        title={'Miljø: ' + this.props.miljo}
                        id="1"
                        func={miljo => {
                            this.selectMiljo(miljo);
                        }}
                        list={this.props.miljoList}
                    />
                </Row>
                <Row sm={3} className="padding-bottom">
                    <ListItem
                        className="btn-fill"
                        title={'Brevsystem: ' + this.props.brevsystem}
                        id="1"
                        func={brevsystem => this.selectBrevsystem(brevsystem)}
                        list={['DOKSYS', 'HP']}
                    />
                </Row>
                <FormItem
                    title={'MottakerId'}
                    store={this.props.mottakerId}
                    action={this.props.actions.setMottakerId}
                />
                <FormItem
                    title={'JournalpostId'}
                    store={this.props.journalpostId}
                    action={this.props.actions.setJournalpostId}
                />
                <FormItem
                    title={'DokumentInfoId'}
                    store={this.props.dokumentinfoId}
                    action={this.props.actions.setDokumentinfoId}
                />
                <Row>
                    <Button
                        className="float-left"
                        onClick={() => this.getXml()}
                        disabled={
                            this.props.miljo === '' ||
                            this.props.brevsystem === '' ||
                            (this.props.mottakerId === '' &&
                                this.props.journalpostId === '' &&
                                this.props.dokumentinfoId === '')
                        }
                    >
                        Hent XML
                    </Button>
                </Row>
            </Col>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        miljoList: state.inspection.miljoList,
        miljo: state.inspection.miljo,
        brevsystem: state.inspection.brevsystem,
        mottakerId: state.inspection.mottakerId,
        journalpostId: state.inspection.journalpostId,
        dokumentinfoId: state.inspection.dokumentinfoId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(inspectionActions, dispatch),
        pingActions: bindActionCreators(pingActions, dispatch),
        errorActions: bindActionCreators(errorActions, dispatch),
        loadingActions: bindActionCreators(loadingActions, dispatch)

        /* wrapper alle actions i mappen bindActionCreators i et kall til dispatch*/
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InspectionSelection);
