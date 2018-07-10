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
            <Modal bsSize="large" show={this.props.showModal} onHide={()=>this.props.actionsDok.setShowModal(false)}  id="test-id">
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
        const newPages= this.props.newPages ? this.props.newPages : [];
        const approvedPages= this.props.approvedPages ? this.props.approvedPages : [];
        let list=[];
        for (let page = 0; page<(comparison.length);page++){
            let innerList=[newPages[page],comparison[page],approvedPages[page]]
            list.push(innerList)
            let i = 1;
            console.log("iterwasjon:"+ i);
            i++;
        }
        {console.log(list)}
        return list.map((images, key) => {
            return (
                <CarouselItem key={key}>
                    <div className="tester-modal">

                    <div>
                        <img className="image" src={'data:image/png;base64,' + images[0]} alt=""/>
                    </div>
                    <div >
                        <img className="image" src={'data:image/png;base64,' + images[1]} alt="" />
                    </div>
                    <div >
                        <img className="image" src={'data:image/png;base64,' + images[2]} alt="" />
                    </div>
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
