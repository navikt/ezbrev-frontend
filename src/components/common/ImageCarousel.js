import React, { useState } from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import * as dokumentActions from '~/actions/dokumentActions';
import { connect } from 'react-redux';
import { BodyLong, Heading, Modal, BodyShort } from '@navikt/ds-react';

const ImageCarousel = ({ children, pages, title, showModal, actionsDok }) => {
    const comparison = pages ? pages : [];
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);

    return (
        <Modal
            open={showModal}
            onClose={() => actionsDok.setShowModal(false)}
            id="test-id"
        >
            <Modal.Content>
                <Heading size={'small'}>{title}</Heading>
                <BodyLong>
                    <Carousel
                        activeIndex={index}
                        direction={direction}
                        onSelect={(selectedIndex, selectedDirection) => {
                            setIndex(selectedIndex);
                            setDirection(selectedDirection);
                        }}
                    >
                        {comparison.map((image, key) => (
                            <CarouselItem key={key}>
                                <div>
                                    <img
                                        className="image"
                                        src={'data:image/png;base64,' + image}
                                        alt=""
                                    />
                                </div>
                                <div className="carousel-caption">
                                    <h4>
                                        Side {key + 1}/{comparison.length}
                                    </h4>
                                </div>
                            </CarouselItem>
                        ))}
                    </Carousel>
                </BodyLong>
                <BodyShort>{children}</BodyShort>
            </Modal.Content>
        </Modal>
    );
};

function mapStateToProps(state, ownProps) {
    return {
        showModal: state.dokumentReducer.showModal,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionsDok: bindActionCreators(dokumentActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageCarousel);
