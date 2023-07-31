import React from 'react';
import { Modal } from '@navikt/ds-react';

export default function GenericModal({
    showModal,
    onClose,
    title,
    className,
    children,
}) {
    return (
        <Modal
            open={showModal}
            onClose={onClose}
            className={className}
            bsSize="large"
        >
            <Modal.Header closeButton>{title}</Modal.Header>
            <Modal.Body>{children}</Modal.Body>
        </Modal>
    );
}
