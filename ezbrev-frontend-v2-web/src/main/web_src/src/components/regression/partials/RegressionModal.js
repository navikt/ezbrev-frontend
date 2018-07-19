import React from 'react';
import {
    Button,
    Modal,
    OverlayTrigger,
    Popover,
    Tooltip
} from 'react-bootstrap';
import * as regressionActions from '~/actions/regressionActions';
import { bindActionCreators } from 'redux';
import * as regressionActionsUtil from '~/actions/regressionActionsUtil';
import { connect } from 'react-redux';

class RegressionModal extends React.Component {
    handleClose = () => this.props.actions.setRegressionModal(false);

    render() {
        return (
            <div>
                <Modal
                    show={this.props.isShown}
                    onHide={this.handleClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Regressjonstest startet</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Dette kan ta litt tid</h4>
                        <p>Nyt livet, pust med magen, og ikke trykk på knappen. Da starter regresjonstesten på nytt.</p>
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
