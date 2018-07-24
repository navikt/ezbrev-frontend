import React from 'react';
import { bindActionCreators } from 'redux';
import * as inspectionActions from '~/actions/InspectionActions';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';
import InspectionTableItem from '~/components/inspection/partials/InspectionTableItem';
import InspectionDokument from '~/components/inspection/partials/InspectionDokument';

class InspectionTable extends React.Component {
    mapDocuments = (documentArray,showXML) => {
        return documentArray.map(document => (
            <InspectionDokument
                key={document.dokumentInfoId}
                document={document}
                showXML={showXML}
            />
        ));
    };

    mapJournalposts = () => {
        let showXML=(this.props.inspectionData.journalposts.length===1);
        return this.props.inspectionData.journalposts.map(journalpost => (
            <InspectionTableItem
                key={journalpost.journalpostId}
                header={'JournalId ' + journalpost.journalpostId}
                data={this.mapDocuments(journalpost.dokuments,showXML)}
            />
        ));
    };

    render() {
        if (
            Object.keys(this.props.inspectionData).length > 0 &&
            this.props.inspectionData.mottakerId !== null
        ) {
            return (
                <Col md={10}>
                    <InspectionTableItem
                        header={
                            'MottakerId ' + this.props.inspectionData.mottakerId
                        }
                        data={this.mapJournalposts()}
                    />
                </Col>
            );
        } else {
            if (this.props.inspectionData.mottakerId === null) {
                return <div>Fant ikke XML</div>;
            } else {
                return <div />;
            }
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        inspectionData: state.inspectionDataReducer.inspectionData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(inspectionActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InspectionTable);
