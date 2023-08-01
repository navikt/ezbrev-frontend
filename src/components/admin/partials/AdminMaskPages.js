import React from 'react';
import { Image } from 'react-bootstrap';
import * as adminActions from '~/actions/adminActions';
import ReactCrop, { makeAspectCrop } from 'react-image-crop';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as adminActionsUtil from '~/actions/adminActionsUtil';
import 'react-image-crop/dist/ReactCrop.css';
import { Button, Modal } from '@navikt/ds-react';

class AdminMaskPages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    changePage(page) {
        this.props.actionsAdmin.setAdminActivePage(page);
        this.setState({ changed: true, active: page });
    }

    onImageLoaded = (image) => {
        this.setState({
            crop: makeAspectCrop(
                {
                    x: 0,
                    y: 0,
                    width: 50,
                },
                image.naturalWidth / image.naturalHeight,
            ),

            image,
        });
    };

    onCropComplete = (crop, pixelCrop) => {
        console.log('onCropComplete, pixelCrop:', pixelCrop);
        const xstart = pixelCrop.x;
        const xslutt = pixelCrop.x + pixelCrop.width;
        const ystart = pixelCrop.y;
        const yslutt = pixelCrop.y + pixelCrop.height;
        const sidenr = this.props.active;
        this.props.actionsAdmin.setMask({
            xstart,
            xslutt,
            ystart,
            yslutt,
            sidenr,
        });
    };

    onCropChange = (crop) => {
        this.setState({ crop });
    };

    render() {
        const pages = this.props.pages || [];
        return (
            <Modal
                open={this.props.showModal && !this.props.isLoading}
                onClose={() => this.props.actionsAdmin.setAdminShowModal(false)}
                title="Maskering"
            >
                <Modal.Content>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '1em',
                        }}
                    >
                        <div
                            style={{
                                overflowY: 'scroll',
                                width: '17%',
                            }}
                        >
                            {pages.map((img, key) => {
                                return (
                                    <Image
                                        src={'data:image/png;base64,' + img}
                                        thumbnail
                                        onClick={this.changePage.bind(
                                            this,
                                            key,
                                        )}
                                        key={key}
                                    />
                                );
                            })}
                        </div>

                        <div style={{ width: '80%' }}>
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
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Button
                                    onClick={() => {
                                        this.props.utilActionsAdmin.saveMask(
                                            this.props.miljo,
                                            this.props.brevdataId,
                                            this.props.mask,
                                        );
                                    }}
                                >
                                    Lagre
                                </Button>

                                <Button
                                    variant={'danger'}
                                    onClick={() => {
                                        this.props.utilActionsAdmin.deleteMasks(
                                            this.props.miljo,
                                            this.props.brevdataId,
                                        );
                                    }}
                                >
                                    Fjern alle
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal.Content>
            </Modal>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        pages: state.admin.pngPages,
        active: state.admin.activePage,
        showModal: state.admin.showModal,
        mask: state.admin.mask,
        brevdataId: state.admin.adminBrevdataId,
        miljo: state.admin.adminMiljo,
        isLoading: state.loading.isLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionsAdmin: bindActionCreators(adminActions, dispatch),
        utilActionsAdmin: bindActionCreators(adminActionsUtil, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminMaskPages);
