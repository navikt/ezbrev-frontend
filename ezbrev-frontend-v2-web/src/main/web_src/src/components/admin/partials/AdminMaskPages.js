import React from 'react';
import { Button, Col, Grid, Image, Row, Modal } from 'react-bootstrap';
import { Space } from '../../common/scaffolding';
import * as adminActions from '~/actions/adminActions';
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

    handleCrop() {

    }

    getActivePageMasks() {

    }

    clearMasks() {

    }

    saveMasks() {

    }

    render() {
        const pages = this.props.pages || [];
        return (
            <Modal show= { this.props.showModal } onHide={this.props.actionsAdmin.setAdminShowModal(false)} title="Maskering" bsSize="large">
                <Grid>
                    <Row>
                        <Col md={2}>
                            <div
                                style={{
                                    maxHeight: 820 + 'px',
                                    overflowY: 'scroll'
                                }}
                            >
                                {pages.map((img, key) => {
                                    return (
                                        <Image
                                            src={'data:image/png;base64,' + img}
                                            width="175px"
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
                        <Col md={10} style={{ maxWidth: 670 + 'px' }}>
                            <div>
                                <img src={''}
                                    ref="crop"
                                    width="550px"
                                />
                                <Button
                                    style={{ width: 15 + '%' }}
                                    bsSize="small"
                                    bsStyle="info"
                                >
                                    Masker
                                </Button>
                                <Space />
                                <Button
                                    style={{ width: 15 + '%' }}
                                    bsSize="small"
                                    bsStyle="danger"
                                >
                                    Fjern alle
                                </Button>
                                <Button
                                    style={{ width: 15 + '%' }}
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
            </Modal>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        pages: state.admin.pngPages,
        //active: state.admin.activePage,
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
