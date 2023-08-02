import React from 'react';
import { bindActionCreators } from 'redux';
import * as converterActions from '~/actions/converterActions';
import * as converterActionsUtil from '~/actions/converterActionsUtil';
import { Button, Heading } from '@navikt/ds-react';

import { connect } from 'react-redux';

const XMLConverter = ({ inputXML, outputXML, utilActions, actions }) => {
    return (
        <div className={'homepage-flex'}>
            <section style={{ padding: '1.5em' }}>
                <Button
                    className="fill"
                    onClick={() => utilActions.convertXML(inputXML)}
                    disabled={inputXML === ''}
                >
                    Konverter XML
                </Button>
            </section>
            <br />
            <section className={'inspection-flex'}>
                <div className="inline-div">
                    <Heading level={3} size={'small'}>
                        {' '}
                        XML Input{' '}
                    </Heading>

                    <textarea
                        cols="90"
                        rows="40"
                        className="inline-txtarea"
                        placeholder="Legg inn/skriv inn XML"
                        value={inputXML}
                        onChange={(event) => {
                            actions.setInputXML(event.target.value);
                        }}
                    />
                </div>
                <div className="inline-div">
                    <Heading level={3} size={'small'}>
                        {' '}
                        XML Output
                    </Heading>

                    <textarea
                        readOnly
                        cols="90"
                        rows="40"
                        className="inline-txtarea"
                        placeholder="Her kommer den konverterte XMLen"
                        value={outputXML}
                    />
                </div>
                <br />
            </section>
        </div>
    );
};

function mapStateToProps(state, ownProps) {
    return {
        inputXML: state.converter.inputXML,
        outputXML: state.converter.outputXML,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(converterActions, dispatch),
        utilActions: bindActionCreators(converterActionsUtil, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(XMLConverter);
