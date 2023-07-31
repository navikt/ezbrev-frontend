import React, { useRef, useState } from 'react';
import { Button } from '@navikt/ds-react';
import * as dokumentActionsUtil from '~/actions/dokumentActionsUtil';
import { connect } from 'react-redux';
import * as dokumentActions from '~/actions/dokumentActions';
import { bindActionCreators } from 'redux';
import ImageCarousel from './ImageCarousel';
import GenericModal from './GenericModal';

function highlightedText(line) {
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

const SammenlignMedGodkjent = ({ sammenlignInfo }) => {
    const [open, setOpen] = useState(false);
    const imageCarouselRef = useRef();

    const diffTextList = sammenlignInfo.unifiedDiff
        ? sammenlignInfo.unifiedDiff
        : [];
    return (
        <div>
            <ImageCarousel
                ref={imageCarouselRef}
                title={`Sammenligning
                     - Antall pixelfeil: ${sammenlignInfo.errors}`}
                pages={sammenlignInfo.sider}
            >
                <div>
                    <div className="pull-left">
                        <dl className="dl-horizontal">
                            <dt>Antall tekstfeil</dt>
                            <dd>{sammenlignInfo.textErrorCount}</dd>
                            <dt>Godkjent av</dt>
                            <dd>{sammenlignInfo.godkjentAv}</dd>
                            <dt>Godkjent dato</dt>
                            <dd>{sammenlignInfo.godkjentDato}</dd>
                        </dl>
                    </div>
                    <div className="pull-right">
                        <Button
                            onClick={() => setOpen(true)}
                            disabled={sammenlignInfo.textErrorCount === 0}
                        >
                            Vis tekstendringer
                        </Button>
                    </div>
                </div>
            </ImageCarousel>
            <GenericModal
                title="Tekstlig endring i brev"
                showModal={open}
                onClose={() => setOpen(false)}
            >
                {diffTextList.map((line) => highlightedText(line))}
            </GenericModal>
        </div>
    );
};

function mapStateToProps(state, ownProps) {
    return {
        sammenlignInfo: state.dokumentReducer.sammenlignInfo,
        showModal: state.dokumentReducer.showModal,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        utilActionsDok: bindActionCreators(dokumentActionsUtil, dispatch),
        actionsDok: bindActionCreators(dokumentActions, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SammenlignMedGodkjent);
