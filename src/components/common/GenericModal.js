import React from 'react';
import { Modal } from 'react-bootstrap';

class GenericModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false };
    }

    open() {
        this.setState({
            showModal: true,
        });
    }

    close() {
        this.setState({
            showModal: false,
        });
    }

    render() {
        return (
            <Modal
                show={this.state.showModal}
                onHide={this.close.bind(this)}
                className={this.props.className}
                bsSize="large"
            >
                <Modal.Header closeButton>{this.props.title}</Modal.Header>
                <Modal.Body>{this.props.children}</Modal.Body>
            </Modal>
        );
    }
}

export default GenericModal;
