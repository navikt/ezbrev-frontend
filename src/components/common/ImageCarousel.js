import React from 'react';
import { Modal, Carousel, CarouselItem } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import * as dokumentActions from '~/actions/dokumentActions';
import { connect } from 'react-redux';

class ImageCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            direction: null,
            showModal: false,
        };
    }

    handleSelect(selectedIndex, selectedDirection) {
        this.setState({
            index: selectedIndex,
            direction: selectedDirection,
        });
    }

    render() {
        return (
            <Modal
                show={this.props.showModal}
                onHide={() => this.props.actionsDok.setShowModal(false)}
                id="test-id"
            >
                <Modal.Header closeButton>
                    <Modal.Title> {this.props.title} </Modal.Title>
                </Modal.Header>

                <Modal.Body>{this.renderCarousel()}</Modal.Body>
                <Modal.Footer>{this.props.children}</Modal.Footer>
            </Modal>
        );
    }

    renderCarousel() {
        return (
            <Carousel
                activeIndex={this.state.index}
                direction={this.state.direction}
                onSelect={this.handleSelect.bind(this)}
            >
                {this.renderImages()}
            </Carousel>
        );
    }

    renderImages() {
        const comparison = this.props.pages ? this.props.pages : [];
        return comparison.map((image, key) => {
            return (
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
            );
        });
    }
}

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
