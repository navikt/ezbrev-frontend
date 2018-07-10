import React from 'react';
import { Button } from 'react-bootstrap';
import { Space } from '../common/Scaffolding';
import { bindActionCreators } from 'redux';
import * as converterActions from '~/actions/converterActions';
import * as converterActionsUtil from '~/actions/converterActionsUtil';

import { connect } from 'react-redux';

class XMLConverter extends React.Component {
    render() {
        return (
            <section>
                <br />
                <div>
                    <Button
                        onClick={() =>
                            this.props.utilActions.convertXML(
                                this.props.inputXML
                            )
                        }
                    >
                        Konverter XML
                    </Button>
                </div>
                <br />
                <div className="inline-div">
                    <p>
                        <b> XML Input </b>
                    </p>
                    <textarea
                        cols="90"
                        rows="30"
                        className="inline-txtarea"
                        placeholder="Legg inn/skriv inn XML"
                        value={this.props.inputXML}
                        onChange={event => {
                            this.props.actions.setInputXML(event.target.value);
                        }}
                    />
                </div>
                <Space />
                <div className="inline-div">
                    <p>
                        <b> XML Output</b>
                    </p>
                    <textarea
                        cols="90"
                        rows="30"
                        className="inline-txtarea"
                        placeholder="Her kommer den konverterte XMLen"
                        value={this.props.outputXML}
                    />
                </div>
            </section>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        inputXML: state.converter.inputXML,
        outputXML: state.converter.outputXML
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(converterActions, dispatch),
        utilActions: bindActionCreators(converterActionsUtil, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(XMLConverter);
