import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Space } from '../../common/Scaffolding';
import * as dokumentActionsUtil from '~/actions/dokumentActionsUtil';
import { connect } from 'react-redux';
import * as dokumentActions from '~/actions/dokumentActions';
import { bindActionCreators } from 'redux';
import Highlight from 'react-highlight';
import ImageCarousel from '../../common/ImageCarousel';
import GenericModal from '../../common/GenericModal'
//
// const modalStyle = {
//     position: 'fixed',
//     zIndex: 1040,
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0
// };

class SammenlignMedGodkjent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    openDiffModal() {
        this.refs.diffModal.open();
    }

    convertToPNG = () => {
        let PNGArray = [];
        this.props.sammenlignInfo.sider.map(image =>
            PNGArray.push('data:image/png;base64,' + image)
        );
        return PNGArray;
    };

    render() {
        return (
            <div>
                <ImageCarousel ref={'imageCarousel'}
                               title={`Godkjent versjon: ${this.props.sammenlignInfo.godkjentMalversjon} - Antall pixelfeil: ${this.props.sammenlignInfo.percentage}`}
                               pages={this.props.sammenlignInfo.sider}>
                    <div>
                        <div className="pull-left">
                            <dl className="dl-horizontal">
                                <dt>Antall textfeil</dt>
                                <dd>{this.props.sammenlignInfo.textErrorCount}</dd>
                                <dt>Godkjent av</dt>
                                <dd>{this.props.sammenlignInfo.godkjentAv}</dd>
                                <dt>Godkjent miljø</dt>
                                <dd>{this.props.sammenlignInfo.godkjentMiljoe}</dd>
                                <dt>Godkjent dato</dt>
                                <dd>{this.props.sammenlignInfo.godkjentDato}</dd>
                            </dl>
                        </div>
                        <div className="pull-right">
                            <Button onClick={this.openDiffModal.bind(this)}>Vis tekstendringer</Button>
                        </div>
                    </div>
                </ImageCarousel>

                <GenericModal title="Tekstlig endring i brev" ref="diffModal">
                    <Highlight className="diff">{this.props.sammenlignInfo.unifiedDiff}</Highlight>
                </GenericModal>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        sammenlignInfo: state.dokumentReducer.sammenlignInfo,
        showModal: state.dokumentReducer.showModal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        utilActionsDok: bindActionCreators(dokumentActionsUtil, dispatch),
        actionsDok: bindActionCreators(dokumentActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SammenlignMedGodkjent);
