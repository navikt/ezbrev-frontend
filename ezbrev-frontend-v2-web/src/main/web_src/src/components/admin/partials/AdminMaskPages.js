import React from 'react';
import { Button, Col, Grid, Image, Row, Modal } from 'react-bootstrap';
import { Space } from '../../common/scaffolding';
import * as adminActions from '~/actions/adminActions';
import ReactCrop from 'react-image-crop';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class AdminMaskPages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    changePage(page) {
        this.props.actionsAdmin.setAdminActivePage(page);
        this.setState({ changed: true, active: page });
    }

    handleCrop() {}

    getActivePageMasks() {}

    clearMasks() {}

    saveMasks() {}

    onChange = crop => {
        this.setState({ crop });
    };

    render() {
        const pages = this.props.pages || [];
        return (
            <Modal
                show={this.props.showModal}
                onHide={() => this.props.actionsAdmin.setAdminShowModal(false)}
                title="Maskering"
                bsSize="large"
            >
                <Modal.Body>
                    <Grid>
                        <Row>
                            <Col md={2}>
                                <div
                                    style={{

                                        overflowY: 'scroll'
                                    }}
                                >
                                    {pages.map((img, key) => {
                                        return (
                                            <Image
                                                src={
                                                    'data:image/png;base64,' +
                                                    img
                                                }
                                                thumbnail
                                                onClick={this.changePage.bind(
                                                    this,
                                                    key
                                                )}
                                                key={key}
                                            />
                                        );
                                    })}
                                </div>
                            </Col>
                            <Col md={10}>
                                <div>
                                    <ReactCrop
                                        src={
                                            'data:image/png;base64,' +
                                            this.props.pages[this.props.active]
                                        }
                                        alt={'Missing image'}
                                        crop={this.state.crop}
                                        ref="crop"

                                    />
                                    <Button
                                        bsSize="small"
                                        bsStyle="info"
                                    >
                                        Masker
                                    </Button>
                                    <Space />
                                    <Button
                                        bsSize="small"
                                        bsStyle="danger"
                                    >
                                        Fjern alle
                                    </Button>
                                    <Button
                                        className="pull-right"
                                        bsSize="small"
                                        bsStyle="success"
                                    >
                                        Lagre
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </Modal.Body>
            </Modal>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        pages: state.admin.pngPages,
        active: state.admin.activePage,
        masks: state.admin.masks,
        showModal: state.admin.showModal
        // changed: state.admin.changed
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionsAdmin: bindActionCreators(adminActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminMaskPages);
