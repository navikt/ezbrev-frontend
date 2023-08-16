import React from 'react';
import { BodyLong, Heading, Modal } from '@navikt/ds-react';

export default function GenericModal({
    showModal,
    onClose,
    title,
    className,
    children,
}) {
    return (
        <Modal open={showModal} onClose={onClose} className={className}>
            <Modal.Content>
                <Heading size={'medium'}>{title}</Heading>
                <BodyLong>{children}</BodyLong>
            </Modal.Content>
        </Modal>
    );
}
