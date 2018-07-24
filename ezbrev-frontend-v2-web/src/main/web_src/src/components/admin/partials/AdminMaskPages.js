import React from 'react';
import { Button, Col, Grid, Image, Row, Modal } from 'react-bootstrap';
import { Space } from '../../common/scaffolding';
import * as adminActions from '~/actions/adminActions';
import ReactCrop, { makeAspectCrop } from 'react-image-crop';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as adminActionsUtil from '~/actions/adminActionsUtil';
import 'react-image-crop/dist/ReactCrop.css';

class AdminMaskPages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    changePage(page) {
        this.props.actionsAdmin.setAdminActivePage(page);
        this.setState({ changed: true, active: page });
    }

    onImageLoaded = image => {
        this.setState({
            crop: makeAspectCrop(
                {
                    x: 0,
                    y: 0,
                    width: 50
                },
                image.naturalWidth / image.naturalHeight
            ),

            image
        });
    };

    onCropComplete = (crop, pixelCrop) => {
        console.log('onCropComplete, pixelCrop:', pixelCrop);
        const xstart=pixelCrop.x;
        const xslutt=pixelCrop.x + pixelCrop.width;
        const ystart=pixelCrop.y;
        const yslutt=pixelCrop.y + pixelCrop.height;
        const sidenr=this.props.active;
        this.props.actionsAdmin.setMask({xstart,xslutt,ystart,yslutt,sidenr});
    };

    onCropChange = crop => {
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
                            <Col md={2} >
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
                                        onImageLoaded={this.onImageLoaded}
                                        onComplete={this.onCropComplete}
                                        onChange={this.onCropChange}
                                        minWidth={0}
                                        minHeight={0}
                                    />
                                    <Button
                                        bsSize="small"
                                        bsStyle="success"
                                        onClick={()=>{
                                            this.props.utilActionsAdmin.saveMask(this.props.miljo,this.props.brevdataId,this.props.mask)
                                        }}
                                    >
                                        Lagre
                                    </Button>
                                    <Space />
                                    <Button bsSize="small" bsStyle="danger"
                                    onClick={()=>{this.props.utilActionsAdmin.deleteMasks(this.props.miljo,this.props.brevdataId)}}>
                                        Fjern alle
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
        showModal: state.admin.showModal,
        mask:state.admin.mask,
        brevdataId:state.admin.adminBrevdataId,
        miljo: state.admin.adminMiljo
        // changed: state.admin.changed
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionsAdmin: bindActionCreators(adminActions, dispatch),
        utilActionsAdmin:bindActionCreators(adminActionsUtil,dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminMaskPages);
