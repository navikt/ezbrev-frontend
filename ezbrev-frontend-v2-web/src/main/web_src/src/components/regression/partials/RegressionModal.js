import React from 'react';
import {
    Button,
    Modal,
    OverlayTrigger,
    Popover,
    Tooltip
} from 'react-bootstrap';
import * as regressionActions from '~/actions/RegressionActions';
import { bindActionCreators } from 'redux';
import * as regressionActionsUtil from '~/actions/RegressionActionsUtil';
import { connect } from 'react-redux';

class RegressionModal extends React.Component {
    handleClose = () => this.props.actions.setRegressionModal(false);

    render() {
        const popover = (
            <Popover id="modal-popover" title="popover">
                very popover. such engagement
            </Popover>
        );
        const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;
        return (
            <div>
                <Modal
                    show={this.props.isShown}
                    onHide={() => this.handleClose()}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Regressjonstest startet</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Text in a modal</h4>
                        <p>
                            Duis mollis, est non commodo luctus, nisi erat
                            porttitor ligula.
                        </p>
                        <h4>Popover in a modal</h4>
                        <p>
                            there is a{' '}
                            <OverlayTrigger overlay={popover}>
                                <a href="#popover">popover</a>
                            </OverlayTrigger>{' '}
                            here
                        </p>
                        <h4>Tooltips in a modal</h4>
                        <p>
                            there is a{' '}
                            <OverlayTrigger overlay={tooltip}>
                                <a href="#tooltip">tooltip</a>
                            </OverlayTrigger>{' '}
                            here
                        </p>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        isShown: state.regressjonReducer.regressionModal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        utilActions: bindActionCreators(regressionActionsUtil, dispatch),
        actions: bindActionCreators(regressionActions, dispatch)
        /* wrapper alle actions i mappen bindActionCreators i et kall til dispatch*/
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegressionModal);
