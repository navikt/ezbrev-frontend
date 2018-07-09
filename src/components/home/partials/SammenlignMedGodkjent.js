import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Space } from '../../common/Scaffolding';
import * as dokumentActionsUtil from '~/actions/dokumentActionsUtil';
import { connect } from 'react-redux';
import * as dokumentActions from '~/actions/dokumentActions';
import { bindActionCreators } from 'redux';
import Highlight from 'react-highlight';
//import ImageCarousel from './common/image_carousel';
//import GenericModal from './common/modal';
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
    convertToPNG = () => {
        let PNGArray = [];
        this.props.sammenlignInfo.sider.map(image =>
            PNGArray.push('data:image/png;base64,' + image)
        );
        return PNGArray;
    };

    render() {
        return (
            <Modal
                aria-labelledby="SammenlignMedGodkjent"
                // style={modalStyle}
                backdrop={true}
                show={this.props.showModal}
                onHide={() => {
                    this.props.actionsDok.setShowModal(false);
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Sammenlign med godkjent</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.sammenlignInfo.sider.map(image => (
                        <section>
                            <img
                                id={image}
                                src={'data:image/png;base64,' + image}
                                alt={''}
                                height={'300'}
                            />
                            <Space />
                        </section>
                    ))}
                    <div>
                        <div className="pull-left">
                            <dl className="dl-horizontal">
                                <dt>Antall tekstfeil</dt>
                                <dd>
                                    {this.props.sammenlignInfo.textErrorCount}
                                </dd>
                                <dt>Godkjent av</dt>
                                <dd>{this.props.sammenlignInfo.godkjentAv}</dd>
                                <dt>Godkjent miljø</dt>
                                <dd>
                                    {this.props.sammenlignInfo.godkjentMiljoe}
                                </dd>
                                <dt>Godkjent dato</dt>
                                <dd>
                                    {this.props.sammenlignInfo.godkjentDato}
                                </dd>
                            </dl>
                        </div>
                        <div className="pull-right">
                            <Button className="pull-right brev-compare-btn btn btn-warning">
                                Vis tekstendringer
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
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
