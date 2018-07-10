import React from 'react';
import { Modal, Carousel, CarouselItem, Button } from 'react-bootstrap';
import {bindActionCreators} from "redux";
import * as dokumentActions from "~/actions/dokumentActions";
import {connect} from "react-redux";

class ImageCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            direction: null,
            showModal: false
        };
    }

    handleSelect(selectedIndex, selectedDirection) {
        this.setState({
            index: selectedIndex,
            direction: selectedDirection
        });
    }

    render() {
        return (
            <Modal show={this.props.showModal} onHide={()=>this.props.actionsDok.setShowModal(false)}>
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
        const pages = this.props.pages ? this.props.pages : [];
        return pages.map((image, key) => {
            return (
                <CarouselItem key={key}>
                    <img src={'data:image/png;base64,' + image} alt="" />

                    <div className="carousel-caption">
                        <h4>
                            Side {key + 1}/{pages.length}
                        </h4>
                    </div>
                </CarouselItem>
            );
        });
    }
}

function mapStateToProps(state, ownProps) {
    return {
        showModal: state.dokumentReducer.showModal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionsDok: bindActionCreators(dokumentActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ImageCarousel);
