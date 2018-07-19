import React from 'react';
import GenericModal from '../common/modal';
import { Button, Col, Grid, Image, Row } from 'react-bootstrap';
import { values } from 'lodash';
import $ from 'jquery';
import 'jcrop';
import { Space } from '../common/scaffolding';
import adminActions from '~/actions/adminAdctions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class AdminMaskPages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.unMaskStore = MaskStore.listen(() => {
            if (MaskStore.isNew()) {
                this.open();
            }
        });
    }

    componentWillUnmount() {
        this.unMaskStore();
        this.destroy();
    }

    destroy() {
        if (this.state.jcrop_api) {
            this.state.jcrop_api.destroy();
        }
    }

    componentDidUpdate() {
        const self = this;
        window.requestAnimationFrame(function() {
            self.jcrop();
        });
    }

    changePage(page) {
        this.setState({
            active: page,
            changed: true
        });
    }

    open() {
        this.setState({
            pages: MaskStore.getPngPages(),
            masks: MaskStore.getMasks(),
            active: 0,
            changed: true
        });
        this.refs.modal.open();
    }

    jcrop() {
        const { changed } = this.state;
        const imgHtmlObjExists = !!this.refs.crop;
        if (!imgHtmlObjExists || !changed) {
            return;
        }
        this.destroy();

        // apply jcrop
        const self = this;
        const domNode = this.refs.crop.getDOMNode();
        let trueWidth = domNode.naturalWidth;
        let trueHeight = domNode.naturalHeight;
        let width = domNode.width;
        let ratio = width / trueWidth;
        $(domNode).Jcrop(
            {
                bgColor: 'grey',
                trueSize: [trueWidth, trueHeight]
            },
            function() {
                self.setState({ jcrop_api: this, changed: false });
            }
        );

        // display masks
        const { masks, active } = this.state;
        if (masks[active]) {
            const $jcrop = $('.jcrop-holder');
            masks[active].map(mask => {
                let pos = `width: ${(mask.xslutt - mask.xstart) * ratio}px;
                    height: ${(mask.yslutt - mask.ystart) * ratio}px;
                    top: ${mask.ystart * ratio}px;
                    left: ${mask.xstart * ratio}px;`;
                $jcrop.append(`<div style='${pos}' class='active-mask'></div>`);
            });
        }
    }

    handleCrop() {
        const { jcrop_api, active } = this.state;
        const select = jcrop_api.tellSelect();
        const pageMasks = this.getActivePageMasks();
        const newMask = {
            xstart: parseInt(select.x),
            xslutt: parseInt(select.x2),
            ystart: parseInt(select.y),
            yslutt: parseInt(select.y2),
            sidenr: active
        };
        if (
            newMask.xstart == newMask.xslutt ||
            newMask.ystart == newMask.yslutt
        ) {
            return;
        }
        pageMasks.push(newMask);
        this.setState({ changed: true });
    }

    getActivePageMasks() {
        const { masks, active } = this.state;
        const pageMasks = masks[active] || [];
        masks[active] = pageMasks;
        return pageMasks;
    }

    clearMasks() {
        this.setState({
            masks: {},
            changed: true
        });
    }

    saveMasks() {
        const brevdataId = MaskStore.getBrevdataId();
        const { masks } = this.state;
        let masksAsFlatList = values(masks);
        masksAsFlatList =
            masksAsFlatList.length > 0
                ? masksAsFlatList.reduce((a, b) => a.concat(b))
                : [];
        ApiActions.postMasksForBrevdata({ masks: masksAsFlatList }, brevdataId);
    }

    render() {
        const pages = this.state.pages || [];
        return (
            <GenericModal ref="modal" title="Maskering" bsSize="large">
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
                                <img
                                    src={
                                        'data:image/png;base64,' +
                                        pages[this.state.active]
                                    }
                                    ref="crop"
                                    width="550px"
                                />
                                <Button
                                    style={{ width: 15 + '%' }}
                                    onClick={this.handleCrop.bind(this)}
                                    bsSize="small"
                                    bsStyle="info"
                                >
                                    Masker
                                </Button>
                                <Space />
                                <Button
                                    style={{ width: 15 + '%' }}
                                    onClick={this.clearMasks.bind(this)}
                                    bsSize="small"
                                    bsStyle="danger"
                                >
                                    Fjern alle
                                </Button>
                                <Button
                                    style={{ width: 15 + '%' }}
                                    className="pull-right"
                                    onClick={this.saveMasks.bind(this)}
                                    bsSize="small"
                                    bsStyle="success"
                                >
                                    Lagre
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </GenericModal>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        page: state.admin.pngPages,
        active:state.admin.activePage,
        masks: state.admin.masks,
        changed:state.admin.changed
}
}

function mapDispatchToProps(dispatch) {
    bindActionCreators(adminActions, dispatch);
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminMaskPages);
