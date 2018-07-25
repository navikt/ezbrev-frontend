import React from 'react';
import { Modal } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as errorActions from '~/actions/errorActions';

class ErrorModal extends React.Component {
    close = () => {
        this.props.actions.hideError();
    };

    render() {
        if (this.props.showModal) {
            return (
                <div>
                    <Modal show={this.props.showModal} onHide={this.close}>
                        <Modal.Header closeButton>
                            {'Error:' + ' ' + this.props.modalTitle}
                        </Modal.Header>
                        <Modal.Title />
                        <Modal.Body>{this.props.modalBody}</Modal.Body>
                    </Modal>
                </div>
            );
        } else {
            return <div />;
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        modalTitle: state.error.modalTitle,
        modalBody: state.error.modalBody,
        showModal: state.error.showModal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(errorActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ErrorModal);
