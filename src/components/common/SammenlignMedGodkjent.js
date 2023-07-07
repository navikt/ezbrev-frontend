import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import * as dokumentActionsUtil from '~/actions/dokumentActionsUtil';
import { connect } from 'react-redux';
import * as dokumentActions from '~/actions/dokumentActions';
import { bindActionCreators } from 'redux';
import ImageCarousel from './ImageCarousel';
import GenericModal from './GenericModal';

class SammenlignMedGodkjent extends React.Component {
    openDiffModal() {
        this.refs.diffModal.open();
    }

    highlightedText(line) {
        if (line[0] === '-') {
            return <p className="approved-text-line">{line}</p>;
        } else if (line[0] === '+') {
            return <p className="new-text-line">{line}</p>;
        } else if (
            line.substring(0, 2) === '@@' ||
            line.substring(0, 3) === '+++' ||
            line.substring(0, 3) === '---'
        ) {
            return <p className="grey-text-line">{line}</p>;
        } else {
            return <p> {line}</p>;
        }
    }

    render() {
        const diffTextList = this.props.sammenlignInfo.unifiedDiff
            ? this.props.sammenlignInfo.unifiedDiff
            : [];
        return (
            <div>
                <ImageCarousel
                    ref={'imageCarousel'}
                    title={`Sammenligning
                     - Antall pixelfeil: ${this.props.sammenlignInfo.errors}`}
                    pages={this.props.sammenlignInfo.sider}
                >
                    <div>
                        <div className="pull-left">
                            <dl className="dl-horizontal">
                                <dt>Antall tekstfeil</dt>
                                <dd>
                                    {this.props.sammenlignInfo.textErrorCount}
                                </dd>
                                <dt>Godkjent av</dt>
                                <dd>{this.props.sammenlignInfo.godkjentAv}</dd>
                                <dt>Godkjent dato</dt>
                                <dd>
                                    {this.props.sammenlignInfo.godkjentDato}
                                </dd>
                            </dl>
                        </div>
                        <div className="pull-right">
                            <Button
                                onClick={this.openDiffModal.bind(this)}
                                disabled={
                                    this.props.sammenlignInfo.textErrorCount ===
                                    0
                                }
                            >
                                Vis tekstendringer
                            </Button>
                        </div>
                    </div>
                </ImageCarousel>
                <GenericModal title="Tekstlig endring i brev" ref="diffModal">
                    {diffTextList.map(line => this.highlightedText(line))}
                </GenericModal>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        sammenlignInfo: state.dokumentReducer.sammenlignInfo,
        showModal: state.dokumentReducer.showModal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        utilActionsDok: bindActionCreators(dokumentActionsUtil, dispatch),
        actionsDok: bindActionCreators(dokumentActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SammenlignMedGodkjent);
